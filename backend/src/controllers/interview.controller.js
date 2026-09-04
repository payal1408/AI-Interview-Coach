import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";

// ============================================
// Generate Interview Report
// ============================================
async function generateInterViewReportController(req, res) {
    try {
        const resumeFile = req.file;
        let resumeContent = "";
        const { selfDescription, jobDescription } = req.body;

        if (!jobDescription?.trim()) {
            return res.status(400).json({
                message: "Job description is required",
            });
        }

        if (!resumeFile && !selfDescription?.trim()) {
            return res.status(400).json({
                message: "Upload a resume or provide a self description",
            });
        }

        // Extract text only when a resume was provided. A self-description can
        // be used by itself, as the UI promises.
        if (resumeFile) {
            try {
                const parser = new PDFParse({ data: resumeFile.buffer });
                const result = await parser.getText();
                resumeContent = result.text?.trim() || "";
                await parser.destroy();
            } catch (pdfError) {
                console.error("PDF Parsing failed:", pdfError);
                return res.status(400).json({
                    message: "Failed to parse PDF file. Please ensure it is a valid PDF.",
                });
            }

            if (!resumeContent) {
                return res.status(400).json({
                    message: "Could not extract text from resume. Ensure the PDF contains readable text.",
                });
            }
        }

        // Inside generateInterViewReportController...

        const interviewReportByAPI = await generateInterviewReport({
            resume: resumeContent,
            selfDescription: selfDescription?.trim() || "Not provided",
            jobDescription,
        });

        if (!interviewReportByAPI) {
            return res.status(500).json({
                message: "AI failed to generate interview report",
            });
        }

        // Safe default fallbacks matching Mongoose expectations
        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent,
            selfDescription: selfDescription?.trim() || "",
            jobDescription,
            title: interviewReportByAPI.title || "Interview Report",
            matchScore: interviewReportByAPI.matchScore || 0,
            technicalQuestions: interviewReportByAPI.technicalQuestions || [],
            behavioralQuestions: interviewReportByAPI.behavioralQuestions || [],
            skillsGap: interviewReportByAPI.skillsGap || [],
            preparationPlan: interviewReportByAPI.preparationPlan || [],
        });

        // 6. Return Response
        return res.status(201).json({
            message: "Interview report generated successfully",
            interviewReport,
        });
    } catch (error) {
        console.error("Interview report generation error:", error);

        // Errors from Gemini are upstream-service errors. Surface a useful,
        // safe message instead of collapsing every failure into a generic 500.
        const geminiStatus = Number(error?.status);
        if (geminiStatus === 401 || geminiStatus === 403) {
            return res.status(502).json({
                message: "Gemini API authentication failed. Check GOOGLE_GENAI_API_KEY in backend/.env.",
            });
        }

        if (geminiStatus === 429) {
            return res.status(503).json({
                message: "Gemini API rate limit reached. Please try again shortly.",
            });
        }

        if (geminiStatus === 400 || geminiStatus === 404) {
            return res.status(502).json({
                message: "Gemini API rejected the generation request.",
                error: error.message,
            });
        }

        if (geminiStatus === 503) {
            return res.status(503).json({
                message: "Gemini API is temporarily unavailable. Please try again shortly.",
            });
        }

        // Mongoose Schema Validation Failure
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                message: "Interview report validation failed",
                errors,
            });
        }

        return res.status(500).json({
            message: "Failed to generate interview report",
            error: error.message || "Internal server error",
        });
    }
}

// ============================================
// Get Single Interview Report
// ============================================
async function getInterViewReportController(req, res) {
    try {
        const { interviewId } = req.params;

        const interviewReport = await interviewReportModel.findOne({
            _id: interviewId,
            user: req.user.id,
        });

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found",
            });
        }

        return res.status(200).json({
            message: "Interview report fetched successfully",
            interviewReport,
        });
    } catch (error) {
        console.error("Get interview report error:", error);

        return res.status(500).json({
            message: "Failed to fetch interview report",
            error: error.message,
        });
    }
}

// ============================================
// Get All Interview Reports
// ============================================
async function getAllInterviewReportController(req, res) {
    try {
        const interviewReports = await interviewReportModel
            .find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .select("-resume -selfDescription -jobDescription -__v");

        return res.status(200).json({
            message: "Interview reports fetched successfully",
            interviewReports,
        });
    } catch (error) {
        console.error("Get all interview reports error:", error);

        return res.status(500).json({
            message: "Failed to fetch interview reports",
            error: error.message,
        });
    }
}

export default {
    generateInterViewReportController,
    getInterViewReportController,
    getAllInterviewReportController,
};

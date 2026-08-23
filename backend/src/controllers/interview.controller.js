// import { PDFParse } from 'pdf-parse';
// import generateInterviewReport from '../services/ai.service.js';
// import interviewReportModel from '../models/interviewReport.model.js';

// async function generateInterViewReportController(req, res) {
//     try {
//         const resumeFile = req.file;

//         if (!resumeFile) {
//             return res.status(400).json({
//                 message: 'Resume file is required'
//             });
//         }

//         const parser = new PDFParse({
//             data: resumeFile.buffer
//         });

//         const result = await parser.getText();
//         const resumeContent = result.text;

//         await parser.destroy();

//         const { selfDescription, jobDescription } = req.body;

//         const interviewReportByAPI = await generateInterviewReport({
//             resume: resumeContent,
//             selfDescription,
//             jobDescription
//         });

//         const interviewReport = await interviewReportModel.create({
//             user: req.user.id,
//             resume: resumeContent,
//             selfDescription,
//             jobDescription,
//             ...interviewReportByAPI
//         });

//         return res.status(201).json({
//             message: 'Interview report generated successfully',
//             interviewReport
//         });

//     } catch (error) {
//         console.error('Interview report generation error:', error);

//         return res.status(500).json({
//             message: 'Failed to generate interview report',
//             error: error.message
//         });
//     }
// }

// async function getInterViewReportController(req, res) {
//     const { interviewId } = req.params
//     const interviewReport = await interviewReportModel.findOne({
//         _id: interviewId,
//         user: req.user.id
//     })
//     if (!interviewReport) {
//         return res.status(400).json({
//             message: "Interview report not found"
//         })
//     }
//     res.status(200).json({
//         message: 'Interview report fetched successfully',
//         interviewId
//     })
// }

// async function getAllInterviewReportController(req, res) {
// const interviewReports = await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select('-resume -selfDescription -jonDescription -__v -technicalQuestions -behavioralQuestionSchema -skillsGapSchema - preparationPlanSchema')

// res.status(200).json({
//     message:"Interview report fetched successfully",
//     interviewReports
// })
// }
// export default {
//     generateInterViewReportController, getInterViewReportController, getAllInterviewReportController
// };


import { PDFParse } from "pdf-parse";
import generateInterviewReport from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";

// ============================================
// Generate Interview Report
// ============================================
async function generateInterViewReportController(req, res) {
    try {
        // 1. Check Resume File
        const resumeFile = req.file;

        if (!resumeFile) {
            return res.status(400).json({
                message: "Resume file is required",
            });
        }

        // 2. Extract Text From PDF
        let resumeContent = "";
        try {
            const parser = new PDFParse({
                data: resumeFile.buffer,
            });
            const result = await parser.getText();
            resumeContent = result.text?.trim();
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

        // 3. Get Form Data
        const { selfDescription, jobDescription } = req.body;

        if (!jobDescription?.trim()) {
            return res.status(400).json({
                message: "Job description is required",
            });
        }

        if (!selfDescription?.trim()) {
            return res.status(400).json({
                message: "Self description is required",
            });
        }

        // Inside generateInterViewReportController...

        const interviewReportByAPI = await generateInterviewReport({
            resume: resumeContent,
            selfDescription,
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
            selfDescription,
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
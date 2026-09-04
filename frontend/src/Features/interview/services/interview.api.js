

import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true,
});

// Helper to extract clean error message for caller
const formatAxiosError = (error) => {
    return (
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "An unexpected error occurred"
    );
};

// =====================================================
// Generate Interview Report
// =====================================================
export const generateInterviewReport = async ({
    resumeFile,
    selfDescription,
    jobDescription,
}) => {
    try {
        if (!jobDescription?.trim()) {
            throw new Error("Job description is required");
        }

        if (!resumeFile && !selfDescription?.trim()) {
            throw new Error("Upload a resume or provide a self description");
        }

        const formData = new FormData();
        formData.append("jobDescription", jobDescription.trim());
        formData.append("selfDescription", selfDescription?.trim() || "");
        if (resumeFile) {
            formData.append("resume", resumeFile);
        }

        // Let the browser set the multipart boundary for FormData.
        const response = await api.post("/api/interview", formData);

        console.log("Interview report response:", response.data);
        return response.data;
    } catch (error) {
        console.error(
            "Interview API Error:",
            JSON.stringify(error.response?.data || { message: error.message }, null, 2)
        );
        // Standardize error message on exception object for custom hooks
        error.customMessage = formatAxiosError(error);
        throw error;
    }
};

// =====================================================
// Get Interview Report By ID
// =====================================================
export const getInterViewReportById = async (interviewId) => {
    try {
        if (!interviewId) {
            throw new Error("Interview ID is required");
        }

        const response = await api.get(`/api/interview/report/${interviewId}`);
        console.log("Interview report:", response.data);
        return response.data;
    } catch (error) {
        console.error("Get Interview Report Error:", error.response?.data || error.message);
        error.customMessage = formatAxiosError(error);
        throw error;
    }
};

// =====================================================
// Get All Interview Reports
// =====================================================
export const getAllInterviewReports = async () => {
    try {
        const response = await api.get("/api/interview/");
        console.log("All interview reports:", response.data);
        return response.data;
    } catch (error) {
        console.error("Get All Interview Reports Error:", error.response?.data || error.message);
        error.customMessage = formatAxiosError(error);
        throw error;
    }
};

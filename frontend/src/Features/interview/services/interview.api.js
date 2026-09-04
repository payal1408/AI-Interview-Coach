<<<<<<< HEAD


import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const api = axios.create({
    baseURL: apiBaseUrl,
=======
// import axios from 'axios'
// const api = axios.create({
//     baseURL: 'http://localhost:3000',
//     withCredentials: true
// })



// /**
// * @description Service to generate interview report based on user self description , resume and job descriptions 
//  */

// export const generateInterviewReport = async ({ resumeFile, selfDescription, jobDescription }) => {
//     const formData = new FormData()
//     formData.append("jobDescription", jobDescription)
//     formData.append("selfDescription", selfDescription)
//     formData.append("resume", resumeFile)

//     const response = await api.post('/api/interview', formData, {
//         headers: {
//             'Content-Type': 'multipart/form-data'
//         }
//     })
//     return response.data
// }
// /**
//  *@description Service to generate interview report based on user self description , resume and job descriptions 
//  */
// export const getInterViewReportById = async (interviewId) => {
//     const response = await api.get(`/api/interview/report/${interviewId}`)

//     return response.data
// }

// /**
//  *@description Service to generate interview report based on user self description , resume and job descriptions 
//  */
// export const getAllInterviewReports = async () => {
//     const response = await api.get('/api/interview/')

//     return response.data
// }

import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000",
>>>>>>> 0ce6e125e37f70dafffdcfe091008b8c69a78ee1
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
<<<<<<< HEAD
=======
        if (!resumeFile) {
            throw new Error("Resume file is required");
        }

>>>>>>> 0ce6e125e37f70dafffdcfe091008b8c69a78ee1
        if (!jobDescription?.trim()) {
            throw new Error("Job description is required");
        }

<<<<<<< HEAD
        if (!resumeFile && !selfDescription?.trim()) {
            throw new Error("Upload a resume or provide a self description");
=======
        if (!selfDescription?.trim()) {
            throw new Error("Self description is required");
>>>>>>> 0ce6e125e37f70dafffdcfe091008b8c69a78ee1
        }

        const formData = new FormData();
        formData.append("jobDescription", jobDescription.trim());
<<<<<<< HEAD
        formData.append("selfDescription", selfDescription?.trim() || "");
        if (resumeFile) {
            formData.append("resume", resumeFile);
        }

        // Let the browser set the multipart boundary for FormData.
        const response = await api.post("/api/interview", formData);
=======
        formData.append("selfDescription", selfDescription.trim());
        formData.append("resume", resumeFile);

        const response = await api.post("/api/interview", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
>>>>>>> 0ce6e125e37f70dafffdcfe091008b8c69a78ee1

        console.log("Interview report response:", response.data);
        return response.data;
    } catch (error) {
<<<<<<< HEAD
        console.error(
            "Interview API Error:",
            JSON.stringify(error.response?.data || { message: error.message }, null, 2)
        );
=======
        console.error("Interview API Error:", error.response?.data || error.message);
>>>>>>> 0ce6e125e37f70dafffdcfe091008b8c69a78ee1
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
<<<<<<< HEAD
};
=======
};
>>>>>>> 0ce6e125e37f70dafffdcfe091008b8c69a78ee1

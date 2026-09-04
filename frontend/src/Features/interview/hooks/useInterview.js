import { useState, useCallback } from "react";
import {generateInterviewReport,getInterViewReportById,
    getAllInterviewReports,
} from "../services/interview.api";

export const useInterview = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [interviewReport, setInterviewReport] = useState(null);
    const [interviewReports, setInterviewReports] = useState([]);

    /**
     * Helper to parse consistent error messages from Axios / Server responses
     */
    const parseErrorMessage = (err, fallbackMessage) => {
        return (
            err?.customMessage ||
            err?.response?.data?.message ||
            err?.response?.data?.error ||
            err?.message ||
            fallbackMessage
        );
    };

    // =====================================================
    // GENERATE INTERVIEW REPORT
    // =====================================================
    const generateReport = useCallback(
        async ({ resumeFile, selfDescription, jobDescription }) => {
            try {
                setLoading(true);
                setError(null);

                const response = await generateInterviewReport({
                    resumeFile,
                    selfDescription,
                    jobDescription,
                });

                if (!response) {
                    throw new Error("No response received from server");
                }

                if (!response.interviewReport) {
                    throw new Error("Interview report was not returned by the server");
                }

                setInterviewReport(response.interviewReport);
                return response;
            } catch (err) {
                console.error("Generate Report Error:", err);

                const errorMessage = parseErrorMessage(
                    err,
                    "Failed to generate interview report"
                );

                setError(errorMessage);
                setInterviewReport(null);
                return null;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // =====================================================
    // GET INTERVIEW REPORT BY ID
    // =====================================================
    const getReportById = useCallback(async (interviewId) => {
        try {
            setLoading(true);
            setError(null);

            if (!interviewId) {
                throw new Error("Interview ID is required");
            }

            const response = await getInterViewReportById(interviewId);

            if (!response) {
                throw new Error("No response received from server");
            }

            if (!response.interviewReport) {
                throw new Error("Interview report not found");
            }

            setInterviewReport(response.interviewReport);
            return response;
        } catch (err) {
            console.error("Get Report By ID Error:", err);

            const errorMessage = parseErrorMessage(
                err,
                "Failed to fetch interview report"
            );

            setError(errorMessage);
            setInterviewReport(null);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // =====================================================
    // GET ALL INTERVIEW REPORTS
    // =====================================================
    const getAllReports = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getAllInterviewReports();

            if (!response) {
                throw new Error("No response received from server");
            }

            const reports = response.interviewReports || [];
            setInterviewReports(reports);
            return response;
        } catch (err) {
            console.error("Get All Reports Error:", err);

            const errorMessage = parseErrorMessage(
                err,
                "Failed to fetch interview reports"
            );

            setError(errorMessage);
            setInterviewReports([]);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // =====================================================
    // UTILITY CLEANUP FUNCTIONS
    // =====================================================
    const clearError = useCallback(() => setError(null), []);
    const clearReport = useCallback(() => setInterviewReport(null), []);
    const clearReports = useCallback(() => setInterviewReports([]), []);

    return {
        loading,
        error,
        interviewReport,
        interviewReports,
        generateReport,
        getReportById,
        getAllReports,
        clearError,
        clearReport,
        clearReports,
    };
};

export default useInterview;
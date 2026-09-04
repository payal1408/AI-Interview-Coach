import "./Home.scss";
import { useInterview } from '../hooks/useInterview.js';
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const Home = () => {
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resume, setResume] = useState(null);

    const { loading, error, generateReport, } = useInterview();

    const resumeInputRef = useRef(null);
    const navigate = useNavigate();

    // =====================================================
    // Resume Change
    // =====================================================

    const handleResumeChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            setResume(null);
            return;
        }

        // Backend currently uses PDFParse,
        // so allow PDF only.
        if (file.type !== "application/pdf") {
            alert("Please upload a PDF resume.");
            e.target.value = "";
            setResume(null);
            return;
        }

        // Keep this in sync with the server-side Multer limit.
        if (file.size > 3 * 1024 * 1024) {
            alert("Resume size must be less than 3MB.");
            e.target.value = "";
            setResume(null);
            return;
        }

        setResume(file);
    };

    // =====================================================
    // Generate Report
    // =====================================================

    const handleGenerateReport = async () => {
        // ---------------------------------------------
        // Validate Job Description
        // ---------------------------------------------

        if (!jobDescription.trim()) {
            alert("Please enter the job description.");
            return;
        }

        // ---------------------------------------------
        // Validate Resume OR Self Description
        // ---------------------------------------------

        if (!resume && !selfDescription.trim()) {
            alert(
                "Please upload a resume or provide a self-description."
            );
            return;
        }

        // ---------------------------------------------
        // Get resume file
        // ---------------------------------------------

        const resumeFile =
            resumeInputRef.current?.files?.[0] || resume;

        console.log("Resume:", resumeFile);
        console.log("Job Description:", jobDescription);
        console.log("Self Description:", selfDescription);

        // ---------------------------------------------
        // Send request
        // ---------------------------------------------

        const response = await generateReport({
            jobDescription,
            selfDescription,
            resumeFile,
        });

        // ---------------------------------------------
        // IMPORTANT:
        // generateReport() returns null when API fails
        // ---------------------------------------------

        if (!response) {
            console.error(
                "Interview report generation failed."
            );
            return;
        }

        // ---------------------------------------------
        // Get interview report
        // ---------------------------------------------

        const interviewReport =
            response.interviewReport;

        if (!interviewReport) {
            console.error(
                "Interview report missing from response:",
                response
            );

            return;
        }

        // ---------------------------------------------
        // Get MongoDB ID
        // ---------------------------------------------

        const interviewId =
            interviewReport._id;

        if (!interviewId) {
            console.error(
                "Interview report ID is missing:",
                interviewReport
            );

            return;
        }

        console.log(
            "Interview ID:",
            interviewId
        );

        // ---------------------------------------------
        // Navigate to report page
        // ---------------------------------------------

        navigate(
            `/interview/${interviewId}`
        );
    };

    // =====================================================
    // Loading Screen
    // =====================================================

    if (loading) {
        return (
            <main className="loading-screen">
                <div className="loading-content">
                    <h1>
                        Loading your interview plan...
                    </h1>

                    <p>
                        Our AI is analyzing your profile
                        and job requirements.
                    </p>
                </div>
            </main>
        );
    }

    // =====================================================
    // UI
    // =====================================================

    return (
        <main className="home">

            {/* ================= HEADER ================= */}

            <section className="hero">
                <h1>
                    Create Your Custom{" "}
                    <span>Interview Plan</span>
                </h1>

                <p>
                    Let our AI analyze the job requirements
                    and your unique profile to
                    <br />
                    build a winning strategy.
                </p>
            </section>

            {/* ================= ERROR ================= */}

            {error && (
                <div className="error-message">
                    <strong>
                        Failed to generate report
                    </strong>

                    <p>{error}</p>
                </div>
            )}

            {/* ================= MAIN CARD ================= */}

            <section className="interview-card">

                <div className="form-content">

                    {/* ================= LEFT ================= */}

                    <div className="job-section">

                        <div className="section-header">

                            <div className="title-wrapper">

                                <span className="section-icon">
                                    ▣
                                </span>

                                <h2>
                                    Target Job Description
                                </h2>

                            </div>

                            <span className="badge required">
                                REQUIRED
                            </span>

                        </div>

                        <div className="textarea-wrapper">

                            <textarea
                                name="jobDescription"
                                id="jobDescription"
                                value={jobDescription}
                                maxLength={5000}
                                onChange={(e) =>
                                    setJobDescription(
                                        e.target.value
                                    )
                                }
                                placeholder={`Paste the full job description here...

e.g. "Senior Frontend Engineer at Google requires
proficiency in React, TypeScript, and large-scale
system design..."`}
                            />

                            <span className="character-count">
                                {jobDescription.length} / 5000 chars
                            </span>

                        </div>

                    </div>

                    {/* ================= RIGHT ================= */}

                    <div className="profile-section">

                        <div className="section-header">

                            <div className="title-wrapper">

                                <span className="section-icon">
                                    ♙
                                </span>

                                <h2>
                                    Your Profile
                                </h2>

                            </div>

                        </div>

                        {/* ================= RESUME ================= */}

                        <div className="input-block">

                            <div className="label-row">

                                <label htmlFor="resume">
                                    Upload Resume
                                </label>

                                <span className="badge best">
                                    BEST RESULTS
                                </span>

                            </div>

                            <label
                                className="upload-box"
                                htmlFor="resume"
                            >

                                <div className="upload-icon">
                                    ↑
                                </div>

                                <strong>
                                    {resume
                                        ? resume.name
                                        : "Click to upload or drag & drop"}
                                </strong>

                                <span>
                                    PDF (Max 3MB)
                                </span>

                            </label>

                            <input
                                ref={resumeInputRef}
                                hidden
                                type="file"
                                id="resume"
                                name="resume"
                                accept=".pdf,application/pdf"
                                onChange={
                                    handleResumeChange
                                }
                            />

                        </div>

                        {/* ================= OR ================= */}

                        <div className="or-divider">
                            <span>OR</span>
                        </div>

                        {/* ================= SELF DESCRIPTION ================= */}

                        <div className="input-block">

                            <div className="label-row">

                                <label htmlFor="selfDescription">
                                    Quick Self-Description
                                </label>

                            </div>

                            <textarea
                                className="self-description"
                                name="selfDescription"
                                id="selfDescription"
                                value={selfDescription}
                                onChange={(e) =>
                                    setSelfDescription(
                                        e.target.value
                                    )
                                }
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />

                        </div>

                        {/* ================= INFO ================= */}

                        <div className="info-message">

                            <span className="info-icon">
                                i
                            </span>

                            <p>
                                Either a{" "}
                                <strong>
                                    Resume
                                </strong>{" "}
                                or a{" "}
                                <strong>
                                    Self Description
                                </strong>{" "}
                                is required to generate
                                a personalized plan.
                            </p>

                        </div>

                    </div>

                </div>

                {/* ================= FOOTER ================= */}

                <div className="card-footer">

                    <span className="generation-time">
                        AI-Powered Strategy Generation ·
                        Approx 30s
                    </span>

                    <button
                        type="button"
                        onClick={
                            handleGenerateReport
                        }
                        disabled={loading}
                        className="generate-btn"
                    >
                        <span>★</span>

                        {loading
                            ? "Generating..."
                            : "Generate My Interview Strategy"}
                    </button>

                </div>

            </section>

            {/* ================= FOOTER ================= */}

            <footer className="footer">

                <a href="#">
                    Privacy Policy
                </a>

                <a href="#">
                    Terms of Service
                </a>

                <a href="#">
                    Help Center
                </a>

            </footer>

        </main>
    );
};

export default Home;

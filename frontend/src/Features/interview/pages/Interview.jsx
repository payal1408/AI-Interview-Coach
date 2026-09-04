import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import "./interview.scss";
import { useInterview } from "../hooks/useInterview";

const Interview = () => {
    const [activeSection, setActiveSection] = useState("technical");
    const [openQuestion, setOpenQuestion] = useState(null);
    const { interviewId } = useParams();
    const { interviewReport: report, loading, error, getReportById } = useInterview()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        }
    }, [interviewId]);
    
    // ================= INTERVIEW REPORT =================
    // const interviewReport = {
    //     match_score: 80,

    //     technical_questions: [
    //         {
    //             question:
    //                 "How did you handle user authentication in your AI Post Creator project, and how would you implement JSON Web Tokens (JWT) securely in Express.js?",
    //             intention:
    //                 "Evaluates the candidate's understanding of authentication, security best practices, and knowledge of JWT as required by the job description.",
    //             answer_guidance:
    //                 "The candidate should explain the login flow: hashing passwords using bcrypt, generating a signed JWT upon successful authentication, returning it to the client, and using a custom middleware in Express to verify the token in authorization headers for protected routes."
    //         },
    //         {
    //             question:
    //                 "In Node.js, how does the Event Loop handle asynchronous I/O operations, and how do you handle unexpected errors in async/await functions?",
    //             intention:
    //                 "Tests fundamental knowledge of Node.js architecture and error-handling best practices in backend applications.",
    //             answer_guidance:
    //                 "The response should cover the event loop phases (call stack, callback queue, microtask queue) and emphasize wrapping async logic in try-catch blocks or using custom higher-order Express error-handling middleware."
    //         },
    //         {
    //             question:
    //                 "How do you optimize MongoDB query performance when dealing with large datasets in Express.js?",
    //             intention:
    //                 "Assesses knowledge of MongoDB database management, indexing, and optimization techniques.",
    //             answer_guidance:
    //                 "The candidate should discuss creating appropriate single or compound indexes, using projection to return only required fields, avoiding expensive aggregation pipelines where simple queries suffice, and utilizing pagination (limit/skip or cursor-based)."
    //         },
    //         {
    //             question:
    //                 "When integrating third-party APIs like Google Gemini API in your backend, how do you handle API rate limits, long-running requests, and secret management?",
    //             intention:
    //                 "Checks practical backend development skills, third-party API integration strategies, and secure coding habits.",
    //             answer_guidance:
    //                 "The candidate should mention storing API keys safely using environment variables (.env), implementing retry logic or rate-limiting middleware, using asynchronous jobs/queues if requests take long, and returning appropriate error status codes to the client."
    //         }
    //     ],

    //     behavioral_questions: [
    //         {
    //             question:
    //                 "You mentioned in your self-description that you enjoy debugging problems. Can you describe a complex backend issue you encountered in one of your projects and how you resolved it?",
    //             intention:
    //                 "Assesses practical problem-solving ability, analytical thinking, and persistence under technical challenges.",
    //             answer_guidance:
    //                 "Look for a clear STAR (Situation, Task, Action, Result) structure. The candidate should describe the symptoms, the tools used to trace the bug (e.g., Postman, logs, debugging breakpoints), the root cause, and the permanent fix implemented."
    //         },
    //         {
    //             question:
    //                 "Your previous internship was focused on Frontend Development, but this role is for a Backend Developer. What steps have you taken to prepare yourself specifically for a dedicated backend engineering role?",
    //             intention:
    //                 "Evaluates domain interest, clarity of career goals, and self-directed learning ability.",
    //             answer_guidance:
    //                 "The candidate should highlight their full-stack project work focusing on Express/MongoDB API design, their deep dive into server-side logic, database management, and Data Structures & Algorithms practice."
    //         }
    //     ],

    //     missing_skills: [
    //         {
    //             skill: "Redis",
    //             severity: "medium"
    //         },
    //         {
    //             skill: "Docker",
    //             severity: "medium"
    //         },
    //         {
    //             skill: "Cloud Services (AWS/GCP/Azure)",
    //             severity: "medium"
    //         },
    //         {
    //             skill: "Microservices Architecture",
    //             severity: "low"
    //         }
    //     ],

    //     preparation_plan: [
    //         {
    //             day: 1,
    //             focus: "Node.js Core Concepts & Asynchronous Programming",
    //             tasks: [
    //                 "Learn Node.js Event Loop",
    //                 "Understand callbacks, promises and async/await",
    //                 "Practice error handling in asynchronous functions"
    //             ]
    //         },
    //         {
    //             day: 2,
    //             focus: "RESTful API Design & Authentication",
    //             tasks: [
    //                 "Understand REST API principles",
    //                 "Implement JWT authentication",
    //                 "Practice Express middleware"
    //             ]
    //         },
    //         {
    //             day: 3,
    //             focus: "MongoDB & Mongoose Optimization",
    //             tasks: [
    //                 "Learn MongoDB indexing",
    //                 "Practice query optimization",
    //                 "Understand pagination and projection"
    //             ]
    //         },
    //         {
    //             day: 4,
    //             focus: "Caching & Basics of Redis",
    //             tasks: [
    //                 "Understand caching concepts",
    //                 "Learn Redis fundamentals",
    //                 "Implement basic Redis caching"
    //             ]
    //         },
    //         {
    //             day: 5,
    //             focus: "Docker & Application Containerization Basics",
    //             tasks: [
    //                 "Learn Docker fundamentals",
    //                 "Create a Dockerfile",
    //                 "Containerize a Node.js application"
    //             ]
    //         },
    //         {
    //             day: 6,
    //             focus: "Third-Party API Integration & System Security",
    //             tasks: [
    //                 "Practice API integration",
    //                 "Learn API rate limiting",
    //                 "Understand environment variables and secret management"
    //             ]
    //         },
    //         {
    //             day: 7,
    //             focus: "Mock Technical Interview & Behavioral Prep",
    //             tasks: [
    //                 "Practice technical questions",
    //                 "Prepare STAR-based behavioral answers",
    //                 "Perform a complete mock interview"
    //             ]
    //         }
    //     ]
    // };

    const technicalQuestions = report?.technicalQuestions || [];
    const behavioralQuestions = report?.behavioralQuestions || [];
    const skillGaps = report?.skillsGap || [];
    const preparationPlan = report?.preparationPlan || [];

    const toggleQuestion = (id) => {
        setOpenQuestion(openQuestion === id ? null : id);
    };

    const getSkillClass = (severity) => {
        switch (severity) {
            case "high":
                return "danger";

            case "medium":
                return "warning";

            case "low":
                return "success";

            default:
                return "warning";
        }
    };

    if (loading) {
        return <main className="interview-page"><p>Loading interview report...</p></main>;
    }

    if (error) {
        return <main className="interview-page"><p>{error}</p></main>;
    }

    if (!report) {
        return <main className="interview-page"><p>No interview report found.</p></main>;
    }

    return (
        <main className="interview-page">

            {/* ================= SIDEBAR ================= */}

            <aside className="interview-sidebar">

                <div className="sidebar-title">
                    SECTIONS
                </div>

                <nav className="section-navigation">

                    <button
                        className={`nav-item ${activeSection === "technical"
                            ? "active"
                            : ""
                            }`}
                        onClick={() => {
                            setActiveSection("technical");
                            setOpenQuestion(null);
                        }}
                    >
                        <span className="nav-icon">&lt;/&gt;</span>

                        <span>
                            Technical Questions
                        </span>

                        <span className="nav-count">
                            {technicalQuestions.length}
                        </span>
                    </button>

                    <button
                        className={`nav-item ${activeSection === "behavioral"
                            ? "active"
                            : ""
                            }`}
                        onClick={() => {
                            setActiveSection("behavioral");
                            setOpenQuestion(null);
                        }}
                    >
                        <span className="nav-icon">▢</span>

                        <span>
                            Behavioral Questions
                        </span>

                        <span className="nav-count">
                            {behavioralQuestions.length}
                        </span>
                    </button>

                    <button
                        className={`nav-item ${activeSection === "roadmap"
                            ? "active"
                            : ""
                            }`}
                        onClick={() => {
                            setActiveSection("roadmap");
                            setOpenQuestion(null);
                        }}
                    >
                        <span className="nav-icon">➤</span>

                        <span>
                            Road Map
                        </span>

                        <span className="nav-count">
                            {preparationPlan.length}
                        </span>
                    </button>

                </nav>

            </aside>


            {/* ================= MAIN CONTENT ================= */}

            <section className="interview-content">

                <div className="content-header">

                    <div className="header-title">

                        <h1>
                            {activeSection === "technical"
                                ? "Technical Questions"
                                : activeSection === "behavioral"
                                    ? "Behavioral Questions"
                                    : "Preparation Road Map"}
                        </h1>

                        {activeSection === "technical" && (
                            <span className="question-count">
                                {technicalQuestions.length} questions
                            </span>
                        )}

                        {activeSection === "behavioral" && (
                            <span className="question-count">
                                {behavioralQuestions.length} questions
                            </span>
                        )}

                        {activeSection === "roadmap" && (
                            <span className="question-count">
                                {preparationPlan.length} day plan
                            </span>
                        )}

                    </div>

                </div>


                {/* ================= TECHNICAL QUESTIONS ================= */}

                {activeSection === "technical" && (

                    <div className="questions-container">

                        {technicalQuestions.map((item, index) => (

                            <div
                                className={`question-card ${openQuestion === `technical-${index}`
                                    ? "expanded"
                                    : ""
                                    }`}
                                key={index}
                            >

                                <button
                                    className="question-header"
                                    onClick={() =>
                                        toggleQuestion(
                                            `technical-${index}`
                                        )
                                    }
                                >

                                    <div className="question-number">
                                        Q
                                        {String(index + 1).padStart(
                                            2,
                                            "0"
                                        )}
                                    </div>

                                    <div className="question-text">
                                        {item.question}
                                    </div>

                                    <span
                                        className={`question-arrow ${openQuestion ===
                                            `technical-${index}`
                                            ? "rotate"
                                            : ""
                                            }`}
                                    >
                                        ⌄
                                    </span>

                                </button>


                                {openQuestion ===
                                    `technical-${index}` && (

                                        <div className="question-answer">

                                            <div className="answer-block">

                                                <div className="answer-label">
                                                    INTENTION
                                                </div>

                                                <p>
                                                    {item.intention}
                                                </p>

                                            </div>


                                            <div className="answer-block">

                                                <div className="answer-label">
                                                    ANSWER GUIDANCE
                                                </div>

                                                <p>
                                                    {item.answer}
                                                </p>

                                            </div>

                                        </div>
                                    )}

                            </div>

                        ))}

                    </div>
                )}


                {/* ================= BEHAVIORAL QUESTIONS ================= */}

                {activeSection === "behavioral" && (

                    <div className="questions-container">

                        {behavioralQuestions.map((item, index) => (

                            <div
                                className={`question-card ${openQuestion === `behavioral-${index}`
                                    ? "expanded"
                                    : ""
                                    }`}
                                key={index}
                            >

                                <button
                                    className="question-header"
                                    onClick={() =>
                                        toggleQuestion(
                                            `behavioral-${index}`
                                        )
                                    }
                                >

                                    <div className="question-number">
                                        Q
                                        {String(index + 1).padStart(
                                            2,
                                            "0"
                                        )}
                                    </div>

                                    <div className="question-text">
                                        {item.question}
                                    </div>

                                    <span
                                        className={`question-arrow ${openQuestion ===
                                            `behavioral-${index}`
                                            ? "rotate"
                                            : ""
                                            }`}
                                    >
                                        ⌄
                                    </span>

                                </button>


                                {openQuestion ===
                                    `behavioral-${index}` && (

                                        <div className="question-answer">

                                            <div className="answer-block">

                                                <div className="answer-label">
                                                    INTENTION
                                                </div>

                                                <p>
                                                    {item.intention}
                                                </p>

                                            </div>


                                            <div className="answer-block">

                                                <div className="answer-label">
                                                    ANSWER GUIDANCE
                                                </div>

                                                <p>
                                                    {item.answer}
                                                </p>

                                            </div>

                                        </div>
                                    )}

                            </div>

                        ))}

                    </div>
                )}


                {/* ================= ROADMAP ================= */}

                {activeSection === "roadmap" && (

                    <div className="roadmap-section">

                        {preparationPlan.map((item) => (

                            <div
                                className="roadmap-item"
                                key={item.day}
                            >

                                <div className="roadmap-number">
                                    {String(item.day).padStart(2, "0")}
                                </div>

                                <div className="roadmap-content">

                                    <div className="roadmap-day">
                                        DAY {item.day}
                                    </div>

                                    <h3>
                                        {item.focus}
                                    </h3>

                                    <div className="roadmap-tasks">

                                        {item.tasks.map(
                                            (task, index) => (

                                                <div
                                                    className="roadmap-task"
                                                    key={index}
                                                >
                                                    <span>
                                                        ✓
                                                    </span>

                                                    {task}
                                                </div>

                                            )
                                        )}

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>
                )}

            </section>


            {/* ================= RIGHT SIDEBAR ================= */}

            <aside className="score-sidebar">

                {/* MATCH SCORE */}

                <div className="score-section">

                    <div className="score-title">
                        MATCH SCORE
                    </div>


                    <div
                        className={`score-circle score-${report?.matchScore}`}
                    >

                        <div className="score-value">
                            {report?.matchScore}
                        </div>

                        <span>
                            %
                        </span>

                    </div>


                    <div className="score-message">

                        {report?.matchScore >= 80
                            ? "Strong match for this role"
                            : report?.matchScore >= 60
                                ? "Good match with some skill gaps"
                                : "Needs improvement for this role"}

                    </div>

                </div>


                {/* DIVIDER */}

                <div className="score-divider"></div>


                {/* SKILL GAPS */}

                <div className="skill-section">

                    <div className="skill-title">
                        SKILL GAPS
                    </div>


                    <div className="skill-list">

                        {skillGaps.map((skill, index) => (

                            <div
                                className={`skill-tag ${getSkillClass(
                                    skill.severity
                                )}`}
                                key={index}
                            >

                                <span>
                                    {skill.severity === "high"
                                        ? "!"
                                        : skill.severity === "medium"
                                            ? "•"
                                            : "✓"}
                                </span>

                                {skill.skills}

                            </div>

                        ))}

                    </div>

                </div>

            </aside>

        </main>
    );
};

export default Interview;
<<<<<<< HEAD
=======
// import { GoogleGenAI } from "@google/genai";
// import { z } from 'zod'
// import { zodToJsonSchema } from 'zod-to-json-schema'

// const ai = new GoogleGenAI({
//     apiKey: process.env.GOOGLE_GENAI_API_KEY
// });

// // async function invokeGeminiAi() {
// //     const response = await ai.models.generateContent({
// //         model: "gemini-3.6-flash",
// //         contents: `Hello Gemini! Explain what is an interview:${resume}`
// //     });

// //     console.log(response.text);
// // }

// const interviewReportSchema = z.object({

//     matchScore: z.number().describe(" A numerical score representing how well the candidate's resume matches the job description, typically expressed as a percentage from 0 to 100"),

//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be ask in the interview"),
//         intention: z.string().describe("The intension of interviewer behind asking question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("A list of technical interview questions tailored to the candidate's resume and the requirements of the job."),

//     behavioralQuestionSchema: z.array(z.object({
//         question: z.string().describe("The technical question can be ask in the interview"),
//         intention: z.string().describe("The intension of interviewer behind asking question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("A list of behavioral interview questions designed to evaluate the candidate's soft skills, workplace behavior, communication, and problem-solving abilities."),


//     skillsGapSchema: z.array(z.object({
//         skills: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum(["low", "medium", "high"]).describe("the severity of this skill gap")
//     })).describe("A list of skills that the candidate needs to improve or acquire to better match the requirements of the job."),

//     preparationPlanSchema: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan,"),
//         focus: z.string().describe(),
//         tasks: z.array(z.string()).describe("A list of tasks the candidate should complete during the day.")
//     })).describe("A structured day-by-day preparation plan designed to help the candidate improve their skills and prepare for the target job interview."),title:z.string().describe("The title of the job for which the interview report is generated")
// })
// async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
//     const prompt = `
// Analyze the candidate's resume, self-description, and job description.

// Resume:
// ${resume}

// Self Description:
// ${selfDescription}

// Job Description:
// ${jobDescription}

// Generate:
// - Match score (0-100)
// - Personalized technical interview questions with intention and answer guidance
// - Behavioral questions with intention and answer guidance
// - Missing skills with severity (low, medium, high)
// - A day-by-day preparation plan with focus and tasks

// Compare the candidate only with the given job requirements. Do not invent skills or experience. Return the result strictly according to the provided schema.
// `;
//     const response = await ai.models.generateContent({
//         model: "gemini-3.6-flash",
//         contents: prompt,
//         config: {
//             type: 'text',
//             responseMimeType: 'application/json',
//             jsonSchema: zodToJsonSchema(interviewReportSchema)

//         }
//     })

//     // console.log(JSON.parse(response.text));
//     const report = JSON.parse(response.text);

//     console.log(report);

//     return report;
// }
// export default generateInterviewReport;





>>>>>>> 0ce6e125e37f70dafffdcfe091008b8c69a78ee1
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const ai = new GoogleGenAI({
<<<<<<< HEAD
    apiKey: process.env.GOOGLE_GENAI_API_KEY?.trim(),
=======
    apiKey: process.env.GOOGLE_GENAI_API_KEY,
>>>>>>> 0ce6e125e37f70dafffdcfe091008b8c69a78ee1
});

// Zod v4 ships a native JSON Schema converter; zod-to-json-schema only
// understands v3 internals and silently produces `{}` for v4 schemas.
function getGeminiSchema(zodSchema) {
    const jsonSchema = z.toJSONSchema(zodSchema, { target: "draft-7" });
    delete jsonSchema.$schema;
    return jsonSchema;
}

// Fixed Schema Keys to match Mongoose Model exactly
const interviewReportSchema = z.object({
    matchScore: z
        .number()
        .min(0)
        .max(100)
        .describe("Score from 0 to 100 representing how well the candidate matches."),

    technicalQuestions: z
        .array(
            z.object({
                question: z.string().min(1).describe("Technical interview question."),
                intention: z.string().min(1).describe("Interviewer intention."),
                answer: z.string().min(10).describe("Guidance on how to answer."),
            })
        )
        .min(1, "At least one technical question is required.")
        .describe("List of technical interview questions."),

    behavioralQuestions: z
        .array(
            z.object({
                question: z.string().min(1).describe("Behavioral interview question."),
                intention: z.string().min(1).describe("Interviewer intention."),
                answer: z.string().min(10).describe("Guidance on how to answer."),
            })
        )
        .min(1, "At least one behavioral question is required.")
        .describe("List of behavioral interview questions."),

    skillsGap: z
        .array(
            z.object({
                skills: z.string().min(1).describe("Missing or weak skill."),
                severity: z.enum(["low", "medium", "high"]).describe("Gap severity level."),
            })
        )
        .min(1, "At least one skill gap is required.")
        .describe("Skills the candidate needs to acquire or improve."),

    preparationPlan: z
        .array(
            z.object({
                day: z.number().describe("Day number."),
                focus: z.string().min(1).describe("Focus topic for the day."),
                tasks: z.array(z.string().min(1)).describe("List of action items."),
            })
        )
        .min(1, "At least one preparation plan day is required.")
        .describe("Structured daily preparation plan."),

    title: z.string().min(1).describe("Short target job title for the report."),
});

<<<<<<< HEAD
// Keep the primary model configurable and use a stable fallback when Gemini
// returns 503 for a temporarily overloaded model.
const MODEL_NAMES = [
    process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
    "gemini-3.5-flash",
    "gemini-3.7-flash",
].filter((model, index, models) => models.indexOf(model) === index);
=======
const MODEL_NAME = "gemini-3.6-flash";
>>>>>>> 0ce6e125e37f70dafffdcfe091008b8c69a78ee1
const MAX_RETRIES = 3;
const RETRY_BASE_DELAY_MS = 1000;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryableStatus(status) {
    return status === 503 || status === 429;
}

async function generateContentWithRetry(request) {
<<<<<<< HEAD
    let lastError;

    for (const model of MODEL_NAMES) {
        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            try {
                return await ai.models.generateContent({ ...request, model });
            } catch (error) {
                lastError = error;
                const status = error?.status;
                const isLastAttempt = attempt === MAX_RETRIES;

                if (!isRetryableStatus(status)) {
                    throw error;
                }

                if (!isLastAttempt) {
                    const delay = RETRY_BASE_DELAY_MS * 2 ** (attempt - 1);
                    console.warn(
                        `Gemini model ${model} failed with status ${status} (attempt ${attempt}/${MAX_RETRIES}). Retrying in ${delay}ms...`
                    );
                    await sleep(delay);
                }
            }
        }

        if (lastError?.status === 503 && model !== MODEL_NAMES.at(-1)) {
            console.warn(
                `Gemini model ${model} is unavailable. Trying fallback model.`
            );
            continue;
        }

        throw lastError;
    }

    throw lastError;
=======
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            return await ai.models.generateContent(request);
        } catch (error) {
            const status = error?.status;
            const isLastAttempt = attempt === MAX_RETRIES;

            if (!isRetryableStatus(status) || isLastAttempt) {
                throw error;
            }

            const delay = RETRY_BASE_DELAY_MS * 2 ** (attempt - 1);
            console.warn(
                `Gemini request failed with status ${status} (attempt ${attempt}/${MAX_RETRIES}). Retrying in ${delay}ms...`
            );
            await sleep(delay);
        }
    }
>>>>>>> 0ce6e125e37f70dafffdcfe091008b8c69a78ee1
}

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    try {
        const prompt = `
You are an expert technical interviewer and career coach.

CANDIDATE RESUME:
${resume}

SELF DESCRIPTION:
${selfDescription}

JOB DESCRIPTION:
${jobDescription}

Generate a comprehensive interview report adhering strictly to the JSON schema.
`;

        const response = await generateContentWithRetry({
<<<<<<< HEAD
=======
            model: MODEL_NAME,
>>>>>>> 0ce6e125e37f70dafffdcfe091008b8c69a78ee1
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: getGeminiSchema(interviewReportSchema),
            },
        });

        if (!response || !response.text) {
            throw new Error("Gemini returned an empty response.");
        }

        let cleanedText = response.text.trim();
        if (cleanedText.startsWith("```")) {
            cleanedText = cleanedText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
        }

        const report = JSON.parse(cleanedText);
        console.log(
            "Raw AI report counts:",
            JSON.stringify({
                matchScore: report.matchScore,
                technicalQuestions: report.technicalQuestions?.length,
                behavioralQuestions: report.behavioralQuestions?.length,
                skillsGap: report.skillsGap?.length,
                preparationPlan: report.preparationPlan?.length,
                title: report.title,
            })
        );

        const validatedReport = interviewReportSchema.safeParse(report);

        if (!validatedReport.success) {
            console.error(
                "Zod Validation Errors:",
                JSON.stringify(validatedReport.error.issues, null, 2)
            );
            throw new Error("AI output failed validation against expected schema.");
        }

        return validatedReport.data;
    } catch (error) {
        console.error("AI Generation Service Error:", error);
        throw error;
    }
}

<<<<<<< HEAD
export default generateInterviewReport;
=======
export default generateInterviewReport;
>>>>>>> 0ce6e125e37f70dafffdcfe091008b8c69a78ee1

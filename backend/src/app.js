// const express = require("express")
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cookieParser())

const allowedOrigins = (process.env.FRONTEND_URLS || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
const isProduction = process.env.NODE_ENV === "production";

function isAllowedOrigin(origin) {
    if (allowedOrigins.includes(origin)) {
        return true;
    }

    // Vite may choose 5174, 5175, etc. when its default port is busy. Permit
    // only local browser origins during development; production remains exact.
    return !isProduction && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
}

app.use(cors({
    origin(origin, callback) {
        // Requests without an Origin header are commonly sent by health checks.
        if (!origin || isAllowedOrigin(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Request origin is not allowed by CORS"));
    },
    credentials: true,
}))

// Require all the routes here
import authRouter from './routes/auth.routes.js'
import interviewRouter from './routes/interview.routes.js'
// using all the routes here
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

// module.exports = app
export default app

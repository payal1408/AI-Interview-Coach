// const express = require("express")
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cookieParser())

const allowedOrigins = (process.env.FRONTEND_URLS)
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        // Requests without an Origin header are commonly sent by health checks.
        if (!origin || allowedOrigins.includes(origin)) {
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

import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import interviewController from '../controllers/interview.controller.js';
import upload from '../middleware/file.middleware.js';

const interviewRouter = express.Router();

/**
 * @route POST /api/interview/
 * @description Generate new interview report based on user self-description,
 * resume PDF, and job description
 * @access Private
 */
interviewRouter.post('/', authMiddleware.authUser, upload.single('resume'), interviewController.generateInterViewReportController
);

/**
 * @route GET /api/interview/report/interviewId
 * @description get interview report by interviewId
 * @access Private
 */
interviewRouter.get('/report/:interviewId',authMiddleware.authUser,interviewController.getInterViewReportController)

/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user
 * @access Private
 */
interviewRouter.get('/', authMiddleware.authUser,interviewController.getAllInterviewReportController
);

export default interviewRouter;
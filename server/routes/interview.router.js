import express from "express";

import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";

import {
  analyzeResume,
  generateQuestion,
  submitAnswer,
  finishInterview
} from "../controllers/interview.controller.js";

const interviewRouter = express.Router();

// Resume
interviewRouter.post(
  "/analyze-resume",
  isAuth,
  upload.single("resume"),
  analyzeResume
);

// Generate questions
interviewRouter.post(
  "/generate-questions",
  isAuth,
  generateQuestion
);

// Submit answer
interviewRouter.post(
  "/submit-answer",
  isAuth,
  submitAnswer
);

// Finish interview
interviewRouter.post(
  "/finish",
  isAuth,
  finishInterview
);

export default interviewRouter;

import express from "express"
import isAuth from "../middleware/isAuth.js"
import { upload } from "../middlewares/multer.js"
import { analyzeResume } from "../controllers/interview.controller.js"

const interview.router = express.Router()

interviewRouter.post("/resume",isAuth,uploadBytes.single("resume"),analyzeResume)

export default interview.router

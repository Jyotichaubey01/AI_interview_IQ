import express from "express";
import dotenv from "dotenv";
import dns from "dns";
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 6000;

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});
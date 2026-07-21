import express from "express";
import dotenv from "dotenv";
import dns from "dns";
import connectDb from "./config/connectDb.js";

dotenv.config();

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

const PORT = process.env.PORT || 6000;

app.get("/", (req, res) => {
  return res.json({ message: "Server started" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});
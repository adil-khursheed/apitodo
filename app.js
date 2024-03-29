import express from "express";
import { config } from "dotenv";
import User from "./routes/userRoute.js";
import Task from "./routes/taskRoute.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";

config({
  path: "./config/config.env",
});

const app = express();

const CLIENT_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
  })
);
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/api/v1", User);
app.use("/api/v1", Task);

app.get("/", (req, res) => {
  res.send("Server is running");
});

export default app;

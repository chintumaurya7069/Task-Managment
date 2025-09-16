import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRouter from "./routes/todo.js";
import userRouter from "./routes/user.js";
import projectRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import aiRouter from "./routes/gemini.js";
import path from "path";
import { authenticate } from "./middlewares/authenticated.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", authenticate, express.static("uploads"));
app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/auth", authRouter);
app.use("/api/generate-description", aiRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import { gemini } from "../controllers/gemini.js";

const router = express.Router();

router.post("/", gemini);

export default router;

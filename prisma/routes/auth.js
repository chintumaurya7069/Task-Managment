import express from "express";
import multer from "multer";
import { login, signup } from "../controllers/auth.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/signup", signup);
router.post("/login", login);

export default router;

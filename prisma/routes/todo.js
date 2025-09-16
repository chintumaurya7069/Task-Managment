import express from "express";
import {
  addTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/todo.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), addTask);
router.get("/get-task", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", upload.single("image"), updateTask);
router.delete("/:id", deleteTask);

export default router;

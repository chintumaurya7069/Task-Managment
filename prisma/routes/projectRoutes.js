import express from "express";
import {
  createProject,
  getUserProjects,
  getProjectById,
  inviteUserToProject,
  assignTaskToProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/", createProject);
router.get("/", getUserProjects);
router.get("/:id", getProjectById);
router.post("/:projectId/invite", inviteUserToProject);
router.post("/assign-task", assignTaskToProject);

export default router;

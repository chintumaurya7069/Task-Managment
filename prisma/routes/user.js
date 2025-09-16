import express from "express";
import { upload } from "../middlewares/multer.js";
import {
  addUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.post("/", addUser);
router.get("/get-user", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

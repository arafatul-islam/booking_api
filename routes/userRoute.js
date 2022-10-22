import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifytoken.js";

const router = express.Router();

// update
router.put("/:id", verifyUser, updateUser);
// delete
router.delete("/:id", verifyUser, deleteUser);
// get one
router.get("/:id", getUser);
// get all
router.get("/", getUsers);

export default router;

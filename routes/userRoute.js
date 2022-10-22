import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken, verifyUser } from "../utils/verifytoken.js";

const router = express.Router();

// check authentication
router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("hello user, you are logged in");
});
router.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("hello user, you are logged in and can delete your id");
});
router.get("/checkadmin/:id", verifyUser, (req, res, next) => {
  res.send("hello user, you are an admin");
});
// update
router.put("/:id", updateUser);
// delete
router.delete("/:id", deleteUser);
// get one
router.get("/:id", getUser);
// get all
router.get("/", getUsers);

export default router;

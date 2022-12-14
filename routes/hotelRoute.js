import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotelsController.js";
import { verifyAdmin } from "../utils/verifytoken.js";

const router = express.Router();

// create
router.post("/", verifyAdmin, createHotel);
// update
router.put("/:id", verifyAdmin, updateHotel);
// delete
router.delete("/:id", verifyAdmin, deleteHotel);
// get one
router.get("/:id", getHotel);
// get all
router.get("/", getHotels);
export default router;

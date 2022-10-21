import express from "express";
import {
  createHotel,
  deleteHotel,
  getHotel,
  getHotels,
  updateHotel,
} from "../controllers/hotelsController.js";


const router = express.Router();

// create
router.post("/", createHotel);
// update
router.put("/:id", updateHotel);
// delete
router.delete("/:id", deleteHotel);
// get one
router.get("/:id", getHotel);
// get all
router.get("/", getHotels);
export default router;

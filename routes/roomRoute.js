import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom} from "../controllers/roomsController.js";
import { verifyAdmin } from "../utils/verifytoken.js";

const router = express.Router();

// create room
router.post("/:hotelid", verifyAdmin, createRoom);
// updade room 
router.put("/:roomid", verifyAdmin, updateRoom);
// delete room 
router.delete("/:roomid/:hotelid", verifyAdmin, deleteRoom);

// get room 
router.get("/:roomid",  getRoom);
// get rooms
router.get("/",  getRooms);

export default router;

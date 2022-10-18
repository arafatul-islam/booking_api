import express from "express";
import hotelModel from "../model/hotelModel.js";
import { createError } from "../utils/createError.js";

const router = express.Router();

// create
router.post("/", async (req, res) => {
  const newHotel = new hotelModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    res.status(500).json(err);
  }
});
// update
router.put("/:id", async (req, res) => {
  try {
    const updatedHotel = await hotelModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    //  findByIdAndUpdate returns the previous data, to prevent this use {new: true} , it returns current data
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});
// delete
router.delete("/:id", async (req, res) => {
  // code
  try {
    const deletdHotel = await hotelModel.findByIdAndDelete(req.params.id);
    res.status(200).json(` Hotel id: ${req.params.id} is deleted! `);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get one
router.get("/:id", async (req, res, next) => {
  // code

  try {
    const findHotel = await hotelModel.findById(req.params.id);
    res.status(200).json(findHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});
// get all
router.get("/", async (req, res, next) => {
  // code
  const failed = true;
  if (failed) {
    return next(createError(401, "not authenticate!!"));
  }
  try {
    const findHotels = await hotelModel.findById("m");
    res.status(200).json(findHotels);
  } catch (error) {
    next(error);
  }
});
export default router;

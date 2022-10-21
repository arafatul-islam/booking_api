import hotelModel from "../model/hotelModel.js";
import { createError } from "../utils/createError.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new hotelModel(req.body);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(createError(500,"something wrong!hotel is not created."));
  }
};

export const updateHotel = async (req, res, next) => {
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
    next(createError(500, `hotel id: ${req.params.id} is not updated!`));
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
    const deletdHotel = await hotelModel.findByIdAndDelete(req.params.id);
    res.status(200).json(` Hotel id: ${req.params.id} is deleted! `);
  } catch (error) {
    next(createError(500,`hotel id: ${req.params.id} cannot delete!`));
  }
};

export const getHotel = async (req, res, next) => {
  try {
    const findHotel = await hotelModel.findById(req.params.id);
    res.status(200).json(findHotel);
  } catch (error) {
    next(createError(404,`hotel id: ${req.params.id} is not found!`));
  }
};

export const getHotels = async (req, res, next) => {
 
  try {
    const findHotels = await hotelModel.find();
    res.status(200).json(findHotels);
  } catch (error) {
    next(createError(404,`No hotels available!`));
  }
};

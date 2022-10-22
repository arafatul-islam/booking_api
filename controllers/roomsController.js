import roomModel from "../model/roomModel.js";
import hotelModel from "../model/hotelModel.js";
import { createError } from "../utils/createError.js";

export const createRoom = async (req, res, next) => {
  const hotelID = req.params.hotelid;
  const newRoom = new roomModel(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await hotelModel.findByIdAndUpdate(hotelID, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      return next(
        createError(401, `room could not added to hotel, hotelID:${hotelID} `)
      );
    }

    res.status(200).json(savedRoom);
  } catch (error) {
    return next(createError(500, "room is not created!"));
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelid = req.params.hotelid;

  try {
    await roomModel.findByIdAndDelete(req.params.roomid);

    try {
      await hotelModel.findByIdAndUpdate(hotelid, {
        $pull: { rooms: req.params.roomid },
      });
    } catch (error) {
      next(createError(403, "room could not deleted form hotel rooms array"));
    }
    res.status(200).json("room deleted from hotel rooms array");
  } catch (error) {
    next(createError(401, "room could not be deleted!"));
  }
};

export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await roomModel.findByIdAndUpdate(
      req.params.roomid,
      { $set: req.body },
      { new: true }
    );

    res.status(200).json(updatedRoom);
  } catch (error) {
    next(createError(401, `room ${req.params.roomid} could not be deleted!`));
  }
};

export const getRoom = async (req, res, next) => {
  try {
    const findRoom = await roomModel.findById(req.params.roomid);
    res.status(200).json(findRoom);
  } catch (error) {
    next(createError(404, `Room id: ${req.params.roomid} is not found!`));
  }
};

export const getRooms = async (req, res, next) => {
  try {
    const findRooms = await roomModel.find();
    res.status(200).json(findRooms);
  } catch (error) {
    next(createError(404, `No Rooms available!`));
  }
};

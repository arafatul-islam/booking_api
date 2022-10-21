import userModel from "../model/userModel.js";
import { createError } from "../utils/createError.js";

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    //  findByIdAndUpdate returns the previous data, to prevent this use {new: true} , it returns current data
    res.status(200).json(updatedUser);
  } catch (error) {
    next(createError(500, `User id: ${req.params.id} is not updated!`));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deletdUser = await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json(` User id: ${req.params.id} is deleted! `);
  } catch (error) {
    next(createError(500, `User id: ${req.params.id} cannot delete!`));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const findUser = await userModel.findById(req.params.id);
    res.status(200).json(findUser);
  } catch (error) {
    next(createError(404, `User id: ${req.params.id} is not found!`));
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const findUsers = await userModel.find();
    res.status(200).json(findUsers);
  } catch (error) {
    next(createError(404, `No Users available!`));
  }
};

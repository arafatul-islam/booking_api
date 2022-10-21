import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../model/userModel.js";
import { createError } from "../utils/createError.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).send("user has been created");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "user not found!"));
    }

    const confirmPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!confirmPassword) {
      return next(createError(400, "wrong username or password !"));
    }
    const token = await jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...others } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json({ ...others });
  } catch (error) {
    next(error);
  }
};

export const updateHotel = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).send("You are not an admin");
  }
};

export const deleteHotel = async (req, res, next) => {
  try {
  } catch (error) {
    res.status(500).send("You are not an admin");
  }
};

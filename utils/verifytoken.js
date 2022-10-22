import { createError } from "./createError.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (error, user) => {
    if (error) {
      return next(createError(403, "token is not valid"));
    }

    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id ) {
      next();
    } else {
      return next(createError(403, "You are not authorized!!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id && req.user.isAdmin  ) {
        next();
      } else {
        return next(createError(403, "You are not authorized!!"));
      }
    });
  };
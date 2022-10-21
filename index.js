import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//own
import database from "./db.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";
import hotelRouter from "./routes/hotelRoute.js";
import roomRouter from "./routes/roomRoute.js";

const app = express();
dotenv.config();
database();
const port = process.env.PORT || 8800;

// middleware
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/rooms", roomRouter);

app.use((err, req, res, next) => {
  const errorsStatus = err.status || 500;
  const errorsCode = err.code || 404;
  const errorsMessage = err.message || "something went wrong!!";

  return res.status(errorsStatus).json({
    success: false,
    status: errorsStatus,
    code: errorsCode,
    message: errorsMessage,
    stack: err.stack,
  });
});

app.listen(port, () => console.log("server running on port", port));

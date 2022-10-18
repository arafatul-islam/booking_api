import express from "express";
import dotenv from "dotenv";
import mongoose, { connect } from "mongoose";

//
import database from "./db.js";

const app = express();
dotenv.config();
database();
const port = process.env.PORT || 8800;

// middleware
app.get("/", (req, res) => {
  res.send("sending request!");
});

app.listen(port, () => console.log("server running on port", port));

import express from "express";

const router = express.Router();

router.get("/", (req,res)=>{
    res.send("room");
})

export default router;
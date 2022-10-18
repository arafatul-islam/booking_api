import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("mongodb connected!");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected",()=>{
    console.log("mongodb disconnected!");
});

mongoose.connection.on("connected",()=>{
    console.log("mongodb connected!");
})

export default connect

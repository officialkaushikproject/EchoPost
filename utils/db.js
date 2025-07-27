import mongoose from "mongoose";
let isConnected = false;

export const connect = async () => {
  const url = process.env.MONGODB_URI;
  if (isConnected) return;
  try {
    const db = await mongoose.connect(url);
    if (db) {
      isConnected = true;
      console.log("Connection sucess");
    }
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

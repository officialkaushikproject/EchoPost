import mongoose from "mongoose";

export const connect = async() =>{
    const url = process.env.MONGODB_URI
    try {
        const db = await mongoose.connect(url)
        if(db){
            console.log("Connection sucess")
        }
    } catch (error) {
        console.log("Something went wrong", error);
    }
}
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connect to Mongo DB successfully")
    } catch (error) {
        console.log("Error in connect Mongo DB: ", error.message);
    }
}
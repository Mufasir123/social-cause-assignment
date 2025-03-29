import mongoose from "mongoose";

// Connect to MongoDB

const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.DBCONNECT);
        console.log("Connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}

export default dbConnect;
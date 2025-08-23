import mongoose from "mongoose";

export async function connectDatabase(params) {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/learningApp", {
            useNewUrlParser: true, // Use the new URL parser
            useUnifiedTopology: true // Use the new unified topology layer
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
    }
}
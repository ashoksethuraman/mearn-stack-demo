import mongoose from "mongoose";

export async function connectDatabase(params) {
    try {
        // mongoose automatically uses the connection pool from mongodb driver
       let DB = await mongoose.connect("mongodb://127.0.0.1:27017/learningApp", {
            useNewUrlParser: true, // Use the new URL parser
            useUnifiedTopology: true, // Use the new unified topology layer
            maxPoolSize: 10,   // Maximum connections in pool
            minPoolSize: 2,    // Minimum connections
            serverSelectionTimeoutMS: 5000
        });
        // Enable profiling for all operations- monitoring the logs and performance.
        // DB.setProfilingLevel(2);

        // Enable profiling only for slow ops ( > 50ms )
        // DB.setProfilingLevel(1, { slowms: 50 });
        console.log("Database connected successfully", DB.getProfilingStatus());
        // to get the profile information under each database
        // db.system.profile.find().pretty();
    } catch (error) {
        console.error("Database connection error:", error);
    }
}
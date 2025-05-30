import mongoose from "mongoose";

let connected = false;

export const connectDB = async () => {
   mongoose.set("strictQuery", true);


   // Check if already connected to the database
   if (connected) {
    console.log("MongoDB is already connected");
    return;
   }
// connect to the database
   try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
   } catch (error) {
       console.error("MongoDB connection error:", error.message);
    
   }
   
};
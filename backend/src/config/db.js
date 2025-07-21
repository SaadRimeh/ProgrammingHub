//Connect to DataBase MONGODB
import mongoose  from "mongoose";
import { ENV } from "./env.js";


export const connectDB = async () => {

try{
    await mongoose.connect(ENV.MONGO_URI);
    console.log(`Connected to DB Successfully`);

}catch(error){
    console.log("Error connecting to DB");
    process.exit(1);

}

}

export default connectDB;
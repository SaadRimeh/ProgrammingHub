import dotenv from "dotenv";

dotenv.config();
{/*
    -First in the root of project create .env file 
    -put the value of this attributes 
    
    */}
export const ENV ={

    PORT:process.env.PORT,
    NODE_ENV:process.env.NODE_ENV,

    CLERK_PUBLISHABLE_KEY:process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY:process.env.CLERK_SECRET_KEY,


    MONGO_URI:process.env.MONGO_URI,

    ARCJET_KEY:process.env.ARCJET_KEY,


    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
    CLODINARY_API_KEY:process.env.CLODINARY_API_KEY,
    CLODINARY_API_SECRET:process.env.CLODINARY_API_SECRET,

};
import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";

import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";

import { ENV } from "./config/env.js";
import { ConnectDB } from "./config/db.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.get("/" , (req , res)=>res.send("Hello from Server"));

// Implement the API's
app.use("/api/users",userRoutes);
app.use("/api/posts",postRoutes);


const startServer = async ()=>{

    try{
await ConnectDB();
app.listen(ENV.PORT , ()=> console.log(`Server is up and running on PORT: ${ENV.PORT}`));

    }catch(error){
        console.error("Failed to start server:" , error.message);
process.exit(1);
    }
};
startServer();
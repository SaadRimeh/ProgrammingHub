import express from "express";
import { ENV } from "./config/env.js";
import { ConnectDB } from "./config/db.js";


const app = express();
app.get("/" , (req , res)=>res.send("Hello from Server"));
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
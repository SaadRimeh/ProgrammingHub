import asyncHandler from "express-async-handler"
import User from "../models/user.model.js"
import { clerkClient, getAuth } from "@clerk/express";


//To get user profile it dose not want to be logged in
export const getUserProfile = asyncHandler(async (req , res)=>{
const {username} = req.params;
const user = await User.findOne({username});
if(!user) return res.status(404).json({error:"User not found"});

res.status(200).json({user});
});


//To update the profile the user should be logged in the same profile
export const updateProfile = asyncHandler (async (req, res )=>{
const {userId}= getAuth(req);
const user = await User.findByIdAndUpdate({clerkId:userId},req.body,{new:true});
if(!user) return res.status(404).json({error:"User not found"});
res.status(200).json({user});

});


//To async Users
export const syncUser =asyncHandler(async (req ,res)=>{
const {userId}=getAuth(req);

//check if user already exists in mongodb
const existingUser = await User.findOne({clerkId:userId});
if(existingUser){
    return res.status(200).json({user:existingUser , message:"User already exists"});
}

//create new user from clerk data
const clerkUser = await clerkClient.users.getUser(userId);

});
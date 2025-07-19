import asyncHandler from "express-async-handler"
import User from "../models/user.model.js"
import Notification from "../models/user.model.js"

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

const userData={
clerkId: userId,
email:clerkUser.emailAddresses[0].emailAddress,
firstName:clerkUser.firstName || "",
lastName:clerkUser.lastName || "",
username:clerkUser.emailAddresses[0].emailAddress.split("@")[0],
profilePicture:clerkUser.imageUrl || "",
};

const user=await User.create(userData);

res.status(201).json({user , message:"User created Successfully"});

});


// To get the Current user
export const getCurrentUSer=asyncHandler(async(req,res)=>{
const {userId}=getAuth(req);
const user = await User.findOne({clerkId:userId});

if(!user) return res.status(404).json({error:"User not found"});
res.status(200).json({user});
});

export const followUser = asyncHandler(async(req , res)=>{
const {userId}= getAuth(req);
const {targetUserId}=req.params;

if(userId === targetUserId) return res.status(400).json({error:"You cannot follow yourself"});

const currentUSer = await User.findOne({clerkId:userId});
const targetUser = await User.findById({targetUserId});

if(!currentUSer || ! targetUser) return res.status(404).json({error:"User not found"});

const isFollowing = currentUSer.following.includes(targetUserId);

if(isFollowing){
    //unfollow
    await User.findByIdAndUpdate(currentUSer._id , {
        $pull: {following: targetUserId},
    });
    await User.findByIdAndUpdate(targetUserId,{
        $pull:{followers:currentUSer._id},
    });
} else {
    //follow
    await User.findByIdAndUpdate(currentUSer._id ,{
        $push:{following:targetUserId},
    });
    await User.findByIdAndUpdate(targetUserId , {
        $push:{followers: currentUSer._id},
    });

    // create notification
    await Notification.create({
        from : currentUSer._id,
        to:targetUserId,
        type:"follow",
    });
}
res.status(200).json({
    message: isFollowing ? "User unfollowed Successfully ":"User followed successfully",
});

});
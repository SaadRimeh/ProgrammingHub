import asyncHandler from "express-async-handler";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

//Get all Posts
export const getPosts = asyncHandler(async (req , res)=>{
   const posts = await Post.find()
   .sort({ createdAt:-1 })
   .populate("user" , "username firstName lastName profilePicture")
   .populate({
    path:"comments",
    populate:{
        path:"user",
select:"username firstName lastName profilePicture",
    },
    
   });
   res.status(200).json({posts});


});

//Get single Post
export const getPost = asyncHandler(async (req , res)=> {
  const {postId}=req.params;

  const post = await Post.findById(postId)
  .populate("user" , "username firstName lastName profilePicture")
  .populate({
    path:"comments",
    populate:{
        path:"user",
        select:"username firstName lastName profilePicture",
    },
  });
  if(!post) return res.status(404).json({error:"Post not found"});
  res.status(200).json({post});
  });


//Get User posts 
export const getUserPosts = asyncHandler(async (req , res )=>{
    const {username}=req.params;

    const user = await User.findOne({username});
    if(!user) return res.status(404).json({error:"User Not Found"});

    const posts = await Post.find({user:user._id})
    .sort({createdAt:-1})
    .populate("user" , "username firstName lastName profilePicture")
    .populate({
        path:"comments",
        populate:{
            path:"user",
            select:"username firstName lastName profilePicture",
        },
    });
    res.status(200).json({posts});
});
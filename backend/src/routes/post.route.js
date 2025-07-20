import express from "express";
import { getPost, getPosts, getUserPosts } from "../controllers/post.controller";

const router=express.Router();

//public routes
router.get("/",getPosts);
router.get("/:postId", getPost);
router.get("/user/:username",getUserPosts);

export default router;
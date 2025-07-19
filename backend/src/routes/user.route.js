import express from "express";
import { followUser, getCurrentUSer, getUserProfile, syncUser, updateProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/profile/:username",getUserProfile);

router.post("/sync",protectRoute,syncUser);
router.post("/me",protectRoute,getCurrentUSer);
router.put("/profile", protectRoute,updateProfile);
router.post("/follow/:targetUserId",protectRoute,followUser);
export default router;
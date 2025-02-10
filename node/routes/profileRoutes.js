import express from "express";
import { editProfile, getProfileById, getProfiles, removeProfileById, saveProfile } from "../controllers/profileController.js";

const router = express.Router();

router.post("/save-profile", saveProfile);
router.get("/profiles", getProfiles);
router.get("/profiles/:id", getProfileById);
router.delete("/profiles/:id", removeProfileById);
router.put("/profiles/:id", editProfile);

export default router;

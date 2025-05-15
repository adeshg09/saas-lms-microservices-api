import { Router } from "express";
import { getProfile } from "../controllers/account-controller.js";
const router = Router();

// Account Routes
router.get("/getProfile", getProfile);
// router.post("/changePassword/:id", changePassword);
// router.post("/changeProfilePhoto/:id", resetPassword);

export default router;

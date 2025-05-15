import { Router } from "express";
import {
  loginUser,
  forgotPassword,
  resetPassword,
} from "../controllers/auth-controller.js";
const router = Router();

// Auth Routes
router.post("/loginUser", loginUser);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);

export default router;

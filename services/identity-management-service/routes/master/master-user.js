import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
} from "../../controllers/master/master-user-controller.js";
const router = Router();

router.post("/registerUser", registerUser);
router.post("/updateUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);
router.get("/getUser/:id", getUserById);
router.get("/getAllUsers", getAllUsers);

export default router;

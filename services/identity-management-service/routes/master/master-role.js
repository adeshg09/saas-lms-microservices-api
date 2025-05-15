import { Router } from "express";
import {
  deleteRole,
  getAllRoles,
  getRoleById,
  insertRole,
  updateRole,
} from "../../controllers/master/master-role-controller.js";
const router = Router();

router.post("/insertRole", insertRole);
router.put("/updateRole/:id", updateRole);
router.delete("/deleteRole/:id", deleteRole);
router.get("/getRole/:id", getRoleById);
router.get("/getAllRoles", getAllRoles);

export default router;

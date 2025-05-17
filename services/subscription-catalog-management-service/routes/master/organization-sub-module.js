import { Router } from "express";
import {
  insertSubModule,
  updateSubModule,
  deleteSubModule,
  getSubModuleById,
  getAllSubModules,
} from "../../controllers/master/organization-sub-module-controller.js";

const router = Router();

router.post("/insertSubModule", insertSubModule);
router.put("/updateSubModule/:id", updateSubModule);
router.delete("/deleteSubModule/:id", deleteSubModule);
router.get("/getSubModule/:id", getSubModuleById);
router.get("/getAllSubModules", getAllSubModules);

export default router;

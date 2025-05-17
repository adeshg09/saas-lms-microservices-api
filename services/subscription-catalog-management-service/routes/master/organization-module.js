import { Router } from "express";
import {
  deleteModule,
  getAllModules,
  getModuleById,
  insertModule,
  updateModule,
} from "../../controllers/master/organization-module-controller.js";

const router = Router();

router.post("/insertModule", insertModule);
router.put("/updateModule/:id", updateModule);
router.delete("/deleteModule/:id", deleteModule);
router.get("/getModule/:id", getModuleById);
router.get("/getAllModules", getAllModules);

export default router;

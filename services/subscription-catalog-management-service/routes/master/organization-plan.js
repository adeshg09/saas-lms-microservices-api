import { Router } from "express";
import {
  deletePlan,
  getAllPlans,
  getPlanById,
  insertPlan,
  updatePlan,
} from "../../controllers/master/organization-plan-controller.js";

const router = Router();

router.post("/insertPlan", insertPlan);
router.put("/updatePlan/:id", updatePlan);
router.delete("/deletePlan/:id", deletePlan);
router.get("/getPlan/:id", getPlanById);
router.get("/getAllPlans", getAllPlans);

export default router;

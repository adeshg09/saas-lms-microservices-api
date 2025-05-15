import { Router } from "express";
import {
  deleteDashboardSection,
  generateDashboardSectionCode,
  getAllDashboardSections,
  getDashboardSectionById,
  insertDashboardSection,
  updateDashboardSection,
} from "../../controllers/master/master-dashboard-sections-controller.js";

const router = Router();

router.post("/generateDashboardSectionCode", generateDashboardSectionCode);
router.post("/insertDashboardSection", insertDashboardSection);
router.put("/updateDashboardSection/:id", updateDashboardSection);
router.delete("/deleteDashboardSection/:id", deleteDashboardSection);
router.get("/getDashboardSection/:id", getDashboardSectionById);
router.get("/getAllDashboardSections", getAllDashboardSections);

export default router;

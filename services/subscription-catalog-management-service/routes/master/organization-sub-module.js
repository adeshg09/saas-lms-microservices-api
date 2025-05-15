import { Router } from "express";
// import {
//   deleteDashboardSection,
//   generateDashboardSectionCode,
//   getAllDashboardSections,
//   getDashboardSectionById,
//   insertDashboardSection,
//   updateDashboardSection,
// } from "../../controllers/master/master-dashboard-sections-controller.js";

const router = Router();

router.post("/insertSubModule", insertSubModule);
router.put("/updateSubModule/:id", updateSubModule);
router.delete("/deleteSubModule/:id", deleteSubModule);
router.get("/getSubModule/:id", getSubModuleById);
router.get("/getAllSubModules", getAllSubModules);

export default router;

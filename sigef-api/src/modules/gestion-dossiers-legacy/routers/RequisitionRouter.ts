import express from "express";
import RequisitionController from "../controllers/RequisitionController";

const router = express.Router();

router.get("/", RequisitionController.getAllRequisitions);
router.get("/:id", RequisitionController.getRequisition);
router.post("/", RequisitionController.createRequisition);
router.put("/:id", RequisitionController.updateRequisition);
router.delete("/:id", RequisitionController.deleteRequisition);

export default router;

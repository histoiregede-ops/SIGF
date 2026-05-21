import express from "express";
import BordereauAnalytiqueController from "../controllers/BordereauAnalytiqueController";

const router = express.Router();

router.get("/", BordereauAnalytiqueController.getAllBordereauxAnalytiques);
router.get("/:id", BordereauAnalytiqueController.getBordereauAnalytique);
router.post("/", BordereauAnalytiqueController.createBordereauAnalytique);
router.put("/:id", BordereauAnalytiqueController.updateBordereauAnalytique);
router.delete("/:id", BordereauAnalytiqueController.deleteBordereauAnalytique);

export default router;

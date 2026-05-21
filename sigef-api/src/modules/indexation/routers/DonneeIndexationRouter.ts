import express from "express"
import DonneeIndexationController from "../controllers/DonneeIndexationController"

const router = express.Router()

router
    .get('/', DonneeIndexationController.getAllDonneesIndexation)
    .get('/statistics/count', [], DonneeIndexationController.getCount)
    .get('/:id', DonneeIndexationController.getDonneeIndexation)
    .delete('/:id', [], DonneeIndexationController.deleteDonneeIndexation)

export default router
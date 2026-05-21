import express from "express"

import OppositionCasInscriptionDiffereeController from "../controllers/OppositionCasInscriptionDiffereeController";

const router = express.Router()

router
    .get('/', OppositionCasInscriptionDiffereeController.getAllOppositionsCasInscriptionDifferee)
    .post('/', [], OppositionCasInscriptionDiffereeController.createOppositionCasInscriptionDifferee)
    .get('/statistics/count', [], OppositionCasInscriptionDiffereeController.getCount)
    .get('/:id', OppositionCasInscriptionDiffereeController.getOppositionCasInscriptionDifferee)
    .put('/:id', [], OppositionCasInscriptionDiffereeController.updateOppositionCasInscriptionDifferee)
    .delete('/:id', [], OppositionCasInscriptionDiffereeController.deleteOppositionCasInscriptionDifferee)

export default router
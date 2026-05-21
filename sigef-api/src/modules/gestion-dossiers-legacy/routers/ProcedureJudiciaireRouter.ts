import express from "express"

import ProcedureJudiciaireController from "../controllers/ProcedureJudiciaireController"

const router = express.Router()

router
    .get('/', ProcedureJudiciaireController.getAllProcedureJudiciaires)
    .post('/', [], ProcedureJudiciaireController.createProcedureJudiciaire)
    .get('/statistics/count', [], ProcedureJudiciaireController.getCount)
    .get('/:id', ProcedureJudiciaireController.getProcedureJudiciaire)
    .put('/:id', [], ProcedureJudiciaireController.updateProcedureJudiciaire)
    .delete('/:id', [], ProcedureJudiciaireController.deleteProcedureJudiciaire)

export default router
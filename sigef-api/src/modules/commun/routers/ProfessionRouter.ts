import express from "express"

import ProfessionController from "../controllers/ProfessionController";

const router = express.Router()

router
    .get('/', ProfessionController.getAllProfessions)
    .post('/', [], ProfessionController.createProfession)
    .get('/statistics/count', [], ProfessionController.getCount)
    .get('/:id', ProfessionController.getProfession)
    .put('/:id', [], ProfessionController.updateProfession)
    .delete('/:id', [], ProfessionController.deleteProfession)

export default router
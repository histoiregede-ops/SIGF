import express from "express"

import TypeDepotController from "../controllers/TypeDepotController";

const router = express.Router()

router
    .get('/', TypeDepotController.getAllTypesDepot)
    .post('/', [], TypeDepotController.createTypeDepot)
    .get('/statistics/count', [], TypeDepotController.getCount)
    .get('/:id', TypeDepotController.getTypeDepot)
    .put('/:id', [], TypeDepotController.updateTypeDepot)
    .delete('/:id', [], TypeDepotController.deleteTypeDepot)

export default router
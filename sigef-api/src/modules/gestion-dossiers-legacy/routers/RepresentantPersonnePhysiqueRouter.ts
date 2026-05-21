import express from "express"

import RepresentantPersonnePhysiqueController from "../controllers/RepresentantPersonnePhysiqueController"

const router = express.Router()

router
    .get('/', RepresentantPersonnePhysiqueController.getAllRepresentantsPersonnePhysique)
    .post('/', [], RepresentantPersonnePhysiqueController.createRepresentantPersonnePhysique)
    .get('/statistics/count', [], RepresentantPersonnePhysiqueController.getCount)
    .get('/:id', RepresentantPersonnePhysiqueController.getRepresentantPersonnePhysique)
    .put('/:id', [], RepresentantPersonnePhysiqueController.updateRepresentantPersonnePhysique)
    .delete('/:id', [], RepresentantPersonnePhysiqueController.deleteRepresentantPersonnePhysique)

export default router
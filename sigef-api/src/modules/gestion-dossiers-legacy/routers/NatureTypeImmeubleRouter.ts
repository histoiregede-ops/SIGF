import express from "express"

import NatureTypeImmeubleController from "../controllers/NatureTypeImmeubleController";

const router = express.Router()

router
    .get('/', NatureTypeImmeubleController.getAllNaturesTypeImmeuble)
    .post('/', [], NatureTypeImmeubleController.createNatureTypeImmeuble)
    .get('/statistics/count', [], NatureTypeImmeubleController.getCount)
    .get('/:id', NatureTypeImmeubleController.getNatureTypeImmeuble)
    .put('/:id', [], NatureTypeImmeubleController.updateNatureTypeImmeuble)
    .delete('/:id', [], NatureTypeImmeubleController.deleteNatureTypeImmeuble)

export default router
import express from "express"

import TypeLienGroupeController from "../controllers/TypeLienGroupeController";

const router = express.Router()

router
    .get('/', TypeLienGroupeController.getAllTypesLienGroupe)
    .post('/', [], TypeLienGroupeController.createTypeLienGroupe)
    .get('/statistics/count', [], TypeLienGroupeController.getCount)
    .get('/:id', TypeLienGroupeController.getTypeLienGroupe)
    .put('/:id', [], TypeLienGroupeController.updateTypeLienGroupe)
    .delete('/:id', [], TypeLienGroupeController.deleteTypeLienGroupe)

export default router
import express from "express"

import TypeRegistreController from "../controllers/TypeRegistreController";

const router = express.Router()

router
    .get('/', TypeRegistreController.getAllTypesRegistre)
    .get('/statistics/count', [], TypeRegistreController.getCount)
    .get('/:id', TypeRegistreController.getTypeRegistre)

export default router
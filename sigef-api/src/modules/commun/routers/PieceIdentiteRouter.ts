import express from "express"

import PieceIdentiteController from "../controllers/PieceIdentiteController";

const router = express.Router()

router
    .get('/', PieceIdentiteController.getAllPiecesIdentite)
    .post('/', [], PieceIdentiteController.createPieceIdentite)
    .get('/statistics/count', [], PieceIdentiteController.getCount)
    .get('/:id', PieceIdentiteController.getPieceIdentite)
    .put('/:id', [], PieceIdentiteController.updatePieceIdentite)
    .delete('/:id', [], PieceIdentiteController.deletePieceIdentite)

export default router
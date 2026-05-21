import express from "express"
import multer from "multer"
import * as path from "path"
import * as fs from "fs"
import { customAlphabet } from 'nanoid'

import PieceDeposeeController from "../controllers/PieceDeposeeController"

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const dir: string = "public/pieces/"
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true })
        }

        callback(null, dir)
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + path.extname(file.originalname)
        const nanoid = customAlphabet('1234567890abcdef', 30)

        callback(null, nanoid() + '_' + uniqueSuffix)
    },
})
const upload = multer({ storage: storage })

const router = express.Router()

router
    .get('/', PieceDeposeeController.getAllPiecesDeposees)
    .post('/', [PieceDeposeeController.uploadPieceDeposee()], PieceDeposeeController.createPieceDeposee)
    .get('/statistics/count', [], PieceDeposeeController.getCount)
    .get('/:id', PieceDeposeeController.getPieceDeposee)
    .get('/:id/contenu', PieceDeposeeController.getPieceDeposeeContenu)
    .put('/:id', [], PieceDeposeeController.updatePieceDeposee)
    .put('/:id/contenu', [PieceDeposeeController.uploadPieceDeposee()], PieceDeposeeController.updatePieceDeposeeContenu)
    .delete('/:id', [], PieceDeposeeController.deletePieceDeposee)

export default router
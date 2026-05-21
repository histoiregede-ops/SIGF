import express, { Request, Response, NextFunction } from "express"

import ProgressionTacheIndexationController from "../controllers/ProgressionTacheIndexationController"

const router = express.Router()

const validateProgressionQuery = (req: Request, res: Response, next: NextFunction): void => {
    const typeRegistre = req.query.typeRegistre
    const tacheIndexationId = req.query.tacheIndexationId

    if (!typeRegistre || typeof typeRegistre !== 'string' || !tacheIndexationId || typeof tacheIndexationId !== 'string') {
        res.status(400).json({
            success: false,
            message: 'Les paramètres query typeRegistre et tacheIndexationId sont requis.'
        })
        return
    }

    next()
}

const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
}

router
    .get('/', validateProgressionQuery, asyncHandler(ProgressionTacheIndexationController.getAllProgresssionsTachesIndexation))
    .post('/', [], asyncHandler(ProgressionTacheIndexationController.createProgressionTacheIndexation))
    .get('/statistics/count', [], asyncHandler(ProgressionTacheIndexationController.getCount))
    .get('/:id', asyncHandler(ProgressionTacheIndexationController.getProgressionTacheIndexation))
    // .put('/:id/rejet', [], asyncHandler(ProgressionTacheIndexationController.rejeterProgressionTacheIndexation))
    .put('/:id', [], asyncHandler(ProgressionTacheIndexationController.updateProgressionTacheIndexation))
    .delete('/:id', [], asyncHandler(ProgressionTacheIndexationController.deleteProgressionTacheIndexation))

export default router
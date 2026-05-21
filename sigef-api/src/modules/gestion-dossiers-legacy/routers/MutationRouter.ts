import express from "express"

import MutationController from "../controllers/MutationController"

const router = express.Router()

router
    .get('/', MutationController.getAllMutations)
    .post('/', [], MutationController.createMutation)
    .get('/statistics/count', [], MutationController.getCount)
    .get('/:id', MutationController.getMutation)
    .put('/:id', [], MutationController.updateMutation)
    .delete('/:id', [], MutationController.deleteMutation)

export default router
import express from "express"

import PrivilegeHypothequeController from "../controllers/PrivilegeHypothequeController";

const router = express.Router()

router
    .get('/', PrivilegeHypothequeController.getAllPrivilegesHypotheques)
    .post('/', [], PrivilegeHypothequeController.createPrivilegeHypotheque)
    .get('/statistics/count', [], PrivilegeHypothequeController.getCount)
    .get('/:id', PrivilegeHypothequeController.getPrivilegeHypotheque)
    .put('/:id', [], PrivilegeHypothequeController.updatePrivilegeHypotheque)
    .delete('/:id', [], PrivilegeHypothequeController.deletePrivilegeHypotheque)

export default router
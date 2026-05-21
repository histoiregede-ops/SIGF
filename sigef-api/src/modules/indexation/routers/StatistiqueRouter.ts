import express from "express"

import StatistiqueController from "../controllers/StatistiqueController"

const router = express.Router()

router
    .get('/globales', StatistiqueController.getStatistiquesGlobales)
    .get('/indexation', StatistiqueController.getStatistiquesIndexation)
    .get('/controle', StatistiqueController.getStatistiquesControle)
    .get('/suiviJournalier', StatistiqueController.getStatistiquesSuiviJournalier)
    .get('/quotas/indexation', StatistiqueController.getStatistiquesQuotasParIndexeur)
    .get('/quotas/controle', StatistiqueController.getStatistiquesQuotasParControleur)

export default router
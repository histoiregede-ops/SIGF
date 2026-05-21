import express from "express";
import UtilisateurController from "../controllers/UtilisateurController";

const router = express.Router();

/**
 * @swagger
 * /auth/utilisateurs:
 *   post:
 *     summary: Créer un utilisateur
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenom
 *               - email
 *               - telephone
 *               - dateNaissance
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               telephone:
 *                 type: string
 *               dateNaissance:
 *                 type: string
 *                 format: date
 *               profilId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         $ref: '#/components/schemas/Error'
 */
router.post("/", UtilisateurController.registerUtilisateur);

/**
 * @swagger
 * /auth/utilisateurs:
 *   get:
 *     summary: Liste tous les utilisateurs
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: number
 *       - name: limit
 *         in: query
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Liste paginée
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginatedResponse'
 */
router.get("/", UtilisateurController.getAllUtilisateurs);

/**
 * @swagger
 * /auth/utilisateurs/statistics/count:
 *   get:
 *     summary: Compteur utilisateurs
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Nombre total
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 */
router.get("/statistics/count", UtilisateurController.getCount);

/**
 * @swagger
 * /auth/utilisateurs/{id}:
 *   get:
 *     summary: Détail utilisateur
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         $ref: '#/components/schemas/Error'
 */
router.get("/:id", UtilisateurController.getUtilisateur);

/**
 * @swagger
 * /auth/utilisateurs/{id}:
 *   put:
 *     summary: Mettre à jour un utilisateur
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 */
router.put("/:id", UtilisateurController.updateUtilisateur);

/**
 * @swagger
 * /auth/utilisateurs/{id}:
 *   delete:
 *     summary: Supprimer un utilisateur
 *     tags: [Utilisateurs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Utilisateur supprimé
 */
router.delete("/:id", UtilisateurController.deleteUtilisateur);

export default router;


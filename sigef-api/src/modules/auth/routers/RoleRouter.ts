import express from "express";
import RoleController from "../controllers/RoleController";

const router = express.Router();

/**
 * @swagger
 * /auth/roles:
 *   get:
 *     summary: Liste tous les rôles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Liste des rôles paginée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Role'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */
router.get("/", RoleController.getAllRoles);

/**
 * @swagger
 * /auth/roles/statistics/count:
 *   get:
 *     summary: Compteur total des rôles
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Nombre total de rôles
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 */
router.get("/statistics/count", RoleController.getCount);

/**
 * @swagger
 * /auth/roles/{id}:
 *   get:
 *     summary: Récupère un rôle par ID
 *     tags: [Roles]
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
 *         description: Détails du rôle
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       404:
 *         description: Rôle non trouvé
 */
router.get("/:id", RoleController.getRole);

export default router;


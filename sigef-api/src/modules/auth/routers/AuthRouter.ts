import express from "express";
import multer from "multer";
import * as fs from "fs";
import { customAlphabet } from 'nanoid';

import AuthController from "../controllers/AuthController";
import Authenticate from "../../../core/middlewares/Authenticate";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const dir: string = "public/auth/profiles/";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        callback(null, dir);
    },
    filename: (req, file, callback) => {
        const nanoid = customAlphabet('1234567890abcdef', 50);
        callback(null, nanoid());
    },
});
const upload = multer({ storage: storage });

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: test12348
 *     responses:
 *       200:
 *         description: Token JWT retourné
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       400:
 *         $ref: '#/components/schemas/Error'
 *     security: []
 */
router.post("/login", AuthController.login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Inscription nouvel utilisateur
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roleId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Utilisateur créé
 *       400:
 *         $ref: '#/components/schemas/Error'
 *     security: []
 */
router.post("/register", AuthController.register);

/**
 * @swagger
 * /auth/register/usager:
 *   post:
 *     summary: Création agent par admin
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               email:
 *                 type: string
 *               roleId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Agent créé
 */
router.post("/register/usager", Authenticate, AuthController.registerAgent);

/**
 * @swagger
 * /auth/update-profile:
 *   post:
 *     summary: Mettre à jour profil utilisateur
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profile:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profil mis à jour
 */
router.post("/update-profile", Authenticate, upload.single('profile'), AuthController.updateProfile);

router.get("/send-email-confirm-link", Authenticate, AuthController.sendEmailConfirmLink);

router.post("/confirm", AuthController.emailConfirm);

router.get("/send-password-reset-link", AuthController.sendPasswordResetLink);

router.put("/reset", Authenticate, AuthController.passwordReset);

/**
 * @swagger
 * /auth/logged-user:
 *   get:
 *     summary: Informations utilisateur connecté
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Détails utilisateur
 */
router.get("/logged-user", Authenticate, AuthController.getLoggedUser);

router.get("/logged-user/roles", Authenticate, AuthController.getLoggedUserRoles);

export default router;


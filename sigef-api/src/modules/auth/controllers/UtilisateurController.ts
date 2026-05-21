import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { Utilisateur } from "../models/Utilisateur";
import { Profil } from "../models/Profil";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import * as bcrypt from 'bcryptjs';

export default class UtilisateurController {
    static ATTRIBUTES = ['id', 'nom', 'prenoms', 'identifiant', 'email', 'contact', 'photoDeProfil', 'actif', 'createdAt', 'updatedAt']

    constructor() { }

    /**
     * Register/Create a new Utilisateur
     */
    static async registerUtilisateur(req: Request, res: Response): Promise<any> {
        try {
            const { nom, prenoms, email, identifiant, motDePasse, contact, profilId, centreConservationFonciereId } = req.body;

            // Validate required fields
            if (!nom || !prenoms || !email || !identifiant || !motDePasse || !profilId) {
                return res.status(400).json({
                    success: false,
                    message: "Champs obligatoires manquants: nom, prenoms, email, identifiant, motDePasse, profilId"
                });
            }

            // Check if email already exists
            const existingEmail = await Utilisateur.findOne({ where: { email } });
            if (existingEmail) {
                return res.status(400).json({
                    success: false,
                    alreadyExists: true,
                    message: "Email déjà utilisé"
                });
            }

            // Check if identifiant already exists
            const existingIdentifiant = await Utilisateur.findOne({ where: { identifiant } });
            if (existingIdentifiant) {
                return res.status(400).json({
                    success: false,
                    alreadyExists: true,
                    message: "Identifiant déjà utilisé"
                });
            }

            // Check if profil exists
            const profil = await Profil.findOne({ where: { id: profilId } });
            if (!profil) {
                return res.status(404).json({
                    success: false,
                    message: "Profil non trouvé"
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(motDePasse, 10);

            // Create new utilisateur
            const nouvelUtilisateur = await Utilisateur.create({
                nom,
                prenoms,
                email,
                identifiant,
                motDePasse: hashedPassword,
                contact,
                profilId,
                centreConservationFonciereId,
                actif: true
            });

            return res.status(201).json({
                success: true,
                data: nouvelUtilisateur
            });
        } catch (error) {
            console.error("Error registering utilisateur:", error);
            return res.status(500).json({
                success: false,
                message: "Erreur lors de la création de l'utilisateur",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    /**
     * Get all utilisateurs with pagination
     */
    static async getAllUtilisateurs(req: Request, res: Response): Promise<any> {
        try {
            // Initialize where options
            let utilisateurWhereOptions: WhereOptions<InferAttributes<Utilisateur>> = {};

            // Apply search filter if provided
            if (req.query.search) {
                utilisateurWhereOptions[Op.or] = [
                    { nom: { [Op.like]: `%${req.query.search}%` } },
                    { prenoms: { [Op.like]: `%${req.query.search}%` } },
                    { email: { [Op.like]: `%${req.query.search}%` } },
                    { identifiant: { [Op.like]: `%${req.query.search}%` } }
                ];
            }

            let options: FindOptions<InferAttributes<Utilisateur>> = {
                where: utilisateurWhereOptions,
                include: [
                    {
                        model: Profil,
                        attributes: ['id', 'libelle', 'description']
                    }
                ],
                order: [['createdAt', 'DESC']]
            };

            let countOptions: CountOptions<InferAttributes<Utilisateur>> = {
                where: utilisateurWhereOptions
            };

            // Handle pagination
            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page);
                const size = Number(req.query.size);
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size);

                options.limit = limit;
                options.offset = offset;

                const utilisateurCount: number = await Utilisateur.count(countOptions);
                const utilisateurs: Utilisateur[] = await Utilisateur.findAll(options);

                return res.status(200).json(
                    DataPaginator.getInstance().getPagingData<Utilisateur>(utilisateurs, utilisateurCount, page, limit)
                );
            } else {
                const utilisateurs: Utilisateur[] = await Utilisateur.findAll(options);
                return res.status(200).json(utilisateurs);
            }
        } catch (error) {
            console.error("Error fetching utilisateurs:", error);
            return res.status(500).json({
                success: false,
                message: "Erreur lors de la récupération des utilisateurs",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    /**
     * Get count of all utilisateurs
     */
    static async getCount(req: Request, res: Response): Promise<any> {
        try {
            const count = await Utilisateur.count();
            return res.status(200).json({
                success: true,
                count: count
            });
        } catch (error) {
            console.error("Error counting utilisateurs:", error);
            return res.status(500).json({
                success: false,
                message: "Erreur lors du comptage des utilisateurs",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    /**
     * Get single utilisateur by ID
     */
    static async getUtilisateur(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;

            const utilisateur = await Utilisateur.findOne({
                where: { id },
                include: [
                    {
                        model: Profil,
                        attributes: ['id', 'libelle', 'description']
                    }
                ]
            });

            if (!utilisateur) {
                return res.status(404).json({
                    success: false,
                    message: "Utilisateur non trouvé"
                });
            }

            return res.status(200).json({
                success: true,
                data: utilisateur
            });
        } catch (error) {
            console.error("Error fetching utilisateur:", error);
            return res.status(500).json({
                success: false,
                message: "Erreur lors de la récupération de l'utilisateur",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    /**
     * Update utilisateur
     */
    static async updateUtilisateur(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const { nom, prenoms, email, contact, profilId, centreConservationFonciereId, actif } = req.body;

            const utilisateur = await Utilisateur.findByPk(id);

            if (!utilisateur) {
                return res.status(404).json({
                    success: false,
                    message: "Utilisateur non trouvé"
                });
            }

            // Check if new email is already in use by another user
            if (email && email !== utilisateur.email) {
                const existingEmail = await Utilisateur.findOne({
                    where: {
                        email: email,
                        id: { [Op.ne]: id }
                    }
                });

                if (existingEmail) {
                    return res.status(400).json({
                        success: false,
                        message: "Email déjà utilisé par un autre utilisateur"
                    });
                }
            }

            // Check if profil exists if profilId is being changed
            if (profilId && profilId !== utilisateur.profilId) {
                const profil = await Profil.findOne({ where: { id: profilId } });
                if (!profil) {
                    return res.status(404).json({
                        success: false,
                        message: "Profil non trouvé"
                    });
                }
            }

            // Update fields
            if (nom) utilisateur.nom = nom;
            if (prenoms) utilisateur.prenoms = prenoms;
            if (email) utilisateur.email = email;
            if (contact !== undefined) utilisateur.contact = contact;
            if (profilId) utilisateur.profilId = profilId;
            if (centreConservationFonciereId !== undefined) utilisateur.centreConservationFonciereId = centreConservationFonciereId;
            if (actif !== undefined) utilisateur.actif = actif;

            await utilisateur.save();

            return res.status(200).json({
                success: true,
                data: utilisateur,
                message: "Utilisateur mis à jour avec succès"
            });
        } catch (error) {
            console.error("Error updating utilisateur:", error);
            return res.status(500).json({
                success: false,
                message: "Erreur lors de la mise à jour de l'utilisateur",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    /**
     * Delete utilisateur
     */
    static async deleteUtilisateur(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;

            const utilisateur = await Utilisateur.findByPk(id);

            if (!utilisateur) {
                return res.status(404).json({
                    success: false,
                    message: "Utilisateur non trouvé"
                });
            }

            await utilisateur.destroy();

            return res.status(200).json({
                success: true,
                message: "Utilisateur supprimé avec succès"
            });
        } catch (error) {
            console.error("Error deleting utilisateur:", error);
            return res.status(500).json({
                success: false,
                message: "Erreur lors de la suppression de l'utilisateur",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
}

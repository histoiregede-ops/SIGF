import { Request, Response } from "express";
import type { Model, ModelStatic } from "sequelize";
import { TitreFoncier } from "../models/TitreFoncier";
import { Augmentation } from "../models/Augmentation";
import { Diminution } from "../models/Diminution";
import { DroitReelConstitue } from "../models/DroitReelConstitue";
import { CauseIndisponibilite } from "../models/CauseIndisponibilite";
import { Mutation } from "../models/Mutation";
import { PrivilegeHypotheque } from "../models/PrivilegeHypotheque";

export default class TitreFoncierController {
    /**
     * Récupérer tous les titres fonciers
     */
    static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const data = await TitreFoncier.findAll();
            return res.status(200).send({
                success: true,
                data
            });
        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: error.message || "Erreur lors de la récupération des titres fonciers"
            });
        }
    }

    /**
     * Récupérer un titre foncier par son ID
     */
    static async getById(req: Request, res: Response): Promise<any> {
        try {
            const data = await TitreFoncier.findByPk(req.params.id, {
                include: ['donneeIndexation']
            });
            
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: "Titre foncier non trouvé"
                });
            }

            return res.status(200).send({
                success: true,
                data
            });
        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: error.message || "Erreur lors de la récupération du titre foncier"
            });
        }
    }

    /**
     * Statistiques : Compter le nombre total de titres fonciers
     */
    static async count(req: Request, res: Response): Promise<any> {
        try {
            const count = await TitreFoncier.count();
            return res.status(200).send({
                success: true,
                data: { count }
            });
        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: error.message || "Erreur lors du comptage des titres fonciers"
            });
        }
    }

    /**
     * Créer un nouveau titre foncier avec ses sections liées
     */
    static async create(req: Request, res: Response): Promise<any> {
        try {
            const data = await TitreFoncier.create(req.body, {
                include: [
                    { association: 'augmentations' },
                    { association: 'diminutions' },
                    { association: 'droitsReels' },
                    { association: 'causesIndisponibilite' },
                    { association: 'mutations' },
                    { association: 'privilegesHypotheques' }
                ]
            });
            return res.status(201).send({
                success: true,
                data,
                message: "Titre foncier et sections enregistrés avec succès"
            });
        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: error.message || "Erreur lors de la création du titre foncier"
            });
        }
    }

    /**
     * Mettre à jour un titre foncier et ses sections
     */
    static async update(req: Request, res: Response): Promise<any> {
        const transaction = await TitreFoncier.sequelize?.transaction();
        try {
            const titre = await TitreFoncier.findByPk(req.params.id);

            if (!titre) {
                return res.status(404).send({
                    success: false,
                    message: "Titre foncier non trouvé"
                });
            }

            // Update main record
            await titre.update(req.body, { transaction });

            // Update associations (Sync strategy: delete and recreate)
            // This is a simple approach for PAG sections which are usually not huge
            const associations: { model: ModelStatic<Model>; data: unknown }[] = [
                { model: Augmentation, data: req.body.augmentations },
                { model: Diminution, data: req.body.diminutions },
                { model: DroitReelConstitue, data: req.body.droitsReels },
                { model: CauseIndisponibilite, data: req.body.causesIndisponibilite },
                { model: Mutation, data: req.body.mutations },
                { model: PrivilegeHypotheque, data: req.body.privilegesHypotheques },
            ];

            for (const assoc of associations) {
                if (Array.isArray(assoc.data)) {
                    await assoc.model.destroy({ where: { titreFoncierId: titre.id }, transaction });
                    await assoc.model.bulkCreate(
                        assoc.data.map((item: Record<string, unknown>) => ({ ...item, titreFoncierId: titre.id })),
                        { transaction }
                    );
                }
            }

            await transaction?.commit();

            return res.status(200).send({
                success: true,
                data: titre,
                message: "Titre foncier et sections mis à jour avec succès"
            });
        } catch (error: any) {
            await transaction?.rollback();
            return res.status(500).send({
                success: false,
                message: error.message || "Erreur lors de la mise à jour du titre foncier"
            });
        }
    }

    /**
     * Supprimer un titre foncier
     */
    static async delete(req: Request, res: Response): Promise<any> {
        try {
            const titre = await TitreFoncier.findByPk(req.params.id);

            if (!titre) {
                return res.status(404).send({
                    success: false,
                    message: "Titre foncier non trouvé"
                });
            }

            // Supprime l'enregistrement (ou fait un soft delete si paranoid: true est activé dans le modèle)
            await titre.destroy();

            return res.status(200).send({
                success: true,
                message: "Titre foncier supprimé avec succès"
            });
        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: error.message || "Erreur lors de la suppression du titre foncier"
            });
        }
    }

    /**
     * Rechercher un titre foncier par son numéro
     */
    static async getByNumero(req: Request, res: Response): Promise<any> {
        try {
            const { numero } = req.params;
            const data = await TitreFoncier.findOne({ 
                where: { numero },
                include: ['donneeIndexation']
            });
            
            if (!data) {
                return res.status(404).send({
                    success: false,
                    message: `Titre foncier avec le numéro "${numero}" non trouvé`
                });
            }

            return res.status(200).send({
                success: true,
                data
            });
        } catch (error: any) {
            return res.status(500).send({
                success: false,
                message: error.message || "Erreur lors de la recherche du titre foncier"
            });
        }
    }
}
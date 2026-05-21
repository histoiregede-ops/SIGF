import { Request, Response, NextFunction } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes } from "sequelize";
import { ProgressionTacheIndexation } from "../models/ProgressionTacheIndexation";
import { DonneeIndexation } from "../models/DonneeIndexation";
import { PartiePrenante } from "../../gestion-dossiers-legacy/models/PartiePrenante";
import { Depot } from "../../gestion-dossiers-legacy/models/Depot";
import { Opposition } from "../../gestion-dossiers-legacy/models/Opposition";
import { EtatsProgressionIndexation } from "../../../core/enums/EtatsProgressionIndexation";
import { TacheIndexation } from "../models/TacheIndexation";
import { TypesRegistre } from "../../../core/enums/TypesRegistre";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { getFormalitePrealableGetIncludes, getFormalitePrealableIncludes } from "../../gestion-dossiers-legacy/includes/formalitePrealableIncludes";
import { getDepotGetIncludes, getDepotIncludes } from "../../gestion-dossiers-legacy/includes/depotIncludes";
import { getOppositionGetIncludes, getOppositionIncludes } from "../../gestion-dossiers-legacy/includes/oppositionIncludes";

export default class ProgressionTacheIndexationController {

    constructor() { }

    static getCreationIncludes(): Includeable[] {
        return [
            {
                association: ProgressionTacheIndexation.associations.donneeIndexation,
                include: [
                    { association: DonneeIndexation.associations.formalitePrealable, include: getFormalitePrealableIncludes() },
                    { association: DonneeIndexation.associations.opposition, include: getOppositionIncludes() },
                    { association: DonneeIndexation.associations.depot, include: getDepotIncludes() },
                    { association: DonneeIndexation.associations.acteRegistre },
                ]
            }
        ]
    }

    static async getAllProgresssionsTachesIndexation(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const typeRegistre = req.query.typeRegistre as string | undefined
            const tacheIndexationId = req.query.tacheIndexationId as string | undefined

            if (!typeRegistre || !tacheIndexationId) {
                return res.status(400).json({
                    success: false,
                    message: 'Les paramètres query typeRegistre et tacheIndexationId sont requis.'
                })
            }

            const includeOptions: Includeable[] = []

            switch (typeRegistre as TypesRegistre) {
                case TypesRegistre.FORMALITES_PREALABLES:
                    // Avoid alias mismatch causing: "Association with alias \"depot\" does not exist on gpsFormalitePrealable"
                    includeOptions.push({
                        association: DonneeIndexation.associations.formalitePrealable,
                        include: getFormalitePrealableGetIncludes().filter((include: any) => include?.association?.as !== 'depot')
                    })
                    break;

                case TypesRegistre.OPPOSITIONS:
                    includeOptions.push({ association: DonneeIndexation.associations.opposition, include: getOppositionGetIncludes() })
                    break;

                case TypesRegistre.DEPOTS:
                    includeOptions.push({ association: DonneeIndexation.associations.depot, include: getDepotGetIncludes() })
                    break;

                case TypesRegistre.TITRES_FONCIERS:
                    break;

                default:
                    return res.status(400).json({
                        success: false,
                        message: `typeRegistre inconnu: ${typeRegistre}`
                    })
            }

            const options: FindOptions<InferAttributes<ProgressionTacheIndexation>> = {
                where: { tacheIndexationId },
                order: [['page', 'ASC']],
                include: [{
                    association: ProgressionTacheIndexation.associations.donneeIndexation,
                    include: includeOptions
                }]
            }

            const progressionsTachesIndexation = await ProgressionTacheIndexation.findAll(options)
            return res.status(200).json(progressionsTachesIndexation)
        } catch (error: any) {
            console.error('Erreur getAllProgresssionsTachesIndexation:', error)
            return res.status(500).json({
                success: false,
                message: error?.message ?? 'Erreur lors de la récupération des progressions',
            })
        }
    }

    static async getProgressionTacheIndexation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<ProgressionTacheIndexation>> = {}
        options = {
            where: { id: req.params.id }, include: [
                ProgressionTacheIndexation.associations.tacheIndexation,
            ]
        }

        try {
            const progressionTacheIndexation: ProgressionTacheIndexation | null = await ProgressionTacheIndexation.findOne(options);

            if (progressionTacheIndexation == null)
                return res.status(404).json({ success: false, message: "ProgressionTacheIndexation non trouvée" });

            return res.status(200).send(progressionTacheIndexation);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createProgressionTacheIndexation(req: Request, res: Response): Promise<any> {
        if (req.body?.page == undefined || req.body?.tacheIndexationId == undefined) {
            return res.status(400).json({ success: false, message: "page et tacheIndexationId sont requis" });
        }

        let progressionTacheIndexation: ProgressionTacheIndexation | null = await ProgressionTacheIndexation.findOne({
            where: { page: req.body.page, tacheIndexationId: req.body.tacheIndexationId },
            include: [ProgressionTacheIndexation.associations.tacheIndexation]
        });

        if (progressionTacheIndexation != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            const transaction = await DatabaseConnection.getInstance().sequelize.transaction();
            
            try {
                let tacheIndexation: TacheIndexation = await TacheIndexation.findOne({ where: { id: req.body.tacheIndexationId } })

                if (tacheIndexation != null) {

                    let newProgressionTacheIndexation: ProgressionTacheIndexation = req.body
                    if (tacheIndexation.indexeurUtilisateurId == (req as any).utilisateurId) {
                        newProgressionTacheIndexation.indexeurUtilisateurId = tacheIndexation.indexeurUtilisateurId
                    }
                    else if (tacheIndexation.controleurUtilisateurId == (req as any).utilisateurId) {
                        newProgressionTacheIndexation.controleurUtilisateurId = tacheIndexation.controleurUtilisateurId
                    }

                    await ProgressionTacheIndexation.create(newProgressionTacheIndexation, {
                        transaction: transaction,
                        include: ProgressionTacheIndexationController.getCreationIncludes()
                    })
                        .then(async (progressionTacheIndexation) => {
                            await transaction.commit()
                            return res.status(201).send(progressionTacheIndexation);
                        })
                        .catch(async (error) => {
                            console.error('Erreur creation progression:', error)
                            await transaction.rollback()
                            return res.status(400).json({ success: false, message: error?.message ?? 'Erreur lors de la création de la progression' });
                        });
                }
                else {
                    await transaction.rollback()
                    return res.status(400).json({ success: false });
                }
            }
            catch(error) {
                await transaction.rollback()
                return res.status(500).json({ success: false, message: error?.message ?? 'Erreur serveur lors de la création de la progression' });
            }
        }

        return null
    }

    static async updateProgressionTacheIndexation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<ProgressionTacheIndexation>> = { where: { id: req.params.id } }

        let progressionTacheIndexation: ProgressionTacheIndexation | null = await ProgressionTacheIndexation.findOne(options);
        if (progressionTacheIndexation != null) {

            await progressionTacheIndexation.update({
                etat: req.body.etat,
                commentaire: req.body.commentaire,
                qualiteDocumentId: req.body.qualiteDocumentId,
                dateSaisie: req.body.dateSaisie,
                dateControle: req.body.dateControle,
            })
                .then(async (progressionTacheIndexation) => {
                    return res.status(200).send(progressionTacheIndexation);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "ProgressionTacheIndexation non trouvée" });
        }

        return null
    }

    static async deleteProgressionTacheIndexation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<ProgressionTacheIndexation>> = { where: { id: req.params.id } }

        let progressionTacheIndexation: ProgressionTacheIndexation | null = await ProgressionTacheIndexation.findOne(options);
        if (progressionTacheIndexation) {
            await progressionTacheIndexation.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "ProgressionTacheIndexation supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "ProgressionTacheIndexation non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<ProgressionTacheIndexation>> = {}

        await ProgressionTacheIndexation.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}

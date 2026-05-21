import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { TacheIndexation } from "../models/TacheIndexation";
import { Fichier } from "../models/Fichier";
import UtilisateurController from "../../auth/controllers/UtilisateurController";
import { TypesTacheIndexation } from "../../../core/enums/TypesTacheIndexation";
import { EtatsControleIndexation, EtatsSaisieIndexation } from "../../../core/enums/EtatsIndexation";
import ProgressionTacheIndexationController from "./ProgressionTacheIndexationController";
import { ProgressionTacheIndexation } from "../models/ProgressionTacheIndexation";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { Region } from "../../commun/models/Region";
import { TypesRegistre } from "../../../core/enums/TypesRegistre";
import { EtatsProgressionIndexation } from "../../../core/enums/EtatsProgressionIndexation";

export default class TacheIndexationController {

    constructor() { }

    static async getAllTachesIndexation(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {

            // Filtres de l'utilisateur
            let tacheIndexationWhereOptions: WhereOptions<InferAttributes<TacheIndexation>> = {}
            let progressionsTacheIndexationWhereOptions: WhereOptions<InferAttributes<ProgressionTacheIndexation>> = {}
            let fichierWhereOptions: WhereOptions<InferAttributes<Fichier>> = {}

            if (req.query.typeRegistre) {
                fichierWhereOptions.typeRegistreId = req.query.typeRegistre as TypesRegistre
            }

            // Filtres sur le type de tache d'indexation
            if (req.query.typeTacheIndexation) {
                switch (req.query.typeTacheIndexation) {
                    case TypesTacheIndexation.SAISIE:
                        tacheIndexationWhereOptions.indexeurUtilisateurId = (req as any).utilisateurId
                        if (!req.query.etatSaisie && !req.query.excludeEtatSaisie) {
                            tacheIndexationWhereOptions.etatSaisie = { [Op.ne]: EtatsSaisieIndexation.INDEXE } as any
                        }
                        break;

                    case TypesTacheIndexation.CONTROLE:
                        tacheIndexationWhereOptions.controleurUtilisateurId = (req as any).utilisateurId
                        break;

                    case TypesTacheIndexation.ADMIN:
                        break;

                    default:
                        break;
                }
            }

            // Filtres sur l'état de saisie ou contrôle
            if (req.query.etatSaisie) tacheIndexationWhereOptions.etatSaisie = req.query.etatSaisie as EtatsSaisieIndexation;
            else if (req.query.excludeEtatSaisie) tacheIndexationWhereOptions.etatSaisie = { [Op.ne]: req.query.excludeEtatSaisie as EtatsSaisieIndexation } as any;
            if (req.query.etatControle) tacheIndexationWhereOptions.etatControle = req.query.etatControle as EtatsControleIndexation;
            else if (req.query.excludeEtatControle) tacheIndexationWhereOptions.etatControle = { [Op.ne]: req.query.excludeEtatControle as EtatsControleIndexation } as any;
            if (req.query.etat) progressionsTacheIndexationWhereOptions.etat = req.query.etat as EtatsProgressionIndexation;

            // Filtres sur le nom de fichier
            if (req.query.search) {
                fichierWhereOptions[Op.or] = [
                    { nom: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<TacheIndexation>> = {
                where: tacheIndexationWhereOptions,
                order: [['dateAttributionSaisie', 'ASC'], ['id', 'ASC']],
                include: [
                    {
                        association: TacheIndexation.associations.fichier,
                        include: [
                            Fichier.associations.typeRegistre,
                            // { association: Fichier.associations.region, include: [Region.associations.periode] }
                        ],
                        where: fichierWhereOptions,
                        order: [['nom', 'ASC']],
                        required: true
                    },
                    { association: TacheIndexation.associations.progressionsTacheIndexation, include: [ProgressionTacheIndexation.associations.qualiteDocument] },
                    { association: TacheIndexation.associations.indexeurUtilisateur, attributes: UtilisateurController.ATTRIBUTES },
                    { association: TacheIndexation.associations.controleurUtilisateur, attributes: UtilisateurController.ATTRIBUTES },
                ]
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                let tachesIndexation: TacheIndexation[];
                tachesIndexation = await TacheIndexation.findAll(options);
                // const { rows, count } = await TacheIndexation.findAndCountAll(options);

                // console.log(req.query, rows, count);
                // console.log(DataPaginator.getInstance().getPagingData<TacheIndexation>(rows, count, page, limit))

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<TacheIndexation>(tachesIndexation, tachesIndexation.length, page, limit)
                );
            }
            else {
                let tachesIndexation: TacheIndexation[];
                tachesIndexation = await TacheIndexation.findAll(options);

                return res.status(200).send(tachesIndexation);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getTacheIndexation(req: Request, res: Response): Promise<any> {
        const fichierInclude: any = {
            association: TacheIndexation.associations.fichier,
            include: [
                Fichier.associations.typeRegistre,
                { association: Fichier.associations.region, include: [Region.associations.periode] }
            ],
        }
        if (req.query.typeRegistre) {
            fichierInclude.where = { typeRegistreId: req.query.typeRegistre }
        }

        let options: FindOptions<InferAttributes<TacheIndexation>> = {}
        options = {
            include: [
                fichierInclude,
                { association: TacheIndexation.associations.indexeurUtilisateur, attributes: UtilisateurController.ATTRIBUTES },
                { association: TacheIndexation.associations.controleurUtilisateur, attributes: UtilisateurController.ATTRIBUTES },
                // { association: TacheIndexation.associations.progressionsTacheIndexation, include: ProgressionTacheIndexationController.CREATION_INCLUDES }
            ],
            // raw: true,
            // nest: true
        }

        if (req.query.typeTacheIndexation) {
            switch (req.query.typeTacheIndexation) {
                case TypesTacheIndexation.SAISIE:
                    options.where = { id: req.params.id, indexeurUtilisateurId: (req as any).utilisateurId }
                    break;

                case TypesTacheIndexation.CONTROLE:
                    options.where = { id: req.params.id, controleurUtilisateurId: (req as any).utilisateurId }
                    break;

                case TypesTacheIndexation.ADMIN:
                    options.where = { id: req.params.id }
                    break;

                default:
                    options.where = { id: req.params.id }
                    break;
            }
        }

        try {
            const tacheindexation: TacheIndexation | null = await TacheIndexation.findOne(options);

            if (tacheindexation == null)
                return res.status(404).json({ success: false, message: "TacheIndexation non trouvée" });

            return res.status(200).send(tacheindexation);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createTacheIndexation(req: Request, res: Response): Promise<any> {
        if (req.body?.fichierId == undefined) {
            return res.status(400).json({ success: false, message: "fichierId est requis" });
        }

        let tacheindexation: TacheIndexation | null = await TacheIndexation.findOne({ where: { fichierId: req.body.fichierId } });

        if (tacheindexation != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let tacheindexation: TacheIndexation = new TacheIndexation();
            tacheindexation.etatSaisie = EtatsSaisieIndexation.A_INDEXER
            tacheindexation.etatControle = EtatsControleIndexation.EN_ATTENTE
            tacheindexation.fichierId = req.body.fichierId
            tacheindexation.indexeurUtilisateurId = req.body.indexeurUtilisateurId
            if (req.body.indexeurUtilisateurId != null) {
                tacheindexation.dateAttributionSaisie = new Date()
            }
            tacheindexation.controleurUtilisateurId = req.body.controleurUtilisateurId
            if (req.body.controleurUtilisateurId != null) {
                tacheindexation.dateAttributionControle = new Date()
            }

            await tacheindexation.save()
                .then((tacheindexation) => {
                    return res.status(201).send(tacheindexation);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateTacheIndexation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TacheIndexation>> = { where: { id: req.params.id } }

        let tacheindexation: TacheIndexation | null = await TacheIndexation.findOne(options);
        if (tacheindexation != null) {

            if (req.body.indexeurUtilisateurId != null && req.body.indexeurUtilisateurId != tacheindexation.indexeurUtilisateurId) {
                req.body.dateAttributionSaisie = new Date()
            }
            if (req.body.controleurUtilisateurId != null && req.body.controleurUtilisateurId != tacheindexation.controleurUtilisateurId) {
                req.body.dateAttributionControle = new Date()
            }

            await tacheindexation.update({
                etatSaisie: req.body.etatSaisie,
                etatControle: req.body.etatControle,
                dateAttributionSaisie: req.body.dateAttributionSaisie,
                dateAttributionControle: req.body.dateAttributionControle,
                indexeurUtilisateurId: req.body.indexeurUtilisateurId,
                controleurUtilisateurId: req.body.controleurUtilisateurId,
            })
                .then(async (tacheindexation) => {
                    return res.status(200).send(tacheindexation);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "TacheIndexation non trouvée" });
        }

        return null
    }

    static async deleteTacheIndexation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TacheIndexation>> = { where: { id: req.params.id } }

        let tacheindexation: TacheIndexation | null = await TacheIndexation.findOne(options);
        if (tacheindexation) {
            await tacheindexation.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "TacheIndexation supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "TacheIndexation non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<TacheIndexation>> = {}

        await TacheIndexation.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}

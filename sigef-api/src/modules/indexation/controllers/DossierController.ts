import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op } from "sequelize";
import { Dossier } from "../models/Dossier";
import { Fichier } from "../models/Fichier";
import { Region } from "../../commun/models/Region";
import { TacheIndexation } from "../models/TacheIndexation";
import UtilisateurController from "../../auth/controllers/UtilisateurController";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { TypesRegistre } from "../../../core/enums/TypesRegistre";

export default class DossierController {

    constructor() { }

    static async getAllDossiers(req: Request, res: Response): Promise<any> {

        const typeRegistreId = req.query.typeRegistreId as string | undefined;
        console.log(`[DossierController] Querying dossiers with typeRegistreId: ${typeRegistreId}, other filters:`, req.query);

        try {
            if (typeRegistreId) {
                const { TypeRegistre } = require('../../commun/models/TypeRegistre');
                const typeRegistre = await TypeRegistre.findByPk(typeRegistreId);
                if (!typeRegistre) {
                    return res.status(404).json({ success: false, message: `Type registre '${typeRegistreId}' inconnu` });
                }
            }

            // Filtres de l'utilisateur
            let dossierWhereOptions: { [key: string]: any } = {}

            // Filtres sur le type de registre
            if (typeRegistreId) {
                dossierWhereOptions.typeRegistreId = typeRegistreId;
            }

            // Application des filtres
            if (req.query.nom) dossierWhereOptions.nom = { [Op.like]: `%${req.query.nom}%` }
            if (req.query.dossier && req.query.dossier != 'undefined') dossierWhereOptions.dossierParentId = req.query.dossier

            let options: FindOptions<InferAttributes<Dossier>> = {
                where: dossierWhereOptions,
                include: [
                    { association: Dossier.associations.sousDossiers, attributes: ['id'], required: false },
                    { association: Dossier.associations.fichiers, attributes: ['id'], required: false },
                ],
                order: [['nom', 'ASC']]
            }

            let countOptions: FindOptions<InferAttributes<Dossier>> = {
                where: dossierWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const dossiersCount: number = await Dossier.count(countOptions)
                let dossiers: Dossier[] = await Dossier.findAll(options);
                console.log(`[DossierController] Found ${dossiers.length} dossiers (total count: ${dossiersCount}) for typeRegistreId: ${typeRegistreId}`);

                // Changé: 200 [] vide au lieu 404
                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Dossier>(dossiers, dossiersCount, page, limit)
                );
            }
            else {
                let dossiers: Dossier[];
                dossiers = await Dossier.findAll(options);
                console.log(`[DossierController] Found ${dossiers.length} dossiers for typeRegistreId: ${typeRegistreId}`);

                // Changé: 200 [] vide au lieu 404
                return res.status(200).send(dossiers);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getDossier(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Dossier>> = {}
        options = {
            where: { id: req.params.id }, include: [
                {
                    association: Dossier.associations.sousDossiers,
                    include: [
                        Dossier.associations.sousDossiers,
                        {
                            association: Dossier.associations.fichiers, include: [
                                { association: Fichier.associations.region, include: [Region.associations.periode] },
                                {
                                    association: Fichier.associations.tacheIndexation, include: [
                                        TacheIndexation.associations.progressionsTacheIndexation,
                                        { association: TacheIndexation.associations.indexeurUtilisateur, attributes: UtilisateurController.ATTRIBUTES },
                                        { association: TacheIndexation.associations.controleurUtilisateur, attributes: UtilisateurController.ATTRIBUTES },
                                    ]
                                },
                                Fichier.associations.typeRegistre
                            ],
                        },
                    ],
                },
                {
                    association: Dossier.associations.fichiers, include: [
                        { association: Fichier.associations.region, include: [Region.associations.periode] },
                        {
                            association: Fichier.associations.tacheIndexation, include: [
                                TacheIndexation.associations.progressionsTacheIndexation,
                                { association: TacheIndexation.associations.indexeurUtilisateur, attributes: UtilisateurController.ATTRIBUTES },
                                { association: TacheIndexation.associations.controleurUtilisateur, attributes: UtilisateurController.ATTRIBUTES },
                            ]
                        },
                        Fichier.associations.typeRegistre
                    ],
                },
            ]
        }

        try {
            const dossier: Dossier | null = await Dossier.findOne(options);

            if (dossier == null)
                return res.status(404).json({ success: false, message: "Dossier non trouvée" });

            return res.status(200).send(dossier);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

static async createDossier(req: Request, res: Response): Promise<any> {

        console.log('[DossierController] createDossier body:', req.body);

        if (!req.body.nom || !req.body.typeRegistreId) {
            return res.status(400).json({ success: false, message: 'nom and typeRegistreId are required' });
        }

        // IMPORTANT: avoid Sequelize error "WHERE ... undefined" when dossierParentId is missing (undefined)
        const dossierParentId = req.body.dossierParentId === undefined ? null : req.body.dossierParentId;

        const existingWhere: any = { nom: req.body.nom };
        if (dossierParentId !== null) {
            existingWhere.dossierParentId = dossierParentId;
        }

        let dossier: Dossier | null = await Dossier.findOne({ where: existingWhere });

        if (dossier != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let dossier: Dossier = new Dossier();
            dossier.nom = req.body.nom
            dossier.description = req.body.description
            dossier.dossierParentId = dossierParentId
            dossier.typeRegistreId = req.body.typeRegistreId

            // Validate typeRegistreId exists
            const { TypeRegistre } = require('../../commun/models/TypeRegistre');
            const typeRegistre = await TypeRegistre.findByPk(req.body.typeRegistreId);
            if (!typeRegistre) {
                return res.status(400).json({ success: false, message: `Type registre '${req.body.typeRegistreId}' inconnu` });
            }

            await dossier.save()
                .then((dossier) => {
                    console.log('[DossierController] Dossier created:', dossier.id);
                    return res.status(201).send(dossier);
                })
                .catch((error) => {
                    console.error('[DossierController] createDossier save error:', error);
                    return res.status(400).json({ success: false, error: (error as Error).message });
                });
        }

        return null
    }

    static async updateDossier(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Dossier>> = { where: { id: req.params.id } }

        let dossier: Dossier | null = await Dossier.findOne(options);
        if (dossier != null) {

            await dossier.update({
                nom: req.body.nom,
                description: req.body.description,
                dossierParentId: req.body.dossierParentId,
                typeRegistreId: req.body.typeRegistreId,
            })
                .then(async (dossier) => {
                    return res.status(200).send(dossier);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Dossier non trouvée" });
        }

        return null
    }

    static async deleteDossier(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Dossier>> = { where: { id: req.params.id } }

        let dossier: Dossier | null = await Dossier.findOne(options);
        if (dossier) {
            await dossier.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Dossier supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Dossier non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Dossier>> = {}

        await Dossier.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
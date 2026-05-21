import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { DemandeEtatDescriptif } from "../models/DemandeEtatDescriptif";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { StatutsDemandeEtatDescriptif } from "../../../core/enums/StatutsDemandeEtatDescriptif";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { DemandeEtatDescriptifRepository } from "../repositories/DemandeEtatDescriptifRepository";

export default class DemandeEtatDescriptifController {

    constructor() { }

    static async getAllDemandesEtatsDescriptifs(req: Request, res: Response): Promise<any> {

        console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let demandeEtatDescriptifWhereOptions: WhereOptions<InferAttributes<DemandeEtatDescriptif>> = {}

            // Application des filtres
            if (req.query.creatDebut && req.query.creatFin) demandeEtatDescriptifWhereOptions.dateDemande = { [Op.between]: [req.query.creatDebut as string, req.query.creatFin as string] };
            if (req.query.statut) demandeEtatDescriptifWhereOptions.statut = req.query.statut as StatutsDemandeEtatDescriptif;
            if (req.query.dateTraitement) demandeEtatDescriptifWhereOptions.dateTraitement = { [Op.between]: [(req.query.dateTraitement as string)+'T00:00:00', (req.query.dateTraitement as string)+'T23:59:59'] };
            if (req.query.requerant) demandeEtatDescriptifWhereOptions.requerant = req.query.requerant as string;
            if (req.query.demandeur) demandeEtatDescriptifWhereOptions.utilisateurDemandeId = req.query.demandeur as string;
            if (req.query.validateur) demandeEtatDescriptifWhereOptions.utilisateurTraitementId = req.query.validateur as string;
            if (req.query.search) {
                demandeEtatDescriptifWhereOptions[Op.or] = [
                    { requerant: { [Op.like]: `%${req.query.search}%` } },
                    { reponse: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<DemandeEtatDescriptif>> = {
                where: demandeEtatDescriptifWhereOptions,
                order: [['createdAt', 'DESC']],
                include: DemandeEtatDescriptifController.GET_INCLUDES
            }

            let countOptions: CountOptions<InferAttributes<DemandeEtatDescriptif>> = {
                where: demandeEtatDescriptifWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const demandesTransfertsCount: number = await DemandeEtatDescriptif.count(countOptions)
                let demandesTransferts: DemandeEtatDescriptif[] = await DemandeEtatDescriptif.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<DemandeEtatDescriptif>(demandesTransferts, demandesTransfertsCount, page, limit)
                );
            }
            else {
                let demandesTransferts: DemandeEtatDescriptif[];
                demandesTransferts = await DemandeEtatDescriptif.findAll(options);

                return res.status(200).send(demandesTransferts);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getDemandeEtatDescriptif(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DemandeEtatDescriptif>> = {}
        options = {
            where: { id: req.params.id },
            include: DemandeEtatDescriptifController.GET_INCLUDES
        }

        try {
            const demandeEtatDescriptif: DemandeEtatDescriptif | null = await DemandeEtatDescriptif.findOne(options);

            if (demandeEtatDescriptif == null)
                return res.status(404).json({ success: false, message: "DemandeEtatDescriptif non trouvée" });

            return res.status(200).send(demandeEtatDescriptif);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createDemandeEtatDescriptif(req: Request, res: Response): Promise<any> {

        // let demandeEtatDescriptif: DemandeEtatDescriptif | null = await DemandeEtatDescriptif.findOne({ where: { libelle: req.body.libelle } });

        // if (demandeEtatDescriptif != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let demandeEtatDescriptif: DemandeEtatDescriptif = req.body
        demandeEtatDescriptif.utilisateurDemandeId = (req as any).utilisateurId

        await DemandeEtatDescriptif.create(demandeEtatDescriptif, {
            include: DemandeEtatDescriptifController.INCLUDES
        })
            .then((demandeEtatDescriptif) => {
                return res.status(201).send(demandeEtatDescriptif);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async traiterDemandeEtatDescriptif(req: Request, res: Response): Promise<any> {
        const transaction = await DatabaseConnection.getInstance().sequelize.transaction();

        console.log(req.params)
        try {
            let options: FindOptions<InferAttributes<DemandeEtatDescriptif>> = { where: { id: req.params.id } }
            let demandeEtatDescriptif: DemandeEtatDescriptif | null = await DemandeEtatDescriptif.findOne(options);

            if (demandeEtatDescriptif != null) {
                if (demandeEtatDescriptif.statut != StatutsDemandeEtatDescriptif.A_TRAITER && demandeEtatDescriptif.statut != StatutsDemandeEtatDescriptif.EN_COURS) {
                    return res.status(400).json({ success: false, alreadyValidated: true, statut: demandeEtatDescriptif.statut });
                }
                else {
                    let demandeEtatDescriptif: DemandeEtatDescriptif = req.body
                    demandeEtatDescriptif.statut = StatutsDemandeEtatDescriptif.TRAITEE
                    demandeEtatDescriptif.utilisateurDemandeId = (req as any).utilisateurId

                    await DemandeEtatDescriptifRepository.update(demandeEtatDescriptif, transaction)
                    await transaction.commit()
                    return res.status(200).send(demandeEtatDescriptif);
                }
            }
            else {
                return res.status(404).json({ success: false, message: "DemandeEtatDescriptif non trouvée" });
            }
        }
        catch (error) {
            // Rollback
            await transaction.rollback()
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async updateDemandeEtatDescriptif(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DemandeEtatDescriptif>> = { where: { id: req.params.id } }

        let demandeEtatDescriptif: DemandeEtatDescriptif | null = await DemandeEtatDescriptif.findOne(options);
        if (demandeEtatDescriptif != null) {
            console.log(demandeEtatDescriptif.statut, req.body.statut)
            if (demandeEtatDescriptif.statut != StatutsDemandeEtatDescriptif.A_TRAITER) {
                if (demandeEtatDescriptif.statut == StatutsDemandeEtatDescriptif.EN_COURS) {
                    return res.status(400).json({ success: false, alreadyInProgress: true, statut: demandeEtatDescriptif.statut });
                }
                else {
                    return res.status(400).json({ success: false, alreadyValidated: true, statut: demandeEtatDescriptif.statut });
                }
            }
            else {
                switch (req.body.statut) {
                    case StatutsDemandeEtatDescriptif.EN_COURS:
                        req.body.statut = StatutsDemandeEtatDescriptif.EN_COURS
                        break;
                    case StatutsDemandeEtatDescriptif.ANNULEE:
                        req.body.statut = StatutsDemandeEtatDescriptif.ANNULEE
                        break;
                    case StatutsDemandeEtatDescriptif.REJETEE:
                        req.body.statut = StatutsDemandeEtatDescriptif.REJETEE
                        req.body.dateTraitement = new Date()
                        req.body.utilisateurTraitementId = (req as any).utilisateurId
                        break;

                    default:
                        return res.status(400).json({ success: false, alreadyInProgress: true, statut: demandeEtatDescriptif.statut });
                        break;
                }


                await demandeEtatDescriptif.update({
                    statut: req.body.statut,
                    dateTraitement: req.body.dateTraitement,
                    utilisateurTraitementId: req.body.utilisateurTraitementId,
                })
                    .then(async (demandeEtatDescriptif) => {
                        return res.status(200).send(demandeEtatDescriptif);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "DemandeEtatDescriptif non trouvée" });
        }

        return null
    }

    static async deleteDemandeEtatDescriptif(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DemandeEtatDescriptif>> = { where: { id: req.params.id } }

        let demandeEtatDescriptif: DemandeEtatDescriptif | null = await DemandeEtatDescriptif.findOne(options);
        if (demandeEtatDescriptif) {
            await demandeEtatDescriptif.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "DemandeEtatDescriptif supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "DemandeEtatDescriptif non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<DemandeEtatDescriptif>> = {}

        await DemandeEtatDescriptif.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES = [
        // DemandeEtatDescriptif.associations.demandeEtatDescriptifActesRegistres,
    ]

    static GET_INCLUDES = [
        DemandeEtatDescriptif.associations.titreFoncier,
        DemandeEtatDescriptif.associations.utilisateurDemande,
        DemandeEtatDescriptif.associations.utilisateurTraitement,
    ]
}
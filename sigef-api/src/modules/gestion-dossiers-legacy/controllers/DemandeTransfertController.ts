import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { DemandeTransfert } from "../models/DemandeTransfert";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { StatutsDemandeTransfert } from "../../../core/enums/StatutsDemandeTransfert";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import { DemandeTransfertRepository } from "../repositories/DemandeTransfertRepository";
import { DemandeTransfertActeRegistre } from "../models/DemandeTransfertActeRegistre";
import { ActeRegistre } from "../models/ActeRegistre";
import { TypesRegistre } from "../../../core/enums/TypesRegistre";

export default class DemandeTransfertController {

    constructor() { }

    static async getAllDemandesTransferts(req: Request, res: Response): Promise<any> {

        console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let demandeTransfertWhereOptions: WhereOptions<InferAttributes<DemandeTransfert>> = {}

            // Filtres sur le type de registre
            if (req.query.typeRegistreId) {
                demandeTransfertWhereOptions.typeRegistreId = req.query.typeRegistreId as TypesRegistre
            }

            // Application des filtres
            if (req.query.creatDebut && req.query.creatFin) demandeTransfertWhereOptions.dateDemande = { [Op.between]: [req.query.creatDebut as string, req.query.creatFin as string] };
            if (req.query.statut) demandeTransfertWhereOptions.statut = req.query.statut as StatutsDemandeTransfert;
            if (req.query.dateTraitement) demandeTransfertWhereOptions.dateTraitement = { [Op.between]: [(req.query.dateTraitement as string)+'T00:00:00', (req.query.dateTraitement as string)+'T23:59:59'] };
            if (req.query.demandeur) demandeTransfertWhereOptions.utilisateurDemandeId = req.query.demandeur as string;
            if (req.query.validateur) demandeTransfertWhereOptions.utilisateurTraitementId = req.query.validateur as string;
            if (req.query.centre) demandeTransfertWhereOptions.centreConservationFonciereId = req.query.centre as string;
            if (req.query.search) {
                demandeTransfertWhereOptions[Op.or] = [
                    { objet: { [Op.like]: `%${req.query.search}%` } },
                    { message: { [Op.like]: `%${req.query.search}%` } },
                    { reponse: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<DemandeTransfert>> = {
                where: demandeTransfertWhereOptions,
                order: [['createdAt', 'DESC']],
                include: DemandeTransfertController.GET_INCLUDES
            }

            let countOptions: CountOptions<InferAttributes<DemandeTransfert>> = {
                where: demandeTransfertWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const demandesTransfertsCount: number = await DemandeTransfert.count(countOptions)
                let demandesTransferts: DemandeTransfert[] = await DemandeTransfert.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<DemandeTransfert>(demandesTransferts, demandesTransfertsCount, page, limit)
                );
            }
            else {
                let demandesTransferts: DemandeTransfert[];
                demandesTransferts = await DemandeTransfert.findAll(options);

                return res.status(200).send(demandesTransferts);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getDemandeTransfert(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DemandeTransfert>> = {}
        options = {
            where: { id: req.params.id },
            include: DemandeTransfertController.GET_INCLUDES
        }

        try {
            const demandeTransfert: DemandeTransfert | null = await DemandeTransfert.findOne(options);

            if (demandeTransfert == null)
                return res.status(404).json({ success: false, message: "DemandeTransfert non trouvée" });

            return res.status(200).send(demandeTransfert);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createDemandeTransfert(req: Request, res: Response): Promise<any> {

        // let demandeTransfert: DemandeTransfert | null = await DemandeTransfert.findOne({ where: { libelle: req.body.libelle } });

        // if (demandeTransfert != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let demandeTransfert: DemandeTransfert = req.body
        demandeTransfert.utilisateurDemandeId = (req as any).utilisateurId

        await DemandeTransfert.create(demandeTransfert, {
            include: DemandeTransfertController.INCLUDES
        })
            .then((demandeTransfert) => {
                return res.status(201).send(demandeTransfert);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async traiterDemandeTransfert(req: Request, res: Response): Promise<any> {
        const transaction = await DatabaseConnection.getInstance().sequelize.transaction();

        console.log(req.params)
        try {
            let options: FindOptions<InferAttributes<DemandeTransfert>> = { where: { id: req.params.id } }
            let demandeTransfert: DemandeTransfert | null = await DemandeTransfert.findOne(options);

            if (demandeTransfert != null) {
                if (demandeTransfert.statut != StatutsDemandeTransfert.A_TRAITER && demandeTransfert.statut != StatutsDemandeTransfert.EN_COURS) {
                    return res.status(400).json({ success: false, alreadyValidated: true, statut: demandeTransfert.statut });
                }
                else {
                    let demandeTransfert: DemandeTransfert = req.body
                    demandeTransfert.statut = StatutsDemandeTransfert.TRAITEE
                    demandeTransfert.utilisateurDemandeId = (req as any).utilisateurId

                    await DemandeTransfertRepository.update(demandeTransfert, transaction)
                    await transaction.commit()
                    return res.status(200).send(demandeTransfert);
                }
            }
            else {
                return res.status(404).json({ success: false, message: "DemandeTransfert non trouvée" });
            }
        }
        catch (error) {
            // Rollback
            await transaction.rollback()
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async updateDemandeTransfert(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DemandeTransfert>> = { where: { id: req.params.id } }

        let demandeTransfert: DemandeTransfert | null = await DemandeTransfert.findOne(options);
        if (demandeTransfert != null) {
            console.log(demandeTransfert.statut, req.body.statut)
            if (demandeTransfert.statut != StatutsDemandeTransfert.A_TRAITER) {
                if (demandeTransfert.statut == StatutsDemandeTransfert.EN_COURS) {
                    return res.status(400).json({ success: false, alreadyInProgress: true, statut: demandeTransfert.statut });
                }
                else {
                    return res.status(400).json({ success: false, alreadyValidated: true, statut: demandeTransfert.statut });
                }
            }
            else {
                switch (req.body.statut) {
                    case StatutsDemandeTransfert.EN_COURS:
                        req.body.statut = StatutsDemandeTransfert.EN_COURS
                        break;
                    case StatutsDemandeTransfert.ANNULEE:
                        req.body.statut = StatutsDemandeTransfert.ANNULEE
                        break;
                    case StatutsDemandeTransfert.REJETEE:
                        req.body.statut = StatutsDemandeTransfert.REJETEE
                        req.body.dateTraitement = new Date()
                        req.body.utilisateurTraitementId = (req as any).utilisateurId
                        break;

                    default:
                        return res.status(400).json({ success: false, alreadyInProgress: true, statut: demandeTransfert.statut });
                        break;
                }


                await demandeTransfert.update({
                    statut: req.body.statut,
                    dateTraitement: req.body.dateTraitement,
                    utilisateurTraitementId: req.body.utilisateurTraitementId,
                })
                    .then(async (demandeTransfert) => {
                        return res.status(200).send(demandeTransfert);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "DemandeTransfert non trouvée" });
        }

        return null
    }

    static async deleteDemandeTransfert(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DemandeTransfert>> = { where: { id: req.params.id } }

        let demandeTransfert: DemandeTransfert | null = await DemandeTransfert.findOne(options);
        if (demandeTransfert) {
            await demandeTransfert.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "DemandeTransfert supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "DemandeTransfert non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<DemandeTransfert>> = {}

        await DemandeTransfert.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES = [
        DemandeTransfert.associations.demandeTransfertActesRegistres,
    ]

    static GET_INCLUDES = [
        DemandeTransfert.associations.centreConservationFonciere,
        DemandeTransfert.associations.utilisateurDemande,
        DemandeTransfert.associations.utilisateurTraitement,
        { association: DemandeTransfert.associations.demandeTransfertActesRegistres, separate: true, include: [
            DemandeTransfertActeRegistre.associations.centreSource,
            { association: DemandeTransfertActeRegistre.associations.acteRegistre, include: [
                ActeRegistre.associations.dossierRegistre,
                // ActeRegistre.associations.centreConservationFonciere,
                ActeRegistre.associations.formalitePrealable,
                ActeRegistre.associations.opposition,
                ActeRegistre.associations.depot,
                ActeRegistre.associations.titreFoncier,
            ] }
        ]},
    ]
}
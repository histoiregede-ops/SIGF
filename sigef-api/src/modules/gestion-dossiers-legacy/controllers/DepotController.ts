import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes, Op, WhereOptions } from "sequelize";
import { Depot } from "../models/Depot";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { PartiePrenante } from "../models/PartiePrenante";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import PartiePrenanteController from "./PartiePrenanteController";
import { DepotTitreFoncier } from "../models/DepotTitreFoncier";
import { ActeRegistre } from "../models/ActeRegistre";
import { DepotRepository } from "../repositories/DepotRepository";
import DossierRegistreController from "./DossierRegistreController";
import { TypesRegistre } from "../../../core/enums/TypesRegistre";
import { TitreFoncier } from "../models/TitreFoncier";
import { TitreFoncierRepository } from "../repositories/TitreFoncierRepository";
import { SituationPropriete } from "../models/SituationPropriete";
import { Mutation } from "../models/Mutation";
import { TypeDepot } from "../models/TypeDepot";

export default class DepotController {

    constructor() { }

    static async getAllDepots(req: Request, res: Response): Promise<any> {

        try {
            console.log('DepotController.getAllDepots called with query:', req.query);
            
            // Filtres de l'utilisateur
            let depotWhereOptions: WhereOptions<InferAttributes<Depot>> = {}
            let depotTitreFoncierWhereOptions: WhereOptions<InferAttributes<DepotTitreFoncier>> = {}

            // Application des filtres
            if (req.query.statut) depotWhereOptions.statut = req.query.statut as string;
            if (req.query.titreFoncier) depotTitreFoncierWhereOptions.numeroTitreFoncier = req.query.titreFoncier as string;

            // Simplified initial query - no complex includes
            let options: FindOptions<InferAttributes<Depot>> = {
                where: depotWhereOptions,
                order: [['createdAt', 'DESC']]
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const depotsCount: number = await Depot.count({ where: depotWhereOptions })
                let depots: Depot[] = await Depot.findAll(options);

                console.log(`Found ${depots.length} depots, total count: ${depotsCount}`);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Depot>(depots, depotsCount, page, limit)
                );
            }
            else {
                let depots: Depot[] = await Depot.findAll(options);
                console.log(`Found ${depots.length} depots`);

                return res.status(200).send(depots);
            }
        } catch (error: any) {
            console.error('DepotController.getAllDepots ERROR:', error.message, error.stack);
            return res.status(500).json({ 
                success: false, 
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
                details: error.stack?.split('\n')[0]
            });
        }
    }

    static async getDepot(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Depot>> = {}
        options = {
            where: { id: req.params.id },
            include: DepotController.GET_INCLUDES
            // include: [
            //     { association: Depot.associations.partiesPrenantes, separate: true, include: PartiePrenanteController.GET_INCLUDES },
            //     Depot.associations.typeDepot,
            //     Depot.associations.typeOperationPostImmatriculation,
            //     Depot.associations.depotsTitresFonciers,
            //     Depot.associations.piecesDeposees,
            //     Depot.associations.donneeIndexation
            // ]
        }

        try {
            const depot: Depot | null = await Depot.findOne(options);

            if (depot == null)
                return res.status(404).json({ success: false, message: "Depot non trouvée" });

            return res.status(200).send(depot);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createDepot(req: Request, res: Response): Promise<any> {
        const transaction = await DatabaseConnection.getInstance().sequelize.transaction();

        if(req.body.acteRegistre == null)
            return res.status(400).json({ success: false });

        // let depot: Depot | null = await Depot.findOne({ where: { libelle: req.body.libelle } });

        // if (depot != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        req.body.utilisateurId = (req as any).utilisateurId

        await DepotRepository.create(req.body, transaction)
            .then(async (depot: Depot) => {
                console.log("Dépot créé avec succès:", depot.id, depot.typeDepotId)
                let typeDepot = await TypeDepot.findOne({where: {id: depot.typeDepotId}})
                // console.log(typeDepot)
                if(typeDepot) {
                    if (typeDepot.post == true) {} 
                    else {
                        console.log("Génération du titre foncier", depot.numeroRequisition)
                        // Génération du titre foncier
                        let titreFoncier: TitreFoncier = await TitreFoncierRepository.createFromDepot(depot, (req as any).utilisateurId, transaction)
                        console.log("Titre créé avec succès")

                        console.log("Mise à jour de Depot")
                        // Mise à jour de Depot
                        depot.titreFoncierId = titreFoncier.id
                        await depot.save({ transaction: transaction })
                        console.log("Dépot mis à jour avec succès")

                        console.log("Mise à jour de SituationPropriete")
                        // Mise à jour de SituationPropriete
                        let situationPropriete: SituationPropriete | null = await SituationPropriete.findOne({where: {formalitePrealableId: depot.formalitePrealableId}})
                        situationPropriete.titreFoncierId = titreFoncier.id
                        await situationPropriete.save({ transaction: transaction })
                        console.log("SituationPropriete créée avec succès")

                        console.log("Mutation")
                        // Mutation
                        let mutation: Mutation = await Mutation.create({ 
                            numeroBordereauAnalytique: '1',
                            dateInscription: new Date(),
                        }, {transaction: transaction})
                        for (let index = 0; index < depot.partiesPrenantes.length; index++) {
                            const partiePrenante: PartiePrenante = depot.partiesPrenantes[index];
                            partiePrenante.mutationId = mutation.id
                            await partiePrenante.save({ transaction: transaction })
                        }
                        console.log("Mutation créée avec succès")
                    }
                }

                await transaction.commit()
                console.log("Commit avec succès")
                return res.status(201).send(depot);
            })
            .catch(async (error) => {
                // Rollback
                await transaction.rollback()
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updateDepot(req: Request, res: Response): Promise<any> {
        const transaction = await DatabaseConnection.getInstance().sequelize.transaction();

        try {
            let options: FindOptions<InferAttributes<Depot>> = { where: { id: req.params.id } }
            let depot: Depot | null = await Depot.findOne(options);

            if (depot != null) {
                await DepotRepository.update(req.body, transaction)
                await transaction.commit()
                return res.status(200).send(depot);
            }
            else {
                return res.status(404).json({ success: false, message: "Depot non trouvé" });
            }
        }
        catch (error) {
            // Rollback
            await transaction.rollback()
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async deleteDepot(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Depot>> = { where: { id: req.params.id } }

        let depot: Depot | null = await Depot.findOne(options);
        if (depot) {
            await depot.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Depot supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Depot non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Depot>> = {}

        await Depot.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES = [
        {
            association: Depot.associations.partiesPrenantes, separate: true, include: PartiePrenanteController.INCLUDES
        },
        Depot.associations.depotsTitresFonciers,
        Depot.associations.piecesDeposees,
        Depot.associations.acteRegistre,
    ]

    static GET_INCLUDES = [
        {
            association: Depot.associations.partiesPrenantes, separate: true, include: PartiePrenanteController.GET_INCLUDES
        },
        Depot.associations.depotsTitresFonciers,
        Depot.associations.typeDepot,
        Depot.associations.typeOperationPostImmatriculation,
        Depot.associations.piecesDeposees,
        {
            association: Depot.associations.acteRegistre, include: [
                { association: ActeRegistre.associations.dossierRegistre, attributes: ['id', 'nom', 'volume'], required: false },
                ActeRegistre.associations.region,
                ActeRegistre.associations.centreConservationFonciere,
            ]
        }
    ]
}
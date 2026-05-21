import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes, Op, WhereOptions } from "sequelize";
import { Opposition } from "../models/Opposition";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { PartiePrenante } from "../models/PartiePrenante";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import PartiePrenanteController from "./PartiePrenanteController";
import { OppositionRequisition } from "../models/OppositionRequisition";
import { ActeRegistre } from "../models/ActeRegistre";
import { OppositionRepository } from "../repositories/OppositionRepository";
import { TypesRegistre } from "../../../core/enums/TypesRegistre";
import DossierRegistreController from "./DossierRegistreController";

export default class OppositionController {

    constructor() { }

    static async getAllOppositions(req: Request, res: Response): Promise<any> {

        try {
            // Filtres de l'utilisateur
            let oppositionWhereOptions: WhereOptions<InferAttributes<Opposition>> = {}
            let oppositionRequisitionWhereOptions: WhereOptions<InferAttributes<OppositionRequisition>> = {}

            // Application des filtres
            // if (req.query.numeroOrdre) oppositionWhereOptions.numeroOrdre = { [Op.like]: `%${req.query.numeroOrdre}%` };
            if (req.query.statut) oppositionWhereOptions.statut = req.query.statut as string;
            if (req.query.requisition) oppositionRequisitionWhereOptions.numeroRequisition = req.query.requisition as string;


            let includeOptions: Includeable[] = [
                { association: Opposition.associations.partiesPrenantes, separate: true, include: PartiePrenanteController.GET_INCLUDES },
                Opposition.associations.oppositionsRequisitions,
                Opposition.associations.piecesDeposees,
                Opposition.associations.acteRegistre,
            ]
            let filterIncludeOptions: Includeable[] = [
                // { association: Opposition.associations.partiesPrenantes, separate: true, include: PartiePrenanteController.GET_INCLUDES },
                { association: Opposition.associations.oppositionsRequisitions, where: oppositionRequisitionWhereOptions, attributes: [], required: Object.keys(oppositionRequisitionWhereOptions).length > 0 },
                // Opposition.associations.piecesDeposees,
            ]

            // Récupération des ids des fichiers en se basant sur les filtres de l'utilisateur
            // Options
            let filterOptions: FindOptions<InferAttributes<Opposition>> = {
                where: oppositionWhereOptions,
                attributes: ['id'],
                include: filterIncludeOptions,
            }
            let _oppositions: Opposition[] = await Opposition.findAll(filterOptions);

            // Options
            let options: FindOptions<InferAttributes<Opposition>> = {
                where: {
                    id: { [Op.in]: _oppositions.map(value => value.id) }
                },
                include: includeOptions,
                order: [['createdAt', 'DESC']]
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const oppositionsCount: number = _oppositions.length
                let oppositions: Opposition[] = await Opposition.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Opposition>(oppositions, oppositionsCount, page, limit)
                );
            }
            else {
                let oppositions: Opposition[];
                oppositions = await Opposition.findAll(options);

                return res.status(200).send(oppositions);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getOpposition(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Opposition>> = {}
        options = {
            where: { id: req.params.id },
            include: OppositionController.GET_INCLUDES
            // include: [
            //     { association: Opposition.associations.partiesPrenantes, separate: true, include: PartiePrenanteController.GET_INCLUDES },
            //     Opposition.associations.oppositionsRequisitions,
            //     Opposition.associations.piecesDeposees,
            //     Opposition.associations.donneeIndexation
            // ]
        }

        try {
            const opposition: Opposition | null = await Opposition.findOne(options);

            if (opposition == null)
                return res.status(404).json({ success: false, message: "Opposition non trouvée" });

            return res.status(200).send(opposition);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createOpposition(req: Request, res: Response): Promise<any> {
        const transaction = await DatabaseConnection.getInstance().sequelize.transaction();

        if(req.body.acteRegistre == null)
            return res.status(400).json({ success: false });

        // let opposition: Opposition | null = await Opposition.findOne({ where: { libelle: req.body.libelle } });

        // if (opposition != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        req.body.utilisateurId = (req as any).utilisateurId

        await OppositionRepository.create(req.body, transaction)
            .then(async (opposition) => {
                await transaction.commit()
                return res.status(201).send(opposition);
            })
            .catch(async (error) => {
                // Rollback
                await transaction.rollback()
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updateOpposition(req: Request, res: Response): Promise<any> {
        const transaction = await DatabaseConnection.getInstance().sequelize.transaction();

        try {
            let options: FindOptions<InferAttributes<Opposition>> = { where: { id: req.params.id } }
            let opposition: Opposition | null = await Opposition.findOne(options);

            if (opposition != null) {
                await OppositionRepository.update(req.body, transaction)
                await transaction.commit()
                return res.status(200).send(opposition);
            }
            else {
                return res.status(404).json({ success: false, message: "Opposition non trouvée" });
            }
        }
        catch (error) {
            // Rollback
            await transaction.rollback()
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async deleteOpposition(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Opposition>> = { where: { id: req.params.id } }

        let opposition: Opposition | null = await Opposition.findOne(options);
        if (opposition) {
            await opposition.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Opposition supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Opposition non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Opposition>> = {}

        await Opposition.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES = [
        { association: Opposition.associations.partiesPrenantes, separate: true, include: PartiePrenanteController.INCLUDES },
        Opposition.associations.oppositionsRequisitions,
        Opposition.associations.piecesDeposees,
        Opposition.associations.acteRegistre,
    ]

    static GET_INCLUDES = [
        { association: Opposition.associations.partiesPrenantes, separate: true, include: PartiePrenanteController.GET_INCLUDES },
        Opposition.associations.oppositionsRequisitions,
        Opposition.associations.piecesDeposees,
        {
            association: Opposition.associations.acteRegistre, include: [
                { association: ActeRegistre.associations.dossierRegistre, attributes: ['id', 'nom', 'volume'], required: false },
                ActeRegistre.associations.region,
                ActeRegistre.associations.centreConservationFonciere,
            ]
        }
    ]

    // static getIncludes(): Includeable[] {
    //     return [
    //         { association: Opposition.associations.partiesPrenantes, separate: true, include: PartiePrenanteController.GET_INCLUDES },
    //         Opposition.associations.oppositionsRequisitions,
    //         Opposition.associations.piecesDeposees,
    //     ]
    // }
}
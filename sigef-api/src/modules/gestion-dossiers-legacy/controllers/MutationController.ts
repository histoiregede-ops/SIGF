import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes, Op, WhereOptions } from "sequelize";
import { Mutation } from "../models/Mutation";
import PartiePrenanteController from "./PartiePrenanteController";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class MutationController {

    constructor() { }

    static async getAllMutations(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let mutationWhereOptions: WhereOptions<InferAttributes<Mutation>> = {}

            // Application des filtres
            if (req.query.titreFoncierId) mutationWhereOptions.titreFoncierId = req.query.titreFoncierId as string;
            if (req.query.mode) mutationWhereOptions.modeAcquisitionId = req.query.mode as string;
            if (req.query.dateInscription) mutationWhereOptions.dateInscription = req.query.dateInscription as string;
            if (req.query.search) {
                mutationWhereOptions[Op.or] = [
                    { numeroBordereauAnalytique: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<Mutation>> = {
                where: mutationWhereOptions,
                order: [['createdAt', 'DESC']],
                include: MutationController.GET_INCLUDES,
            }

            let countOptions: CountOptions<InferAttributes<Mutation>> = {
                where: mutationWhereOptions,
                include: MutationController.GET_INCLUDES,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const mutationsCount: number = await Mutation.count(countOptions)
                let mutations: Mutation[] = await Mutation.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Mutation>(mutations, mutationsCount, page, limit)
                );
            }
            else {
                let mutations: Mutation[];
                mutations = await Mutation.findAll(options);

                return res.status(200).send(mutations);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getMutation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Mutation>> = {}
        options = { where: { id: req.params.id } }

        try {
            const mutation: Mutation | null = await Mutation.findOne(options);

            if (mutation == null)
                return res.status(404).json({ success: false, message: "Mutation non trouvée" });

            return res.status(200).send(mutation);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createMutation(req: Request, res: Response): Promise<any> {

        // let mutation: Mutation | null = await Mutation.findOne({ where: { libelle: req.body.libelle } });

        // if (mutation != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
            let mutation: Mutation = new Mutation();
            mutation.numeroBordereauAnalytique = req.body.numeroBordereauAnalytique
            mutation.dateInscription = req.body.dateInscription
            mutation.prixAcquisition = req.body.prixAcquisition
            mutation.valeurVenaleOuEstimee = req.body.valeurVenaleOuEstimee
            mutation.modeAcquisitionId = req.body.modeAcquisitionId
            mutation.titreFoncierId = req.body.titreFoncierId

            await mutation.save()
                .then((mutation) => {
                    return res.status(201).send(mutation);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        // }

        // return null
    }

    static async updateMutation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Mutation>> = { where: { id: req.params.id } }

        let mutation: Mutation | null = await Mutation.findOne(options);
        if (mutation != null) {

            await mutation.update({
                numeroBordereauAnalytique: req.body.numeroBordereauAnalytique,
                dateInscription: req.body.dateInscription,
                prixAcquisition: req.body.prixAcquisition,
                valeurVenaleOuEstimee: req.body.valeurVenaleOuEstimee,
                modeAcquisitionId: req.body.modeAcquisitionId,
                titreFoncierId: req.body.titreFoncierId,
            })
                .then(async (mutation) => {
                    return res.status(200).send(mutation);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Mutation non trouvée" });
        }

        return null
    }

    static async deleteMutation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Mutation>> = { where: { id: req.params.id } }

        let mutation: Mutation | null = await Mutation.findOne(options);
        if (mutation) {
            await mutation.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Mutation supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Mutation non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Mutation>> = {}

        await Mutation.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES: Includeable[] = [
        { association: Mutation.associations.partiesPrenantes, separate: true, include: PartiePrenanteController.INCLUDES }
    ]

    static GET_INCLUDES: Includeable[] = [
        Mutation.associations.modeAcquisition,
        { association: Mutation.associations.partiesPrenantes, separate: true, include: PartiePrenanteController.GET_INCLUDES }
    ]
}
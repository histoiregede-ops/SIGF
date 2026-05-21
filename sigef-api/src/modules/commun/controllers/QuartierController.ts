import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { Quartier } from "../models/Quartier";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class QuartierController {

    constructor() { }

    static async getAllQuartiers(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let quartierWhereOptions: WhereOptions<InferAttributes<Quartier>> = {}

            // Application des filtres
            if (req.query.ville) quartierWhereOptions.villeId = req.query.ville as string;
            if (req.query.search) {
                quartierWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<Quartier>> = {
                where: quartierWhereOptions,
                order: [['createdAt', 'DESC']],
                include: Quartier.associations.ville,
            }

            let countOptions: CountOptions<InferAttributes<Quartier>> = {
                where: quartierWhereOptions,
                include: Quartier.associations.ville,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const quartiersCount: number = await Quartier.count(countOptions)
                let quartiers: Quartier[] = await Quartier.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Quartier>(quartiers, quartiersCount, page, limit)
                );
            }
            else {
                let quartiers: Quartier[];
                quartiers = await Quartier.findAll(options);

                return res.status(200).send(quartiers);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getQuartier(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Quartier>> = {}
        options = {
            where: { id: req.params.id },
            include: [Quartier.associations.ville]
        }

        try {
            const quartier: Quartier | null = await Quartier.findOne(options);

            if (quartier == null)
                return res.status(404).json({ success: false, message: "Quartier non trouvée" });

            return res.status(200).send(quartier);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createQuartier(req: Request, res: Response): Promise<any> {

        let quartier: Quartier | null = await Quartier.findOne({ where: { libelle: req.body.libelle } });

        if (quartier != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let quartier: Quartier = new Quartier();
            quartier.libelle = req.body.libelle
            quartier.description = req.body.description
            quartier.villeId = req.body.villeId

            await quartier.save()
                .then((quartier) => {
                    return res.status(201).send(quartier);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateQuartier(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Quartier>> = { where: { id: req.params.id } }

        let quartier: Quartier | null = await Quartier.findOne(options);
        if (quartier != null) {

            let verificationQuartier: Quartier | null = await Quartier.findOne({ where: { libelle: req.body.libelle } })
            if (verificationQuartier != null && verificationQuartier.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await quartier.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                    villeId: req.body.villeId,
                })
                    .then(async (quartier) => {
                        return res.status(200).send(quartier);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "Quartier non trouvée" });
        }

        return null
    }

    static async deleteQuartier(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Quartier>> = { where: { id: req.params.id } }

        let quartier: Quartier | null = await Quartier.findOne(options);
        if (quartier) {
            await quartier.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Quartier supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Quartier non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Quartier>> = {}

        await Quartier.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
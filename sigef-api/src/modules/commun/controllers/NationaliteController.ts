import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { Nationalite } from "../models/Nationalite";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class NationaliteController {

    constructor() { }

    static async getAllNationalites(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let nationaliteWhereOptions: WhereOptions<InferAttributes<Nationalite>> = {}

            // Application des filtres
            if (req.query.search) {
                nationaliteWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { pays: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<Nationalite>> = {
                where: nationaliteWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<Nationalite>> = {
                where: nationaliteWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const nationalitesCount: number = await Nationalite.count(countOptions)
                let nationalites: Nationalite[] = await Nationalite.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Nationalite>(nationalites, nationalitesCount, page, limit)
                );
            }
            else {
                let nationalites: Nationalite[];
                nationalites = await Nationalite.findAll(options);

                return res.status(200).send(nationalites);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getNationalite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Nationalite>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const nationalite: Nationalite | null = await Nationalite.findOne(options);

            if (nationalite == null)
                return res.status(404).json({ success: false, message: "Nationalite non trouvée" });

            return res.status(200).send(nationalite);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createNationalite(req: Request, res: Response): Promise<any> {

        let nationalite: Nationalite | null = await Nationalite.findOne({ where: { [Op.or]: [{ libelle: req.body.libelle }, { pays: req.body.pays }] } });

        if (nationalite != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let nationalite: Nationalite = new Nationalite();
            nationalite.libelle = req.body.libelle
            nationalite.pays = req.body.pays
            nationalite.description = req.body.description

            await nationalite.save()
                .then((nationalite) => {
                    return res.status(201).send(nationalite);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateNationalite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Nationalite>> = { where: { id: req.params.id } }

        let nationalite: Nationalite | null = await Nationalite.findOne(options);
        if (nationalite != null) {

            let verificationNationalite: Nationalite | null = await Nationalite.findOne({ where: { [Op.or]: [{ libelle: req.body.libelle }, { pays: req.body.pays }] } })
            if (verificationNationalite != null) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await nationalite.update({
                    libelle: req.body.libelle,
                    pays: req.body.pays,
                    description: req.body.description,
                })
                    .then(async (nationalite) => {
                        return res.status(200).send(nationalite);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "Nationalite non trouvée" });
        }

        return null
    }

    static async deleteNationalite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Nationalite>> = { where: { id: req.params.id } }

        let nationalite: Nationalite | null = await Nationalite.findOne(options);
        if (nationalite) {
            await nationalite.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Nationalite supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Nationalite non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Nationalite>> = {}

        await Nationalite.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
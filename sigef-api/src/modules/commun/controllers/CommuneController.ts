import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { Commune } from "../models/Commune";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class CommuneController {

    constructor() { }

    static async getAllCommunes(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let communeWhereOptions: WhereOptions<InferAttributes<Commune>> = {}

            // Application des filtres
            if (req.query.prefectureId) communeWhereOptions.prefectureId = req.query.prefectureId as string;
            else if (req.query.prefecture) communeWhereOptions.prefectureId = req.query.prefecture as string;
            if (req.query.search) {
                communeWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<Commune>> = {
                where: communeWhereOptions,
                order: [['createdAt', 'DESC']],
                include: Commune.associations.prefecture,
            }

            let countOptions: CountOptions<InferAttributes<Commune>> = {
                where: communeWhereOptions,
                include: Commune.associations.prefecture,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const communesCount: number = await Commune.count(countOptions)
                let communes: Commune[] = await Commune.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Commune>(communes, communesCount, page, limit)
                );
            }
            else {
                let communes: Commune[];
                communes = await Commune.findAll(options);

                return res.status(200).send(communes);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getCommune(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Commune>> = {}
        options = {
            where: { id: req.params.id },
            include: [Commune.associations.prefecture]
        }

        try {
            const commune: Commune | null = await Commune.findOne(options);

            if (commune == null)
                return res.status(404).json({ success: false, message: "Commune non trouvée" });

            return res.status(200).send(commune);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createCommune(req: Request, res: Response): Promise<any> {

        let commune: Commune | null = await Commune.findOne({ where: { libelle: req.body.libelle } });

        if (commune != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let commune: Commune = new Commune();
            commune.libelle = req.body.libelle
            commune.description = req.body.description
            commune.prefectureId = req.body.prefectureId

            await commune.save()
                .then((commune) => {
                    return res.status(201).send(commune);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateCommune(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Commune>> = { where: { id: req.params.id } }

        let commune: Commune | null = await Commune.findOne(options);
        if (commune != null) {

            let verificationCommune: Commune | null = await Commune.findOne({ where: { libelle: req.body.libelle } })
            if (verificationCommune != null && verificationCommune.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await commune.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                    prefectureId: req.body.prefectureId,
                })
                    .then(async (commune) => {
                        return res.status(200).send(commune);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "Commune non trouvée" });
        }

        return null
    }

    static async deleteCommune(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Commune>> = { where: { id: req.params.id } }

        let commune: Commune | null = await Commune.findOne(options);
        if (commune) {
            await commune.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Commune supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Commune non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Commune>> = {}

        await Commune.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
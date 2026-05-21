import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { Prefecture } from "../models/Prefecture";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class PrefectureController {

    constructor() { }

    static async getAllPrefectures(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let prefectureWhereOptions: WhereOptions<InferAttributes<Prefecture>> = {}

            // Application des filtres
            if (req.query.regionId) prefectureWhereOptions.regionId = req.query.regionId as string;
            else if (req.query.region) prefectureWhereOptions.regionId = req.query.region as string;
            if (req.query.search) {
                prefectureWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<Prefecture>> = {
                where: prefectureWhereOptions,
                order: [['createdAt', 'DESC']],
                include: Prefecture.associations.region,
            }

            let countOptions: CountOptions<InferAttributes<Prefecture>> = {
                where: prefectureWhereOptions,
                include: Prefecture.associations.region,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const prefecturesCount: number = await Prefecture.count(countOptions)
                let prefectures: Prefecture[] = await Prefecture.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Prefecture>(prefectures, prefecturesCount, page, limit)
                );
            }
            else {
                let prefectures: Prefecture[];
                prefectures = await Prefecture.findAll(options);

                return res.status(200).send(prefectures);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getPrefecture(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Prefecture>> = {}
        options = {
            where: { id: req.params.id },
            include: [Prefecture.associations.region]
        }

        try {
            const prefecture: Prefecture | null = await Prefecture.findOne(options);

            if (prefecture == null)
                return res.status(404).json({ success: false, message: "Prefecture non trouvée" });

            return res.status(200).send(prefecture);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createPrefecture(req: Request, res: Response): Promise<any> {

        let prefecture: Prefecture | null = await Prefecture.findOne({ where: { libelle: req.body.libelle } });

        if (prefecture != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let prefecture: Prefecture = new Prefecture();
            prefecture.libelle = req.body.libelle
            prefecture.description = req.body.description
            prefecture.regionId = req.body.regionId

            await prefecture.save()
                .then((prefecture) => {
                    return res.status(201).send(prefecture);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updatePrefecture(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Prefecture>> = { where: { id: req.params.id } }

        let prefecture: Prefecture | null = await Prefecture.findOne(options);
        if (prefecture != null) {

            let verificationPrefecture: Prefecture | null = await Prefecture.findOne({ where: { libelle: req.body.libelle } })
            if (verificationPrefecture != null && verificationPrefecture.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await prefecture.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                    regionId: req.body.regionId,
                })
                    .then(async (prefecture) => {
                        return res.status(200).send(prefecture);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "Prefecture non trouvée" });
        }

        return null
    }

    static async deletePrefecture(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Prefecture>> = { where: { id: req.params.id } }

        let prefecture: Prefecture | null = await Prefecture.findOne(options);
        if (prefecture) {
            await prefecture.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Prefecture supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Prefecture non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Prefecture>> = {}

        await Prefecture.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
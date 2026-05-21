import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { ModeAlienation } from "../models/ModeAlienation";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class ModeAlienationController {

    constructor() { }

    static async getAllModesAlienation(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let modeAlienationWhereOptions: WhereOptions<InferAttributes<ModeAlienation>> = {}

            // Application des filtres
            if (req.query.search) {
                modeAlienationWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<ModeAlienation>> = {
                where: modeAlienationWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<ModeAlienation>> = {
                where: modeAlienationWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const modesAlienationCount: number = await ModeAlienation.count(countOptions)
                let modesAlienation: ModeAlienation[] = await ModeAlienation.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<ModeAlienation>(modesAlienation, modesAlienationCount, page, limit)
                );
            }
            else {
                let modesAlienation: ModeAlienation[];
                modesAlienation = await ModeAlienation.findAll(options);

                return res.status(200).send(modesAlienation);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getModeAlienation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<ModeAlienation>> = {}
        options = {
            where: { id: req.params.id },
        }

        try {
            const modeAlienation: ModeAlienation | null = await ModeAlienation.findOne(options);

            if (modeAlienation == null)
                return res.status(404).json({ success: false, message: "ModeAlienation non trouvée" });

            return res.status(200).send(modeAlienation);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createModeAlienation(req: Request, res: Response): Promise<any> {

        let modeAlienation: ModeAlienation | null = await ModeAlienation.findOne({ where: { libelle: req.body.libelle } });

        if (modeAlienation != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let modeAlienation: ModeAlienation = new ModeAlienation();
            modeAlienation.libelle = req.body.libelle
            modeAlienation.description = req.body.description

            await modeAlienation.save()
                .then((modeAlienation) => {
                    return res.status(201).send(modeAlienation);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateModeAlienation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<ModeAlienation>> = { where: { id: req.params.id } }

        let modeAlienation: ModeAlienation | null = await ModeAlienation.findOne(options);
        if (modeAlienation != null) {

            let verificationModeAlienation: ModeAlienation | null = await ModeAlienation.findOne({ where: { libelle: req.body.libelle } })
            if (verificationModeAlienation != null && verificationModeAlienation.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await modeAlienation.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                })
                    .then(async (modeAlienation) => {
                        return res.status(200).send(modeAlienation);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "ModeAlienation non trouvée" });
        }

        return null
    }

    static async deleteModeAlienation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<ModeAlienation>> = { where: { id: req.params.id } }

        let modeAlienation: ModeAlienation | null = await ModeAlienation.findOne(options);
        if (modeAlienation) {
            await modeAlienation.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "ModeAlienation supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "ModeAlienation non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<ModeAlienation>> = {}

        await ModeAlienation.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
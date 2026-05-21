import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { ModeAcquisition } from "../models/ModeAcquisition";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class ModeAcquisitionController {

    constructor() { }

    static async getAllModesAcquisition(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let modeAcquisitionWhereOptions: WhereOptions<InferAttributes<ModeAcquisition>> = {}

            // Application des filtres
            if (req.query.search) {
                modeAcquisitionWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<ModeAcquisition>> = {
                where: modeAcquisitionWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<ModeAcquisition>> = {
                where: modeAcquisitionWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const modesAcquisitionCount: number = await ModeAcquisition.count(countOptions)
                let modesAcquisition: ModeAcquisition[] = await ModeAcquisition.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<ModeAcquisition>(modesAcquisition, modesAcquisitionCount, page, limit)
                );
            }
            else {
                let modesAcquisition: ModeAcquisition[];
                modesAcquisition = await ModeAcquisition.findAll(options);

                return res.status(200).send(modesAcquisition);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getModeAcquisition(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<ModeAcquisition>> = {}
        options = {
            where: { id: req.params.id },
        }

        try {
            const modeAcquisition: ModeAcquisition | null = await ModeAcquisition.findOne(options);

            if (modeAcquisition == null)
                return res.status(404).json({ success: false, message: "ModeAcquisition non trouvée" });

            return res.status(200).send(modeAcquisition);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createModeAcquisition(req: Request, res: Response): Promise<any> {

        let modeAcquisition: ModeAcquisition | null = await ModeAcquisition.findOne({ where: { libelle: req.body.libelle } });

        if (modeAcquisition != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let modeAcquisition: ModeAcquisition = new ModeAcquisition();
            modeAcquisition.libelle = req.body.libelle
            modeAcquisition.description = req.body.description

            await modeAcquisition.save()
                .then((modeAcquisition) => {
                    return res.status(201).send(modeAcquisition);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateModeAcquisition(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<ModeAcquisition>> = { where: { id: req.params.id } }

        let modeAcquisition: ModeAcquisition | null = await ModeAcquisition.findOne(options);
        if (modeAcquisition != null) {

            let verificationModeAcquisition: ModeAcquisition | null = await ModeAcquisition.findOne({ where: { libelle: req.body.libelle } })
            if (verificationModeAcquisition != null && verificationModeAcquisition.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await modeAcquisition.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                })
                    .then(async (modeAcquisition) => {
                        return res.status(200).send(modeAcquisition);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "ModeAcquisition non trouvée" });
        }

        return null
    }

    static async deleteModeAcquisition(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<ModeAcquisition>> = { where: { id: req.params.id } }

        let modeAcquisition: ModeAcquisition | null = await ModeAcquisition.findOne(options);
        if (modeAcquisition) {
            await modeAcquisition.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "ModeAcquisition supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "ModeAcquisition non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<ModeAcquisition>> = {}

        await ModeAcquisition.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
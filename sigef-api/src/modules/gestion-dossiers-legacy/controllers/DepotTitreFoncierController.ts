import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op } from "sequelize";
import { DepotTitreFoncier } from "../models/DepotTitreFoncier";

export default class DepotTitreFoncierController {

    constructor() { }

    static async getAllDepotsTitresFonciers(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DepotTitreFoncier>> = {
            include: []
        }

        try {
            let depotsTitresFonciers: DepotTitreFoncier[];
            depotsTitresFonciers = await DepotTitreFoncier.findAll(options);

            return res.status(200).send(depotsTitresFonciers);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getDepotTitreFoncier(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DepotTitreFoncier>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const depotTitreFoncier: DepotTitreFoncier | null = await DepotTitreFoncier.findOne(options);

            if (depotTitreFoncier == null)
                return res.status(404).json({ success: false, message: "DepotTitreFoncier non trouvée" });

            return res.status(200).send(depotTitreFoncier);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createDepotTitreFoncier(req: Request, res: Response): Promise<any> {

        let depotTitreFoncier: DepotTitreFoncier | null = await DepotTitreFoncier.findOne({
            where: {
                [Op.and]: [
                    { numeroTitreFoncier: req.body.numeroTitreFoncier },
                    { depotId: req.body.depotId },
                ]
            }
        });

        if (depotTitreFoncier != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let depotTitreFoncier: DepotTitreFoncier = new DepotTitreFoncier();
            depotTitreFoncier.numeroTitreFoncier = req.body.numeroTitreFoncier
            depotTitreFoncier.depotId = req.body.depotId

            await depotTitreFoncier.save()
                .then((depotTitreFoncier) => {
                    return res.status(201).send(depotTitreFoncier);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateDepotTitreFoncier(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DepotTitreFoncier>> = { where: { id: req.params.id } }

        let depotTitreFoncier: DepotTitreFoncier | null = await DepotTitreFoncier.findOne(options);
        if (depotTitreFoncier != null) {

            let verificationDepotTitreFoncier: DepotTitreFoncier | null = await DepotTitreFoncier.findOne({
                where: {
                    [Op.and]: [
                        { numeroTitreFoncier: req.body.numeroTitreFoncier },
                        { depotId: req.body.depotId },
                    ]
                }
            })
            if (verificationDepotTitreFoncier != null && verificationDepotTitreFoncier.numeroTitreFoncier != req.body.numeroTitreFoncier && verificationDepotTitreFoncier.depotId != req.body.depotId) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await depotTitreFoncier.update({
                    numeroTitreFoncier: req.body.numeroTitreFoncier,
                    depotId: req.body.depotId,
                })
                    .then(async (depotTitreFoncier) => {
                        return res.status(200).send(depotTitreFoncier);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "DepotTitreFoncier non trouvée" });
        }

        return null
    }

    static async deleteDepotTitreFoncier(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DepotTitreFoncier>> = { where: { id: req.params.id } }

        let depotTitreFoncier: DepotTitreFoncier | null = await DepotTitreFoncier.findOne(options);
        if (depotTitreFoncier) {
            await depotTitreFoncier.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "DepotTitreFoncier supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "DepotTitreFoncier non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<DepotTitreFoncier>> = {}

        await DepotTitreFoncier.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
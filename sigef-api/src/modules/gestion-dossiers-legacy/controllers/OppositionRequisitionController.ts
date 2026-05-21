import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op } from "sequelize";
import { OppositionRequisition } from "../models/OppositionRequisition";

export default class OppositionRequisitionController {

    constructor() { }

    static async getAllOppositionsRequisitions(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<OppositionRequisition>> = {
            include: []
        }

        try {
            let oppositionsRequisitions: OppositionRequisition[];
            oppositionsRequisitions = await OppositionRequisition.findAll(options);

            return res.status(200).send(oppositionsRequisitions);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getOppositionRequisition(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<OppositionRequisition>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const oppositionRequisition: OppositionRequisition | null = await OppositionRequisition.findOne(options);

            if (oppositionRequisition == null)
                return res.status(404).json({ success: false, message: "OppositionRequisition non trouvée" });

            return res.status(200).send(oppositionRequisition);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createOppositionRequisition(req: Request, res: Response): Promise<any> {

        let oppositionRequisition: OppositionRequisition | null = await OppositionRequisition.findOne({
            where: {
                [Op.and]: [
                    { numeroRequisition: req.body.numeroRequisition },
                    { oppositionId: req.body.oppositionId },
                ]
            }
        });

        if (oppositionRequisition != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let oppositionRequisition: OppositionRequisition = new OppositionRequisition();
            oppositionRequisition.numeroRequisition = req.body.numeroRequisition
            oppositionRequisition.oppositionId = req.body.oppositionId

            await oppositionRequisition.save()
                .then((oppositionRequisition) => {
                    return res.status(201).send(oppositionRequisition);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateOppositionRequisition(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<OppositionRequisition>> = { where: { id: req.params.id } }

        let oppositionRequisition: OppositionRequisition | null = await OppositionRequisition.findOne(options);
        if (oppositionRequisition != null) {

            let verificationOppositionRequisition: OppositionRequisition | null = await OppositionRequisition.findOne({
                where: {
                    [Op.and]: [
                        { numeroRequisition: req.body.numeroRequisition },
                        { oppositionId: req.body.oppositionId },
                    ]
                }
            })
            if (verificationOppositionRequisition != null && verificationOppositionRequisition.numeroRequisition != req.body.numeroRequisition && verificationOppositionRequisition.oppositionId != req.body.oppositionId) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await oppositionRequisition.update({
                    numeroRequisition: req.body.numeroRequisition,
                    oppositionId: req.body.oppositionId,
                })
                    .then(async (oppositionRequisition) => {
                        return res.status(200).send(oppositionRequisition);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "OppositionRequisition non trouvée" });
        }

        return null
    }

    static async deleteOppositionRequisition(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<OppositionRequisition>> = { where: { id: req.params.id } }

        let oppositionRequisition: OppositionRequisition | null = await OppositionRequisition.findOne(options);
        if (oppositionRequisition) {
            await oppositionRequisition.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "OppositionRequisition supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "OppositionRequisition non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<OppositionRequisition>> = {}

        await OppositionRequisition.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
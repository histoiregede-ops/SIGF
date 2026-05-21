import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op } from "sequelize";
import { OppositionCasInscriptionDifferee } from "../models/OppositionCasInscriptionDifferee";

export default class OppositionCasInscriptionDiffereeController {

    constructor() { }

    static async getAllOppositionsCasInscriptionDifferee(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<OppositionCasInscriptionDifferee>> = {
            include: []
        }

        try {
            let oppositionsCasInscriptionDifferee: OppositionCasInscriptionDifferee[];
            oppositionsCasInscriptionDifferee = await OppositionCasInscriptionDifferee.findAll(options);

            return res.status(200).send(oppositionsCasInscriptionDifferee);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getOppositionCasInscriptionDifferee(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<OppositionCasInscriptionDifferee>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const oppositionCasInscriptionDifferee: OppositionCasInscriptionDifferee | null = await OppositionCasInscriptionDifferee.findOne(options);

            if (oppositionCasInscriptionDifferee == null)
                return res.status(404).json({ success: false, message: "OppositionCasInscriptionDifferee non trouvée" });

            return res.status(200).send(oppositionCasInscriptionDifferee);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createOppositionCasInscriptionDifferee(req: Request, res: Response): Promise<any> {

        // let oppositionCasInscriptionDifferee: OppositionCasInscriptionDifferee | null = await OppositionCasInscriptionDifferee.findOne({ where: { libelle: req.body.libelle } });

        // if (oppositionCasInscriptionDifferee != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
            let oppositionCasInscriptionDifferee: OppositionCasInscriptionDifferee = new OppositionCasInscriptionDifferee();
            oppositionCasInscriptionDifferee.dateOpposition = req.body.dateOpposition
            oppositionCasInscriptionDifferee.numeroRegistreDepots = req.body.numeroRegistreDepots
            oppositionCasInscriptionDifferee.dureeValiditeOpposition = req.body.dureeValiditeOpposition
            oppositionCasInscriptionDifferee.titreFoncierId = req.body.titreFoncierId

            await oppositionCasInscriptionDifferee.save()
                .then((oppositionCasInscriptionDifferee) => {
                    return res.status(201).send(oppositionCasInscriptionDifferee);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        // }

        // return null
    }

    static async updateOppositionCasInscriptionDifferee(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<OppositionCasInscriptionDifferee>> = { where: { id: req.params.id } }

        let oppositionCasInscriptionDifferee: OppositionCasInscriptionDifferee | null = await OppositionCasInscriptionDifferee.findOne(options);
        if (oppositionCasInscriptionDifferee != null) {

            // let verificationOppositionCasInscriptionDifferee: OppositionCasInscriptionDifferee | null = await OppositionCasInscriptionDifferee.findOne({ where: { libelle: req.body.libelle } })
            // if (verificationOppositionCasInscriptionDifferee != null && verificationOppositionCasInscriptionDifferee.libelle != req.body.libelle) {
            //     return res.status(400).json({ success: false, alreadyExists: true });
            // }
            // else {

                await oppositionCasInscriptionDifferee.update({
                    dateOpposition: req.body.dateOpposition,
                    numeroRegistreDepots: req.body.numeroRegistreDepots,
                    dureeValiditeOpposition: req.body.dureeValiditeOpposition,
                    titreFoncierId: req.body.titreFoncierId,
                })
                    .then(async (oppositionCasInscriptionDifferee) => {
                        return res.status(200).send(oppositionCasInscriptionDifferee);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            // }
        }
        else {
            return res.status(404).json({ success: false, message: "OppositionCasInscriptionDifferee non trouvée" });
        }

        return null
    }

    static async deleteOppositionCasInscriptionDifferee(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<OppositionCasInscriptionDifferee>> = { where: { id: req.params.id } }

        let oppositionCasInscriptionDifferee: OppositionCasInscriptionDifferee | null = await OppositionCasInscriptionDifferee.findOne(options);
        if (oppositionCasInscriptionDifferee) {
            await oppositionCasInscriptionDifferee.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "OppositionCasInscriptionDifferee supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "OppositionCasInscriptionDifferee non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<OppositionCasInscriptionDifferee>> = {}

        await OppositionCasInscriptionDifferee.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
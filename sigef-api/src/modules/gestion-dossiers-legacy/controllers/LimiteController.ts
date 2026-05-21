import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes } from "sequelize";
import { Limite } from "../models/Limite";

export default class LimiteController {

    constructor() { }

    static async getAllLimites(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Limite>> = {}

        try {
            let limites: Limite[];
            limites = await Limite.findAll(options);

            return res.status(200).send(limites);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getLimite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Limite>> = {}
        options = { where: { id: req.params.id } }

        try {
            const limite: Limite | null = await Limite.findOne(options);

            if (limite == null)
                return res.status(404).json({ success: false, message: "Limite non trouvée" });

            return res.status(200).send(limite);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createLimite(req: Request, res: Response): Promise<any> {

        // let limite: Limite | null = await Limite.findOne({ where: { libelle: req.body.libelle } });

        // if (limite != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
            let limite: Limite = new Limite();
            limite.limitrophe = req.body.limitrophe
            limite.directionLimiteId = req.body.directionLimiteId
            limite.titreFoncierId = req.body.titreFoncierId

            await limite.save()
                .then((limite) => {
                    return res.status(201).send(limite);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        // }

        // return null
    }

    static async updateLimite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Limite>> = { where: { id: req.params.id } }

        let limite: Limite | null = await Limite.findOne(options);
        if (limite != null) {

            await limite.update({
                limitrophe: req.body.limitrophe,
                directionLimiteId: req.body.directionLimiteId,
                titreFoncierId: req.body.titreFoncierId,
            })
                .then(async (limite) => {
                    return res.status(200).send(limite);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Limite non trouvée" });
        }

        return null
    }

    static async deleteLimite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Limite>> = { where: { id: req.params.id } }

        let limite: Limite | null = await Limite.findOne(options);
        if (limite) {
            await limite.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Limite supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Limite non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Limite>> = {}

        await Limite.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static GET_INCLUDES = [Limite.associations.directionLimite]
}
import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes } from "sequelize";
import { Bornage } from "../models/Bornage";

export default class BornageController {

    constructor() { }

    static async getAllBornages(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Bornage>> = {}

        try {
            let bornages: Bornage[];
            bornages = await Bornage.findAll(options);

            return res.status(200).send(bornages);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getBornage(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Bornage>> = {}
        options = { where: { id: req.params.id } }

        try {
            const bornage: Bornage | null = await Bornage.findOne(options);

            if (bornage == null)
                return res.status(404).json({ success: false, message: "Bornage non trouvée" });

            return res.status(200).send(bornage);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createBornage(req: Request, res: Response): Promise<any> {

        // let bornage: Bornage | null = await Bornage.findOne({ where: { libelle: req.body.libelle } });

        // if (bornage != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
            let bornage: Bornage = new Bornage();
            bornage.dateInsertionJournalOfficiel = req.body.dateInsertionJournalOfficiel
            bornage.dateAvisIndividuels = req.body.dateAvisIndividuels
            bornage.dateProcesVerbal = req.body.dateProcesVerbal
            bornage.formalitePrealableId = req.body.formalitePrealableId

            await bornage.save()
                .then((bornage) => {
                    return res.status(201).send(bornage);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        // }

        // return null
    }

    static async updateBornage(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Bornage>> = { where: { id: req.params.id } }

        let bornage: Bornage | null = await Bornage.findOne(options);
        if (bornage != null) {

            await bornage.update({
                dateInsertionJournalOfficiel: req.body.dateInsertionJournalOfficiel,
                dateAvisIndividuels: req.body.dateAvisIndividuels,
                dateProcesVerbal: req.body.dateProcesVerbal,
                formalitePrealableId: req.body.formalitePrealableId,
            })
                .then(async (bornage) => {
                    return res.status(200).send(bornage);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Bornage non trouvée" });
        }

        return null
    }

    static async deleteBornage(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Bornage>> = { where: { id: req.params.id } }

        let bornage: Bornage | null = await Bornage.findOne(options);
        if (bornage) {
            await bornage.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Bornage supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Bornage non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Bornage>> = {}

        await Bornage.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
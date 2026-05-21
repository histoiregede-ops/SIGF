import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes } from "sequelize";
import { ProcedureJudiciaire } from "../models/ProcedureJudiciaire";

export default class ProcedureJudiciaireController {

    constructor() { }

    static async getAllProcedureJudiciaires(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<ProcedureJudiciaire>> = {}

        try {
            let proceduresJudiciaire: ProcedureJudiciaire[];
            proceduresJudiciaire = await ProcedureJudiciaire.findAll(options);

            return res.status(200).send(proceduresJudiciaire);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getProcedureJudiciaire(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<ProcedureJudiciaire>> = {}
        options = { where: { id: req.params.id } }

        try {
            const procedureJudiciaire: ProcedureJudiciaire | null = await ProcedureJudiciaire.findOne(options);

            if (procedureJudiciaire == null)
                return res.status(404).json({ success: false, message: "ProcedureJudiciaire non trouvée" });

            return res.status(200).send(procedureJudiciaire);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createProcedureJudiciaire(req: Request, res: Response): Promise<any> {

        // let procedureJudiciaire: ProcedureJudiciaire | null = await ProcedureJudiciaire.findOne({ where: { libelle: req.body.libelle } });

        // if (procedureJudiciaire != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
            let procedureJudiciaire: ProcedureJudiciaire = new ProcedureJudiciaire();
            procedureJudiciaire.dateJugementEnPremiereInstance = req.body.dateJugementEnPremiereInstance
            procedureJudiciaire.dateRemiseExpeditionEnPremiereInstance = req.body.dateRemiseExpeditionEnPremiereInstance
            procedureJudiciaire.dateRecoursEnPremiereInstance = req.body.dateRecoursEnPremiereInstance
            procedureJudiciaire.dateArreEnAppel = req.body.dateArreEnAppel
            procedureJudiciaire.dateRemiseExpeditionEnAppel = req.body.dateRemiseExpeditionEnAppel
            procedureJudiciaire.dateRecoursEnAppel = req.body.dateRecoursEnAppel
            procedureJudiciaire.dateArreEnCassation = req.body.dateArreEnCassation
            procedureJudiciaire.dateRemiseExpeditionEnCassation = req.body.dateRemiseExpeditionEnCassation
            procedureJudiciaire.formalitePrealableId = req.body.formalitePrealableId

            await procedureJudiciaire.save()
                .then((procedureJudiciaire) => {
                    return res.status(201).send(procedureJudiciaire);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        // }

        // return null
    }

    static async updateProcedureJudiciaire(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<ProcedureJudiciaire>> = { where: { id: req.params.id } }

        let procedureJudiciaire: ProcedureJudiciaire | null = await ProcedureJudiciaire.findOne(options);
        if (procedureJudiciaire != null) {

            await procedureJudiciaire.update({
                dateJugementEnPremiereInstance: req.body.dateJugementEnPremiereInstance,
                dateRemiseExpeditionEnPremiereInstance: req.body.dateRemiseExpeditionEnPremiereInstance,
                dateRecoursEnPremiereInstance: req.body.dateRecoursEnPremiereInstance,
                dateArreEnAppel: req.body.dateArreEnAppel,
                dateRemiseExpeditionEnAppel: req.body.dateRemiseExpeditionEnAppel,
                dateRecoursEnAppel: req.body.dateRecoursEnAppel,
                dateArreEnCassation: req.body.dateArreEnCassation,
                dateRemiseExpeditionEnCassation: req.body.dateRemiseExpeditionEnCassation,
                formalitePrealableId: req.body.formalitePrealableId,
            })
                .then(async (procedureJudiciaire) => {
                    return res.status(200).send(procedureJudiciaire);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "ProcedureJudiciaire non trouvée" });
        }

        return null
    }

    static async deleteProcedureJudiciaire(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<ProcedureJudiciaire>> = { where: { id: req.params.id } }

        let procedureJudiciaire: ProcedureJudiciaire | null = await ProcedureJudiciaire.findOne(options);
        if (procedureJudiciaire) {
            await procedureJudiciaire.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "ProcedureJudiciaire supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "ProcedureJudiciaire non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<ProcedureJudiciaire>> = {}

        await ProcedureJudiciaire.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
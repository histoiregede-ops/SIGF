import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { CauseIndisponibilite } from "../models/CauseIndisponibilite";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class CauseIndisponibiliteController {

    constructor() { }

    static async getAllCausesIndisponibilite(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let causeIndisponibiliteWhereOptions: WhereOptions<InferAttributes<CauseIndisponibilite>> = {}

            // Application des filtres
            if (req.query.titreFoncierId) causeIndisponibiliteWhereOptions.titreFoncierId = req.query.titreFoncierId as string;
            if (req.query.dateInscription) causeIndisponibiliteWhereOptions.dateInscription = req.query.dateInscription as string;
            if (req.query.dateRadiation) causeIndisponibiliteWhereOptions.dateRadiation = req.query.dateRadiation as string;
            if (req.query.search) {
                causeIndisponibiliteWhereOptions[Op.or] = [
                    { numeroBordereauAnalytiqueStipulationExecution: { [Op.like]: `%${req.query.search}%` } },
                    { indicationClausesConventionnelles: { [Op.like]: `%${req.query.search}%` } },
                    { numeroBordereauAnalytiqueRadiation: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<CauseIndisponibilite>> = {
                where: causeIndisponibiliteWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<CauseIndisponibilite>> = {
                where: causeIndisponibiliteWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const causesIndisponibiliteCount: number = await CauseIndisponibilite.count(countOptions)
                let causesIndisponibilite: CauseIndisponibilite[] = await CauseIndisponibilite.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<CauseIndisponibilite>(causesIndisponibilite, causesIndisponibiliteCount, page, limit)
                );
            }
            else {
                let causesIndisponibilite: CauseIndisponibilite[];
                causesIndisponibilite = await CauseIndisponibilite.findAll(options);

                return res.status(200).send(causesIndisponibilite);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getCauseIndisponibilite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<CauseIndisponibilite>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const causeindisponibilite: CauseIndisponibilite | null = await CauseIndisponibilite.findOne(options);

            if (causeindisponibilite == null)
                return res.status(404).json({ success: false, message: "CauseIndisponibilite non trouvée" });

            return res.status(200).send(causeindisponibilite);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createCauseIndisponibilite(req: Request, res: Response): Promise<any> {

        // let causeindisponibilite: CauseIndisponibilite | null = await CauseIndisponibilite.findOne({ where: { libelle: req.body.libelle } });

        // if (causeindisponibilite != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let causeindisponibilite: CauseIndisponibilite = new CauseIndisponibilite();
        causeindisponibilite.numeroBordereauAnalytiqueStipulationExecution = req.body.numeroBordereauAnalytiqueStipulationExecution
        causeindisponibilite.dateInscription = req.body.dateInscription
        causeindisponibilite.indicationClausesConventionnelles = req.body.indicationClausesConventionnelles
        causeindisponibilite.numeroBordereauAnalytiqueRadiation = req.body.numeroBordereauAnalytiqueRadiation
        causeindisponibilite.dateRadiation = req.body.dateRadiation
        causeindisponibilite.titreFoncierId = req.body.titreFoncierId

        await causeindisponibilite.save()
            .then((causeindisponibilite) => {
                return res.status(201).send(causeindisponibilite);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updateCauseIndisponibilite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<CauseIndisponibilite>> = { where: { id: req.params.id } }

        let causeindisponibilite: CauseIndisponibilite | null = await CauseIndisponibilite.findOne(options);
        if (causeindisponibilite != null) {

            // let verificationCauseIndisponibilite: CauseIndisponibilite | null = await CauseIndisponibilite.findOne({ where: { libelle: req.body.libelle } })
            // if (verificationCauseIndisponibilite != null && verificationCauseIndisponibilite.libelle != req.body.libelle) {
            //     return res.status(400).json({ success: false, alreadyExists: true });
            // }
            // else {

            await causeindisponibilite.update({
                numeroBordereauAnalytiqueStipulationExecution: req.body.numeroBordereauAnalytiqueStipulationExecution,
                dateInscription: req.body.dateInscription,
                indicationClausesConventionnelles: req.body.indicationClausesConventionnelles,
                numeroBordereauAnalytiqueRadiation: req.body.numeroBordereauAnalytiqueRadiation,
                dateRadiation: req.body.dateRadiation,
                titreFoncierId: req.body.titreFoncierId,
            })
                .then(async (causeindisponibilite) => {
                    return res.status(200).send(causeindisponibilite);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
            // }
        }
        else {
            return res.status(404).json({ success: false, message: "CauseIndisponibilite non trouvée" });
        }

        return null
    }

    static async deleteCauseIndisponibilite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<CauseIndisponibilite>> = { where: { id: req.params.id } }

        let causeindisponibilite: CauseIndisponibilite | null = await CauseIndisponibilite.findOne(options);
        if (causeindisponibilite) {
            await causeindisponibilite.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "CauseIndisponibilite supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "CauseIndisponibilite non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<CauseIndisponibilite>> = {}

        await CauseIndisponibilite.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
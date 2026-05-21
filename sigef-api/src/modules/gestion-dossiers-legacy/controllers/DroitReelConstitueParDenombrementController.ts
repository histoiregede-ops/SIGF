import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes, Op, WhereOptions } from "sequelize";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { DroitReelConstitueParDenombrement } from "../models/DroitReelConstitueParDenombrement";

export default class DroitReelConstitueParDenombrementController {

    constructor() { }

    static async getAllDroitsReelsConstituesParDenombrement(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let droitReelConstitueParDenombrementWhereOptions: WhereOptions<InferAttributes<DroitReelConstitueParDenombrement>> = {}

            // Application des filtres
            if (req.query.titreFoncierId) droitReelConstitueParDenombrementWhereOptions.titreFoncierId = req.query.titreFoncierId as string;
            if (req.query.dateInscription) droitReelConstitueParDenombrementWhereOptions.dateInscription = req.query.dateInscription as string;
            if (req.query.dateRadiation) droitReelConstitueParDenombrementWhereOptions.dateRadiation = req.query.dateRadiation as string;
            if (req.query.search) {
                droitReelConstitueParDenombrementWhereOptions[Op.or] = [
                    { numeroBordereauAnalytiqueConstitution: { [Op.like]: `%${req.query.search}%` } },
                    { indicationChargeOuConstitue: { [Op.like]: `%${req.query.search}%` } },
                    { numeroBordereauAnalytiqueRadiation: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<DroitReelConstitueParDenombrement>> = {
                where: droitReelConstitueParDenombrementWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<DroitReelConstitueParDenombrement>> = {
                where: droitReelConstitueParDenombrementWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const droitsReelsConstituesParDenombrementCount: number = await DroitReelConstitueParDenombrement.count(countOptions)
                let droitsReelsConstituesParDenombrement: DroitReelConstitueParDenombrement[] = await DroitReelConstitueParDenombrement.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<DroitReelConstitueParDenombrement>(droitsReelsConstituesParDenombrement, droitsReelsConstituesParDenombrementCount, page, limit)
                );
            }
            else {
                let droitsReelsConstituesParDenombrement: DroitReelConstitueParDenombrement[];
                droitsReelsConstituesParDenombrement = await DroitReelConstitueParDenombrement.findAll(options);

                return res.status(200).send(droitsReelsConstituesParDenombrement);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getDroitReelConstitueParDenombrement(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DroitReelConstitueParDenombrement>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const droitreelconstituepardenombrement: DroitReelConstitueParDenombrement | null = await DroitReelConstitueParDenombrement.findOne(options);

            if (droitreelconstituepardenombrement == null)
                return res.status(404).json({ success: false, message: "DroitReelConstitueParDenombrement non trouvée" });

            return res.status(200).send(droitreelconstituepardenombrement);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createDroitReelConstitueParDenombrement(req: Request, res: Response): Promise<any> {

        // let droitreelconstituepardenombrement: DroitReelConstitueParDenombrement | null = await DroitReelConstitueParDenombrement.findOne({ where: { libelle: req.body.libelle } });

        // if (droitreelconstituepardenombrement != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let droitreelconstituepardenombrement: DroitReelConstitueParDenombrement = new DroitReelConstitueParDenombrement();
        droitreelconstituepardenombrement.numeroBordereauAnalytiqueConstitution = req.body.numeroBordereauAnalytiqueConstitution
        droitreelconstituepardenombrement.dateInscription = req.body.dateInscription
        droitreelconstituepardenombrement.indicationChargeOuConstitue = req.body.indicationChargeOuConstitue
        droitreelconstituepardenombrement.prix = req.body.prix
        droitreelconstituepardenombrement.numeroBordereauAnalytiqueRadiation = req.body.numeroBordereauAnalytiqueRadiation
        droitreelconstituepardenombrement.dateRadiation = req.body.dateRadiation
        droitreelconstituepardenombrement.titreFoncierId = req.body.titreFoncierId

        await droitreelconstituepardenombrement.save()
            .then((droitreelconstituepardenombrement) => {
                return res.status(201).send(droitreelconstituepardenombrement);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updateDroitReelConstitueParDenombrement(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DroitReelConstitueParDenombrement>> = { where: { id: req.params.id } }

        let droitreelconstituepardenombrement: DroitReelConstitueParDenombrement | null = await DroitReelConstitueParDenombrement.findOne(options);
        if (droitreelconstituepardenombrement != null) {

            // let verificationDroitReelConstitueParDenombrement: DroitReelConstitueParDenombrement | null = await DroitReelConstitueParDenombrement.findOne({ where: { libelle: req.body.libelle } })
            // if (verificationDroitReelConstitueParDenombrement != null && verificationDroitReelConstitueParDenombrement.libelle != req.body.libelle) {
            //     return res.status(400).json({ success: false, alreadyExists: true });
            // }
            // else {

            await droitreelconstituepardenombrement.update({
                numeroBordereauAnalytiqueConstitution: req.body.numeroBordereauAnalytiqueConstitution,
                dateInscription: req.body.dateInscription,
                indicationChargeOuConstitue: req.body.indicationChargeOuConstitue,
                prix: req.body.prix,
                numeroBordereauAnalytiqueRadiation: req.body.numeroBordereauAnalytiqueRadiation,
                dateRadiation: req.body.dateRadiation,
                titreFoncierId: req.body.titreFoncierId,
            })
                .then(async (droitreelconstituepardenombrement) => {
                    return res.status(200).send(droitreelconstituepardenombrement);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
            // }
        }
        else {
            return res.status(404).json({ success: false, message: "DroitReelConstitueParDenombrement non trouvée" });
        }

        return null
    }

    static async deleteDroitReelConstitueParDenombrement(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DroitReelConstitueParDenombrement>> = { where: { id: req.params.id } }

        let droitreelconstituepardenombrement: DroitReelConstitueParDenombrement | null = await DroitReelConstitueParDenombrement.findOne(options);
        if (droitreelconstituepardenombrement) {
            await droitreelconstituepardenombrement.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "DroitReelConstitueParDenombrement supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "DroitReelConstitueParDenombrement non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<DroitReelConstitueParDenombrement>> = {}

        await DroitReelConstitueParDenombrement.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
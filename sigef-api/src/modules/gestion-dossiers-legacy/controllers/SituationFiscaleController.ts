import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { SituationFiscale } from "../models/SituationFiscale";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class SituationFiscaleController {

    constructor() { }

    static async getAllSituationsFiscales(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let situationFiscaleWhereOptions: WhereOptions<InferAttributes<SituationFiscale>> = {}

            // Application des filtres
            if (req.query.titreFoncierId) situationFiscaleWhereOptions.titreFoncierId = req.query.titreFoncierId as string;
            if (req.query.search) {
                situationFiscaleWhereOptions[Op.or] = [
                    { annee: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<SituationFiscale>> = {
                where: situationFiscaleWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<SituationFiscale>> = {
                where: situationFiscaleWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const situationsFiscalesCount: number = await SituationFiscale.count(countOptions)
                let situationsFiscales: SituationFiscale[] = await SituationFiscale.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<SituationFiscale>(situationsFiscales, situationsFiscalesCount, page, limit)
                );
            }
            else {
                let situationsFiscales: SituationFiscale[];
                situationsFiscales = await SituationFiscale.findAll(options);

                return res.status(200).send(situationsFiscales);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getSituationFiscale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<SituationFiscale>> = {}
        options = { where: { id: req.params.id } }

        try {
            const situationFiscale: SituationFiscale | null = await SituationFiscale.findOne(options);

            if (situationFiscale == null)
                return res.status(404).json({ success: false, message: "SituationFiscale non trouvée" });

            return res.status(200).send(situationFiscale);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createSituationFiscale(req: Request, res: Response): Promise<any> {

        // let situationFiscale: SituationFiscale | null = await SituationFiscale.findOne({ where: { libelle: req.body.libelle } });

        // if (situationFiscale != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let situationFiscale: SituationFiscale = new SituationFiscale();
        situationFiscale.annee = req.body.annee
        situationFiscale.valeurVenale = req.body.valeurVenale
        situationFiscale.valeurLocative = req.body.valeurLocative
        situationFiscale.exoneration = req.body.exoneration
        situationFiscale.taxeLiquidee = req.body.taxeLiquidee
        situationFiscale.taxePayee = req.body.taxePayee
        situationFiscale.taxeRestanteDue = req.body.taxeRestanteDue
        situationFiscale.titreFoncierId = req.body.titreFoncierId

        await situationFiscale.save()
            .then((situationFiscale) => {
                return res.status(201).send(situationFiscale);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updateSituationFiscale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<SituationFiscale>> = { where: { id: req.params.id } }

        let situationFiscale: SituationFiscale | null = await SituationFiscale.findOne(options);
        if (situationFiscale != null) {

            await situationFiscale.update({
                annee: req.body.annee,
                valeurVenale: req.body.valeurVenale,
                valeurLocative: req.body.valeurLocative,
                exoneration: req.body.exoneration,
                taxeLiquidee: req.body.taxeLiquidee,
                taxePayee: req.body.taxePayee,
                taxeRestanteDue: req.body.taxeRestanteDue,
                titreFoncierId: req.body.titreFoncierId,
            })
                .then(async (situationFiscale) => {
                    return res.status(200).send(situationFiscale);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "SituationFiscale non trouvée" });
        }

        return null
    }

    static async deleteSituationFiscale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<SituationFiscale>> = { where: { id: req.params.id } }

        let situationFiscale: SituationFiscale | null = await SituationFiscale.findOne(options);
        if (situationFiscale) {
            await situationFiscale.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "SituationFiscale supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "SituationFiscale non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<SituationFiscale>> = {}

        await SituationFiscale.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static GET_INCLUDES = []
}
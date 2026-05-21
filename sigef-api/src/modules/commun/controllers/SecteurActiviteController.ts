import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { SecteurActivite } from "../models/SecteurActivite";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { DataTypeUtils } from "../../../core/helpers/DataTypeUtils";

export default class SecteurActiviteController {

    constructor() { }

    static async getAllSecteursActivite(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let secteurActiviteWhereOptions: WhereOptions<InferAttributes<SecteurActivite>> = {}

            // Application des filtres
            if (req.query.search) {
                secteurActiviteWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<SecteurActivite>> = {
                where: secteurActiviteWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<SecteurActivite>> = {
                where: secteurActiviteWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const secteursActiviteCount: number = await SecteurActivite.count(countOptions)
                let secteursActivite: SecteurActivite[] = await SecteurActivite.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<SecteurActivite>(secteursActivite, secteursActiviteCount, page, limit)
                );
            }
            else {
                let secteursActivite: SecteurActivite[];
                secteursActivite = await SecteurActivite.findAll(options);

                return res.status(200).send(secteursActivite);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getSecteurActivite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<SecteurActivite>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const secteurActivite: SecteurActivite | null = await SecteurActivite.findOne(options);

            if (secteurActivite == null)
                return res.status(404).json({ success: false, message: "SecteurActivite non trouvée" });

            return res.status(200).send(secteurActivite);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createSecteurActivite(req: Request, res: Response): Promise<any> {

        let secteurActivite: SecteurActivite | null = await SecteurActivite.findOne({ where: { libelle: req.body.libelle } });

        if (secteurActivite != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let secteurActivite: SecteurActivite = new SecteurActivite();
            secteurActivite.libelle = req.body.libelle
            secteurActivite.description = req.body.description

            await secteurActivite.save()
                .then((secteurActivite) => {
                    return res.status(201).send(secteurActivite);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateSecteurActivite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<SecteurActivite>> = { where: { id: req.params.id } }

        let secteurActivite: SecteurActivite | null = await SecteurActivite.findOne(options);
        if (secteurActivite != null) {

            let verificationSecteurActivite: SecteurActivite | null = await SecteurActivite.findOne({ where: { libelle: req.body.libelle } })
            if (verificationSecteurActivite != null && verificationSecteurActivite.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await secteurActivite.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                })
                    .then(async (secteurActivite) => {
                        return res.status(200).send(secteurActivite);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "SecteurActivite non trouvée" });
        }

        return null
    }

    static async deleteSecteurActivite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<SecteurActivite>> = { where: { id: req.params.id } }

        let secteurActivite: SecteurActivite | null = await SecteurActivite.findOne(options);
        if (secteurActivite) {
            await secteurActivite.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "SecteurActivite supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "SecteurActivite non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<SecteurActivite>> = {}

        await SecteurActivite.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
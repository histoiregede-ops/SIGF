import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { NatureTypeImmeuble } from "../models/NatureTypeImmeuble";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class NatureTypeImmeubleController {

    constructor() { }

    static async getAllNaturesTypeImmeuble(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let natureTypeImmeubleWhereOptions: WhereOptions<InferAttributes<NatureTypeImmeuble>> = {}

            // Application des filtres
            if (req.query.search) {
                natureTypeImmeubleWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<NatureTypeImmeuble>> = {
                where: natureTypeImmeubleWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<NatureTypeImmeuble>> = {
                where: natureTypeImmeubleWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const naturesTypeImmeubleCount: number = await NatureTypeImmeuble.count(countOptions)
                let naturesTypeImmeuble: NatureTypeImmeuble[] = await NatureTypeImmeuble.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<NatureTypeImmeuble>(naturesTypeImmeuble, naturesTypeImmeubleCount, page, limit)
                );
            }
            else {
                let naturesTypeImmeuble: NatureTypeImmeuble[];
                naturesTypeImmeuble = await NatureTypeImmeuble.findAll(options);

                return res.status(200).send(naturesTypeImmeuble);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getNatureTypeImmeuble(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<NatureTypeImmeuble>> = {}
        options = {
            where: { id: req.params.id },
        }

        try {
            const natureTypeImmeuble: NatureTypeImmeuble | null = await NatureTypeImmeuble.findOne(options);

            if (natureTypeImmeuble == null)
                return res.status(404).json({ success: false, message: "NatureTypeImmeuble non trouvée" });

            return res.status(200).send(natureTypeImmeuble);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createNatureTypeImmeuble(req: Request, res: Response): Promise<any> {

        let natureTypeImmeuble: NatureTypeImmeuble | null = await NatureTypeImmeuble.findOne({ where: { libelle: req.body.libelle } });

        if (natureTypeImmeuble != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let natureTypeImmeuble: NatureTypeImmeuble = new NatureTypeImmeuble();
            natureTypeImmeuble.libelle = req.body.libelle
            natureTypeImmeuble.description = req.body.description

            await natureTypeImmeuble.save()
                .then((natureTypeImmeuble) => {
                    return res.status(201).send(natureTypeImmeuble);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateNatureTypeImmeuble(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<NatureTypeImmeuble>> = { where: { id: req.params.id } }

        let natureTypeImmeuble: NatureTypeImmeuble | null = await NatureTypeImmeuble.findOne(options);
        if (natureTypeImmeuble != null) {

            let verificationNatureTypeImmeuble: NatureTypeImmeuble | null = await NatureTypeImmeuble.findOne({ where: { libelle: req.body.libelle } })
            if (verificationNatureTypeImmeuble != null && verificationNatureTypeImmeuble.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await natureTypeImmeuble.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                })
                    .then(async (natureTypeImmeuble) => {
                        return res.status(200).send(natureTypeImmeuble);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "NatureTypeImmeuble non trouvée" });
        }

        return null
    }

    static async deleteNatureTypeImmeuble(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<NatureTypeImmeuble>> = { where: { id: req.params.id } }

        let natureTypeImmeuble: NatureTypeImmeuble | null = await NatureTypeImmeuble.findOne(options);
        if (natureTypeImmeuble) {
            await natureTypeImmeuble.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "NatureTypeImmeuble supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "NatureTypeImmeuble non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<NatureTypeImmeuble>> = {}

        await NatureTypeImmeuble.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
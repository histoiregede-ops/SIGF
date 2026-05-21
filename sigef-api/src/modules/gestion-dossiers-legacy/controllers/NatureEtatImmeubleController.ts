import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { NatureEtatImmeuble } from "../models/NatureEtatImmeuble";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class NatureEtatImmeubleController {

    constructor() { }

    static async getAllNaturesEtatsImmeuble(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let natureEtatImmeubleWhereOptions: WhereOptions<InferAttributes<NatureEtatImmeuble>> = {}

            // Application des filtres
            if (req.query.search) {
                natureEtatImmeubleWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<NatureEtatImmeuble>> = {
                where: natureEtatImmeubleWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<NatureEtatImmeuble>> = {
                where: natureEtatImmeubleWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const naturesEtatsImmeubleCount: number = await NatureEtatImmeuble.count(countOptions)
                let naturesEtatsImmeuble: NatureEtatImmeuble[] = await NatureEtatImmeuble.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<NatureEtatImmeuble>(naturesEtatsImmeuble, naturesEtatsImmeubleCount, page, limit)
                );
            }
            else {
                let naturesEtatsImmeuble: NatureEtatImmeuble[];
                naturesEtatsImmeuble = await NatureEtatImmeuble.findAll(options);

                return res.status(200).send(naturesEtatsImmeuble);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getNatureEtatImmeuble(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<NatureEtatImmeuble>> = {}
        options = {
            where: { id: req.params.id },
        }

        try {
            const natureEtatImmeuble: NatureEtatImmeuble | null = await NatureEtatImmeuble.findOne(options);

            if (natureEtatImmeuble == null)
                return res.status(404).json({ success: false, message: "NatureEtatImmeuble non trouvée" });

            return res.status(200).send(natureEtatImmeuble);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createNatureEtatImmeuble(req: Request, res: Response): Promise<any> {

        let natureEtatImmeuble: NatureEtatImmeuble | null = await NatureEtatImmeuble.findOne({ where: { libelle: req.body.libelle } });

        if (natureEtatImmeuble != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let natureEtatImmeuble: NatureEtatImmeuble = new NatureEtatImmeuble();
            natureEtatImmeuble.libelle = req.body.libelle
            natureEtatImmeuble.description = req.body.description

            await natureEtatImmeuble.save()
                .then((natureEtatImmeuble) => {
                    return res.status(201).send(natureEtatImmeuble);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateNatureEtatImmeuble(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<NatureEtatImmeuble>> = { where: { id: req.params.id } }

        let natureEtatImmeuble: NatureEtatImmeuble | null = await NatureEtatImmeuble.findOne(options);
        if (natureEtatImmeuble != null) {

            let verificationNatureEtatImmeuble: NatureEtatImmeuble | null = await NatureEtatImmeuble.findOne({ where: { libelle: req.body.libelle } })
            if (verificationNatureEtatImmeuble != null && verificationNatureEtatImmeuble.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await natureEtatImmeuble.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                })
                    .then(async (natureEtatImmeuble) => {
                        return res.status(200).send(natureEtatImmeuble);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "NatureEtatImmeuble non trouvée" });
        }

        return null
    }

    static async deleteNatureEtatImmeuble(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<NatureEtatImmeuble>> = { where: { id: req.params.id } }

        let natureEtatImmeuble: NatureEtatImmeuble | null = await NatureEtatImmeuble.findOne(options);
        if (natureEtatImmeuble) {
            await natureEtatImmeuble.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "NatureEtatImmeuble supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "NatureEtatImmeuble non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<NatureEtatImmeuble>> = {}

        await NatureEtatImmeuble.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
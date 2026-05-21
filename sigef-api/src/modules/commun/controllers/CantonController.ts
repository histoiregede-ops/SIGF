import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { Canton } from "../models/Canton";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class CantonController {

    constructor() { }

    static async getAllCantons(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let cantonWhereOptions: WhereOptions<InferAttributes<Canton>> = {}

            // Application des filtres
            if (req.query.communeId) cantonWhereOptions.communeId = req.query.communeId as string;
            else if (req.query.commune) cantonWhereOptions.communeId = req.query.commune as string;
            if (req.query.search) {
                cantonWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<Canton>> = {
                where: cantonWhereOptions,
                order: [['createdAt', 'DESC']],
                include: Canton.associations.commune,
            }

            let countOptions: CountOptions<InferAttributes<Canton>> = {
                where: cantonWhereOptions,
                include: Canton.associations.commune,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const cantonsCount: number = await Canton.count(countOptions)
                let cantons: Canton[] = await Canton.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Canton>(cantons, cantonsCount, page, limit)
                );
            }
            else {
                let cantons: Canton[];
                cantons = await Canton.findAll(options);

                return res.status(200).send(cantons);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getCanton(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Canton>> = {}
        options = {
            where: { id: req.params.id },
            include: [Canton.associations.commune]
        }

        try {
            const canton: Canton | null = await Canton.findOne(options);

            if (canton == null)
                return res.status(404).json({ success: false, message: "Canton non trouvée" });

            return res.status(200).send(canton);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createCanton(req: Request, res: Response): Promise<any> {

        let canton: Canton | null = await Canton.findOne({ where: { libelle: req.body.libelle } });

        if (canton != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let canton: Canton = new Canton();
            canton.libelle = req.body.libelle
            canton.description = req.body.description
            canton.communeId = req.body.communeId

            await canton.save()
                .then((canton) => {
                    return res.status(201).send(canton);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateCanton(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Canton>> = { where: { id: req.params.id } }

        let canton: Canton | null = await Canton.findOne(options);
        if (canton != null) {

            let verificationCanton: Canton | null = await Canton.findOne({ where: { libelle: req.body.libelle } })
            if (verificationCanton != null && verificationCanton.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await canton.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                    communeId: req.body.communeId,
                })
                    .then(async (canton) => {
                        return res.status(200).send(canton);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "Canton non trouvée" });
        }

        return null
    }

    static async deleteCanton(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Canton>> = { where: { id: req.params.id } }

        let canton: Canton | null = await Canton.findOne(options);
        if (canton) {
            await canton.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Canton supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Canton non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Canton>> = {}

        await Canton.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
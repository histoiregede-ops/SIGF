import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { TypeRelationLegale } from "../models/TypeRelationLegale";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class TypeRelationLegaleController {

    constructor() { }

    static async getAllTypesRelationLegale(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let typeRelationLegaleWhereOptions: WhereOptions<InferAttributes<TypeRelationLegale>> = {}

            // Application des filtres
            if (req.query.search) {
                typeRelationLegaleWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<TypeRelationLegale>> = {
                where: typeRelationLegaleWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<TypeRelationLegale>> = {
                where: typeRelationLegaleWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const typesRelationLegaleCount: number = await TypeRelationLegale.count(countOptions)
                let typesRelationLegale: TypeRelationLegale[] = await TypeRelationLegale.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<TypeRelationLegale>(typesRelationLegale, typesRelationLegaleCount, page, limit)
                );
            }
            else {
                let typesRelationLegale: TypeRelationLegale[];
                typesRelationLegale = await TypeRelationLegale.findAll(options);

                return res.status(200).send(typesRelationLegale);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getTypeRelationLegale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TypeRelationLegale>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const typeRelationLegale: TypeRelationLegale | null = await TypeRelationLegale.findOne(options);

            if (typeRelationLegale == null)
                return res.status(404).json({ success: false, message: "TypeRelationLegale non trouvée" });

            return res.status(200).send(typeRelationLegale);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createTypeRelationLegale(req: Request, res: Response): Promise<any> {

        let typeRelationLegale: TypeRelationLegale | null = await TypeRelationLegale.findOne({ where: { libelle: req.body.libelle } });

        if (typeRelationLegale != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let typeRelationLegale: TypeRelationLegale = new TypeRelationLegale();
            typeRelationLegale.libelle = req.body.libelle
            typeRelationLegale.description = req.body.description

            await typeRelationLegale.save()
                .then((typeRelationLegale) => {
                    return res.status(201).send(typeRelationLegale);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateTypeRelationLegale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TypeRelationLegale>> = { where: { id: req.params.id } }

        let typeRelationLegale: TypeRelationLegale | null = await TypeRelationLegale.findOne(options);
        if (typeRelationLegale != null) {

            let verificationTypeRelationLegale: TypeRelationLegale | null = await TypeRelationLegale.findOne({ where: { libelle: req.body.libelle } })
            if (verificationTypeRelationLegale != null && verificationTypeRelationLegale.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await typeRelationLegale.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                })
                    .then(async (typeRelationLegale) => {
                        return res.status(200).send(typeRelationLegale);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "TypeRelationLegale non trouvée" });
        }

        return null
    }

    static async deleteTypeRelationLegale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TypeRelationLegale>> = { where: { id: req.params.id } }

        let typeRelationLegale: TypeRelationLegale | null = await TypeRelationLegale.findOne(options);
        if (typeRelationLegale) {
            await typeRelationLegale.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "TypeRelationLegale supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "TypeRelationLegale non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<TypeRelationLegale>> = {}

        await TypeRelationLegale.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
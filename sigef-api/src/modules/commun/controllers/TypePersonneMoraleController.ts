import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { TypePersonneMorale } from "../models/TypePersonneMorale";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class TypePersonneMoraleController {

    constructor() { }

    static async getAllTypesPersonneMorale(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let typePersonneMoraleWhereOptions: WhereOptions<InferAttributes<TypePersonneMorale>> = {}

            // Application des filtres
            if (req.query.search) {
                typePersonneMoraleWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<TypePersonneMorale>> = {
                where: typePersonneMoraleWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<TypePersonneMorale>> = {
                where: typePersonneMoraleWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const typesPersonneMoraleCount: number = await TypePersonneMorale.count(countOptions)
                let typesPersonneMorale: TypePersonneMorale[] = await TypePersonneMorale.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<TypePersonneMorale>(typesPersonneMorale, typesPersonneMoraleCount, page, limit)
                );
            }
            else {
                let typesPersonneMorale: TypePersonneMorale[];
                typesPersonneMorale = await TypePersonneMorale.findAll(options);

                return res.status(200).send(typesPersonneMorale);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getTypePersonneMorale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TypePersonneMorale>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const typePersonneMorale: TypePersonneMorale | null = await TypePersonneMorale.findOne(options);

            if (typePersonneMorale == null)
                return res.status(404).json({ success: false, message: "TypePersonneMorale non trouvée" });

            return res.status(200).send(typePersonneMorale);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createTypePersonneMorale(req: Request, res: Response): Promise<any> {

        let typePersonneMorale: TypePersonneMorale | null = await TypePersonneMorale.findOne({ where: { libelle: req.body.libelle } });

        if (typePersonneMorale != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let typePersonneMorale: TypePersonneMorale = new TypePersonneMorale();
            typePersonneMorale.libelle = req.body.libelle
            typePersonneMorale.description = req.body.description

            await typePersonneMorale.save()
                .then((typePersonneMorale) => {
                    return res.status(201).send(typePersonneMorale);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateTypePersonneMorale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TypePersonneMorale>> = { where: { id: req.params.id } }

        let typePersonneMorale: TypePersonneMorale | null = await TypePersonneMorale.findOne(options);
        if (typePersonneMorale != null) {

            let verificationTypePersonneMorale: TypePersonneMorale | null = await TypePersonneMorale.findOne({ where: { libelle: req.body.libelle } })
            if (verificationTypePersonneMorale != null && verificationTypePersonneMorale.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await typePersonneMorale.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                })
                    .then(async (typePersonneMorale) => {
                        return res.status(200).send(typePersonneMorale);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "TypePersonneMorale non trouvée" });
        }

        return null
    }

    static async deleteTypePersonneMorale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TypePersonneMorale>> = { where: { id: req.params.id } }

        let typePersonneMorale: TypePersonneMorale | null = await TypePersonneMorale.findOne(options);
        if (typePersonneMorale) {
            await typePersonneMorale.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "TypePersonneMorale supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "TypePersonneMorale non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<TypePersonneMorale>> = {}

        await TypePersonneMorale.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
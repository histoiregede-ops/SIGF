import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { TypeDepot } from "../models/TypeDepot";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class TypeDepotController {

    constructor() { }

    static async getAllTypesDepot(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let typeDepotWhereOptions: WhereOptions<InferAttributes<TypeDepot>> = {}

            // Application des filtres
            if (req.query.search) {
                typeDepotWhereOptions[Op.or] = [
                        { libelle: { [Op.like]: `%${req.query.search}%` } },
                        { description: { [Op.like]: `%${req.query.search}%` } },
                    ]
            }

            let options: FindOptions<InferAttributes<TypeDepot>> = {
                where: typeDepotWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<TypeDepot>> = {
                where: typeDepotWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const typesDepotCount: number = await TypeDepot.count(countOptions)
                let typesDepot: TypeDepot[] = await TypeDepot.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<TypeDepot>(typesDepot, typesDepotCount, page, limit)
                );
            }
            else {
                let typesDepot: TypeDepot[];
                typesDepot = await TypeDepot.findAll(options);

                return res.status(200).send(typesDepot);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getTypeDepot(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TypeDepot>> = {}
        options = {
            where: { id: req.params.id },
        }

        try {
            const typeDepot: TypeDepot | null = await TypeDepot.findOne(options);

            if (typeDepot == null)
                return res.status(404).json({ success: false, message: "TypeDepot non trouvée" });

            return res.status(200).send(typeDepot);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createTypeDepot(req: Request, res: Response): Promise<any> {

        let typeDepot: TypeDepot | null = await TypeDepot.findOne({ where: { libelle: req.body.libelle } });

        if (typeDepot != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let typeDepot: TypeDepot = new TypeDepot();
            typeDepot.libelle = req.body.libelle
            typeDepot.description = req.body.description

            await typeDepot.save()
                .then((typeDepot) => {
                    return res.status(201).send(typeDepot);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateTypeDepot(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TypeDepot>> = { where: { id: req.params.id } }

        let typeDepot: TypeDepot | null = await TypeDepot.findOne(options);
        if (typeDepot != null) {

            let verificationTypeDepot: TypeDepot | null = await TypeDepot.findOne({ where: { libelle: req.body.libelle } })
            if (verificationTypeDepot != null && verificationTypeDepot.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await typeDepot.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                })
                    .then(async (typeDepot) => {
                        return res.status(200).send(typeDepot);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "TypeDepot non trouvée" });
        }

        return null
    }

    static async deleteTypeDepot(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TypeDepot>> = { where: { id: req.params.id } }

        let typeDepot: TypeDepot | null = await TypeDepot.findOne(options);
        if (typeDepot) {
            await typeDepot.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "TypeDepot supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "TypeDepot non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<TypeDepot>> = {}

        await TypeDepot.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { TypeLienGroupe } from "../models/TypeLienGroupe";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class TypeLienGroupeController {

    constructor() { }

    static async getAllTypesLienGroupe(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let typeLienGroupeWhereOptions: WhereOptions<InferAttributes<TypeLienGroupe>> = {}

            // Application des filtres
            if (req.query.search) {
                typeLienGroupeWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<TypeLienGroupe>> = {
                where: typeLienGroupeWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<TypeLienGroupe>> = {
                where: typeLienGroupeWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const typesLienGroupeCount: number = await TypeLienGroupe.count(countOptions)
                let typesLienGroupe: TypeLienGroupe[] = await TypeLienGroupe.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<TypeLienGroupe>(typesLienGroupe, typesLienGroupeCount, page, limit)
                );
            }
            else {
                let typesLienGroupe: TypeLienGroupe[];
                typesLienGroupe = await TypeLienGroupe.findAll(options);

                return res.status(200).send(typesLienGroupe);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getTypeLienGroupe(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TypeLienGroupe>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const typeLienGroupe: TypeLienGroupe | null = await TypeLienGroupe.findOne(options);

            if (typeLienGroupe == null)
                return res.status(404).json({ success: false, message: "TypeLienGroupe non trouvée" });

            return res.status(200).send(typeLienGroupe);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createTypeLienGroupe(req: Request, res: Response): Promise<any> {

        let typeLienGroupe: TypeLienGroupe | null = await TypeLienGroupe.findOne({ where: { libelle: req.body.libelle } });

        if (typeLienGroupe != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let typeLienGroupe: TypeLienGroupe = new TypeLienGroupe();
            typeLienGroupe.libelle = req.body.libelle
            typeLienGroupe.description = req.body.description

            await typeLienGroupe.save()
                .then((typeLienGroupe) => {
                    return res.status(201).send(typeLienGroupe);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateTypeLienGroupe(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TypeLienGroupe>> = { where: { id: req.params.id } }

        let typeLienGroupe: TypeLienGroupe | null = await TypeLienGroupe.findOne(options);
        if (typeLienGroupe != null) {

            let verificationTypeLienGroupe: TypeLienGroupe | null = await TypeLienGroupe.findOne({ where: { libelle: req.body.libelle } })
            if (verificationTypeLienGroupe != null && verificationTypeLienGroupe.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await typeLienGroupe.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                })
                    .then(async (typeLienGroupe) => {
                        return res.status(200).send(typeLienGroupe);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "TypeLienGroupe non trouvée" });
        }

        return null
    }

    static async deleteTypeLienGroupe(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TypeLienGroupe>> = { where: { id: req.params.id } }

        let typeLienGroupe: TypeLienGroupe | null = await TypeLienGroupe.findOne(options);
        if (typeLienGroupe) {
            await typeLienGroupe.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "TypeLienGroupe supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "TypeLienGroupe non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<TypeLienGroupe>> = {}

        await TypeLienGroupe.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
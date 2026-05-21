import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { TypeOperationPostImmatriculation } from "../models/TypeOperationPostImmatriculation";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class TypeOperationPostImmatriculationController {

    constructor() { }

    static async getAllTypesOperationPostImmatriculation(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let typeOperationPostImmatriculationWhereOptions: WhereOptions<InferAttributes<TypeOperationPostImmatriculation>> = {}

            // Application des filtres
            if (req.query.search) {
                typeOperationPostImmatriculationWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<TypeOperationPostImmatriculation>> = {
                where: typeOperationPostImmatriculationWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<TypeOperationPostImmatriculation>> = {
                where: typeOperationPostImmatriculationWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const typesOperationPostImmatriculationCount: number = await TypeOperationPostImmatriculation.count(countOptions)
                let typesOperationPostImmatriculation: TypeOperationPostImmatriculation[] = await TypeOperationPostImmatriculation.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<TypeOperationPostImmatriculation>(typesOperationPostImmatriculation, typesOperationPostImmatriculationCount, page, limit)
                );
            }
            else {
                let typesOperationPostImmatriculation: TypeOperationPostImmatriculation[];
                typesOperationPostImmatriculation = await TypeOperationPostImmatriculation.findAll(options);

                return res.status(200).send(typesOperationPostImmatriculation);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getTypeOperationPostImmatriculation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TypeOperationPostImmatriculation>> = {}
        options = {
            where: { id: req.params.id },
        }

        try {
            const typeOperationPostImmatriculation: TypeOperationPostImmatriculation | null = await TypeOperationPostImmatriculation.findOne(options);

            if (typeOperationPostImmatriculation == null)
                return res.status(404).json({ success: false, message: "TypeOperationPostImmatriculation non trouvée" });

            return res.status(200).send(typeOperationPostImmatriculation);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createTypeOperationPostImmatriculation(req: Request, res: Response): Promise<any> {

        let typeOperationPostImmatriculation: TypeOperationPostImmatriculation | null = await TypeOperationPostImmatriculation.findOne({ where: { libelle: req.body.libelle } });

        if (typeOperationPostImmatriculation != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let typeOperationPostImmatriculation: TypeOperationPostImmatriculation = new TypeOperationPostImmatriculation();
            typeOperationPostImmatriculation.libelle = req.body.libelle
            typeOperationPostImmatriculation.description = req.body.description

            await typeOperationPostImmatriculation.save()
                .then((typeOperationPostImmatriculation) => {
                    return res.status(201).send(typeOperationPostImmatriculation);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateTypeOperationPostImmatriculation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TypeOperationPostImmatriculation>> = { where: { id: req.params.id } }

        let typeOperationPostImmatriculation: TypeOperationPostImmatriculation | null = await TypeOperationPostImmatriculation.findOne(options);
        if (typeOperationPostImmatriculation != null) {

            let verificationTypeOperationPostImmatriculation: TypeOperationPostImmatriculation | null = await TypeOperationPostImmatriculation.findOne({ where: { libelle: req.body.libelle } })
            if (verificationTypeOperationPostImmatriculation != null && verificationTypeOperationPostImmatriculation.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await typeOperationPostImmatriculation.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                })
                    .then(async (typeOperationPostImmatriculation) => {
                        return res.status(200).send(typeOperationPostImmatriculation);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "TypeOperationPostImmatriculation non trouvée" });
        }

        return null
    }

    static async deleteTypeOperationPostImmatriculation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TypeOperationPostImmatriculation>> = { where: { id: req.params.id } }

        let typeOperationPostImmatriculation: TypeOperationPostImmatriculation | null = await TypeOperationPostImmatriculation.findOne(options);
        if (typeOperationPostImmatriculation) {
            await typeOperationPostImmatriculation.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "TypeOperationPostImmatriculation supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "TypeOperationPostImmatriculation non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<TypeOperationPostImmatriculation>> = {}

        await TypeOperationPostImmatriculation.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
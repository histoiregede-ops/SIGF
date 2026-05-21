import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { DirectionLimite } from "../models/DirectionLimite";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class DirectionLimiteController {

    constructor() { }

    static async getAllDirectionsLimite(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let directionLimiteWhereOptions: WhereOptions<InferAttributes<DirectionLimite>> = {}

            // Application des filtres
            if (req.query.search) {
                directionLimiteWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { abbreviation: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<DirectionLimite>> = {
                where: directionLimiteWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<DirectionLimite>> = {
                where: directionLimiteWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const directionsLimiteCount: number = await DirectionLimite.count(countOptions)
                let directionsLimite: DirectionLimite[] = await DirectionLimite.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<DirectionLimite>(directionsLimite, directionsLimiteCount, page, limit)
                );
            }
            else {
                let directionsLimite: DirectionLimite[];
                directionsLimite = await DirectionLimite.findAll(options);

                return res.status(200).send(directionsLimite);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getDirectionLimite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DirectionLimite>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const directionlimite: DirectionLimite | null = await DirectionLimite.findOne(options);

            if (directionlimite == null)
                return res.status(404).json({ success: false, message: "DirectionLimite non trouvée" });

            return res.status(200).send(directionlimite);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createDirectionLimite(req: Request, res: Response): Promise<any> {

        let directionlimite: DirectionLimite | null = await DirectionLimite.findOne({ where: { libelle: req.body.libelle } });

        if (directionlimite != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let directionlimite: DirectionLimite = new DirectionLimite();
            directionlimite.libelle = req.body.libelle
            directionlimite.abbreviation = req.body.abbreviation
            directionlimite.description = req.body.description

            await directionlimite.save()
                .then((directionlimite) => {
                    return res.status(201).send(directionlimite);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateDirectionLimite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DirectionLimite>> = { where: { id: req.params.id } }

        let directionlimite: DirectionLimite | null = await DirectionLimite.findOne(options);
        if (directionlimite != null) {

            let verificationDirectionLimite: DirectionLimite | null = await DirectionLimite.findOne({ where: { libelle: req.body.libelle } })
            if (verificationDirectionLimite != null && verificationDirectionLimite.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await directionlimite.update({
                    libelle: req.body.libelle,
                    abbreviation: req.body.abbreviation,
                    description: req.body.description,
                })
                    .then(async (directionlimite) => {
                        return res.status(200).send(directionlimite);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "DirectionLimite non trouvée" });
        }

        return null
    }

    static async deleteDirectionLimite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DirectionLimite>> = { where: { id: req.params.id } }

        let directionlimite: DirectionLimite | null = await DirectionLimite.findOne(options);
        if (directionlimite) {
            await directionlimite.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "DirectionLimite supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "DirectionLimite non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<DirectionLimite>> = {}

        await DirectionLimite.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
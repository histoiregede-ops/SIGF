import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { Village } from "../models/Village";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class VillageController {

    constructor() { }

    static async getAllVillages(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let villageWhereOptions: WhereOptions<InferAttributes<Village>> = {}

            // Application des filtres
            if (req.query.cantonId) villageWhereOptions.cantonId = req.query.cantonId as string;
            else if (req.query.canton) villageWhereOptions.cantonId = req.query.canton as string;
            if (req.query.search) {
                villageWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<Village>> = {
                where: villageWhereOptions,
                order: [['createdAt', 'DESC']],
                include: Village.associations.canton,
            }

            let countOptions: CountOptions<InferAttributes<Village>> = {
                where: villageWhereOptions,
                include: Village.associations.canton,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const villagesCount: number = await Village.count(countOptions)
                let villages: Village[] = await Village.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Village>(villages, villagesCount, page, limit)
                );
            }
            else {
                let villages: Village[];
                villages = await Village.findAll(options);

                return res.status(200).send(villages);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getVillage(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Village>> = {}
        options = {
            where: { id: req.params.id },
            include: [Village.associations.canton]
        }

        try {
            const village: Village | null = await Village.findOne(options);

            if (village == null)
                return res.status(404).json({ success: false, message: "Village non trouvée" });

            return res.status(200).send(village);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createVillage(req: Request, res: Response): Promise<any> {

        let village: Village | null = await Village.findOne({ where: { libelle: req.body.libelle } });

        if (village != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let village: Village = new Village();
            village.libelle = req.body.libelle
            village.description = req.body.description
            village.cantonId = req.body.cantonId

            await village.save()
                .then((village) => {
                    return res.status(201).send(village);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateVillage(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Village>> = { where: { id: req.params.id } }

        let village: Village | null = await Village.findOne(options);
        if (village != null) {

            let verificationVillage: Village | null = await Village.findOne({ where: { libelle: req.body.libelle } })
            if (verificationVillage != null && verificationVillage.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await village.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                    cantonId: req.body.cantonId,
                })
                    .then(async (village) => {
                        return res.status(200).send(village);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "Village non trouvée" });
        }

        return null
    }

    static async deleteVillage(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Village>> = { where: { id: req.params.id } }

        let village: Village | null = await Village.findOne(options);
        if (village) {
            await village.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Village supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Village non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Village>> = {}

        await Village.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
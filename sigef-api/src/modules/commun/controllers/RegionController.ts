import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes, Op, WhereOptions } from "sequelize";
import { Region } from "../models/Region";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { DataTypeUtils } from "../../../core/helpers/DataTypeUtils";

export default class RegionController {

    constructor() { }

    static async getAllRegions(req: Request, res: Response): Promise<void> {

        console.log('getAllRegions called with query:', req.query)

        try {
            // Filtres de l'utilisateur
            let regionWhereOptions: WhereOptions<InferAttributes<Region>> = {}

            // Application des filtres
            if (DataTypeUtils.getInstance().booleanFromString(req.query.actuelle as string) != undefined) regionWhereOptions.actuelle = DataTypeUtils.getInstance().booleanFromString(req.query.actuelle as string);
            if (req.query.periode) regionWhereOptions.periodeId = req.query.periode as string;
            if (req.query.search) {
                regionWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { sigle: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            console.log('Region where options:', regionWhereOptions)
            console.log('GET_INCLUDES:', RegionController.GET_INCLUDES)

            let options: FindOptions<InferAttributes<Region>> = {
                where: regionWhereOptions,
                order: [['createdAt', 'DESC']],
                // include: RegionController.GET_INCLUDES, // Temporarily commented out
            }

            let countOptions: CountOptions<InferAttributes<Region>> = {
                where: regionWhereOptions,
                // include: RegionController.GET_INCLUDES, // Temporarily commented out
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const regionsCount: number = await Region.count(countOptions)
                let regions: Region[] = await Region.findAll(options);

                res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Region>(regions, regionsCount, page, limit)
                );
            }
            else {
                let regions: Region[];
                regions = await Region.findAll(options);

                res.status(200).send(regions);
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error });
        }
    }

    static async getRegion(req: Request, res: Response): Promise<void> {
        let options: FindOptions<InferAttributes<Region>> = {}
        options = {
            where: { id: req.params.id },
            // include: RegionController.GET_INCLUDES // Temporarily commented out
        }

        try {
            const region: Region | null = await Region.findOne(options);

            if (region == null)
                res.status(404).json({ success: false, message: "Region non trouvée" });
            else
                res.status(200).send(region);
        } catch (error) {
            res.status(500).json({ success: false, error: error });
        }
    }

    static async createRegion(req: Request, res: Response): Promise<void> {

        let region: Region | null = await Region.findOne({ where: { [Op.or]: [{ libelle: req.body.libelle }, { sigle: req.body.sigle }] } });

        if (region != null) {
            res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let region: Region = new Region();
            region.libelle = req.body.libelle
            region.sigle = req.body.sigle
            region.actuelle = req.body.actuelle
            region.periodeId = req.body.periodeId

            await region.save()
                .then((region) => {
                    res.status(201).send(region);
                })
                .catch((error) => {
                    res.status(400).json({ success: false, error: error });
                });
        }
    }

    static async updateRegion(req: Request, res: Response): Promise<void> {
        let options: FindOptions<InferAttributes<Region>> = { where: { id: req.params.id } }

        let region: Region | null = await Region.findOne(options);
        if (region != null) {

            let verificationRegion: Region | null = await Region.findOne({ where: { [Op.or]: [{ libelle: req.body.libelle }, { sigle: req.body.sigle }] } })
            if (verificationRegion != null && verificationRegion.libelle != req.body.libelle) {
                res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await region.update({
                    libelle: req.body.libelle,
                    sigle: req.body.sigle,
                    actuelle: req.body.actuelle,
                    periodeId: req.body.periodeId,
                })
                    .then(async (region) => {
                        res.status(200).send(region);
                    })
                    .catch((error) => {
                        res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            res.status(404).json({ success: false, message: "Region non trouvée" });
        }
    }

    static async deleteRegion(req: Request, res: Response): Promise<void> {
        let options: FindOptions<InferAttributes<Region>> = { where: { id: req.params.id } }

        let region: Region | null = await Region.findOne(options);
        if (region) {
            await region.destroy()
                .then(() => {
                    res.status(200).json({ success: true, message: "Region supprimée" });
                })
                .catch((error) => {
                    res.status(500).json({ success: false, error: error });
                });
        }
        else {
            res.status(404).json({ success: false, message: "Region non trouvée" });
        }
    }

    static async getCount(req: Request, res: Response): Promise<void> {
        let options: CountOptions<InferAttributes<Region>> = {}

        await Region.count(options)
            .then((value) => {
                res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                res.status(500).json({ success: false, error: error });
            });
    }

    static GET_INCLUDES: Includeable[] = [Region.associations.periode]
}

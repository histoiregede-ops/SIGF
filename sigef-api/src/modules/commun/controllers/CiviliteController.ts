import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { Civilite } from "../models/Civilite";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { SexesPersonnePhysique } from "../../../core/enums/SexesPersonnePhysique";

export default class CiviliteController {

    constructor() { }

    static async getAllCivilites(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let civiliteWhereOptions: WhereOptions<InferAttributes<Civilite>> = {}

            // Application des filtres
            if (req.query.sexe) civiliteWhereOptions.sexe = req.query.sexe as SexesPersonnePhysique;
            if (req.query.search) {
                civiliteWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { abbreviation: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<Civilite>> = {
                where: civiliteWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<Civilite>> = {
                where: civiliteWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const civilitesCount: number = await Civilite.count(countOptions)
                let civilites: Civilite[] = await Civilite.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Civilite>(civilites, civilitesCount, page, limit)
                );
            }
            else {
                let civilites: Civilite[];
                civilites = await Civilite.findAll(options);

                return res.status(200).send(civilites);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getCivilite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Civilite>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const civilite: Civilite | null = await Civilite.findOne(options);

            if (civilite == null)
                return res.status(404).json({ success: false, message: "Civilite non trouvée" });

            return res.status(200).send(civilite);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createCivilite(req: Request, res: Response): Promise<any> {

        let civilite: Civilite | null = await Civilite.findOne({ where: { [Op.or]: [{ libelle: req.body.libelle }, { abbreviation: req.body.abbreviation }] } });

        if (civilite != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let civilite: Civilite = new Civilite();
            civilite.libelle = req.body.libelle
            civilite.abbreviation = req.body.abbreviation
            civilite.sexe = req.body.sexe
            civilite.description = req.body.description

            await civilite.save()
                .then((civilite) => {
                    return res.status(201).send(civilite);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateCivilite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Civilite>> = { where: { id: req.params.id } }

        let civilite: Civilite | null = await Civilite.findOne(options);
        if (civilite != null) {

            let verificationCivilite: Civilite | null = await Civilite.findOne({ where: { [Op.or]: [{ libelle: req.body.libelle }, { abbreviation: req.body.abbreviation }] } })
            if (verificationCivilite != null) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await civilite.update({
                    libelle: req.body.libelle,
                    abbreviation: req.body.abbreviation,
                    sexe: req.body.sexe,
                    description: req.body.description,
                })
                    .then(async (civilite) => {
                        return res.status(200).send(civilite);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "Civilite non trouvée" });
        }

        return null
    }

    static async deleteCivilite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Civilite>> = { where: { id: req.params.id } }

        let civilite: Civilite | null = await Civilite.findOne(options);
        if (civilite) {
            await civilite.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Civilite supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Civilite non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Civilite>> = {}

        await Civilite.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { FormeJuridique } from "../models/FormeJuridique";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { DataTypeUtils } from "../../../core/helpers/DataTypeUtils";

export default class FormeJuridiqueController {

    constructor() { }

    static async getAllFormesJuridiques(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let formeJuridiqueWhereOptions: WhereOptions<InferAttributes<FormeJuridique>> = {}

            // Application des filtres
            if (DataTypeUtils.getInstance().booleanFromString(req.query.declaree as string) != undefined) formeJuridiqueWhereOptions.declaree = DataTypeUtils.getInstance().booleanFromString(req.query.declaree as string);
            if (req.query.search) {
                formeJuridiqueWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { sigle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<FormeJuridique>> = {
                where: formeJuridiqueWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<FormeJuridique>> = {
                where: formeJuridiqueWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const formesJuridiquesCount: number = await FormeJuridique.count(countOptions)
                let formesJuridiques: FormeJuridique[] = await FormeJuridique.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<FormeJuridique>(formesJuridiques, formesJuridiquesCount, page, limit)
                );
            }
            else {
                let formesJuridiques: FormeJuridique[];
                formesJuridiques = await FormeJuridique.findAll(options);

                return res.status(200).send(formesJuridiques);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getFormeJuridique(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<FormeJuridique>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const formeJuridique: FormeJuridique | null = await FormeJuridique.findOne(options);

            if (formeJuridique == null)
                return res.status(404).json({ success: false, message: "FormeJuridique non trouvée" });

            return res.status(200).send(formeJuridique);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createFormeJuridique(req: Request, res: Response): Promise<any> {

        let formeJuridique: FormeJuridique | null = await FormeJuridique.findOne({ where: { libelle: req.body.libelle } });

        if (formeJuridique != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let formeJuridique: FormeJuridique = new FormeJuridique();
            formeJuridique.sigle = req.body.sigle
            formeJuridique.libelle = req.body.libelle
            formeJuridique.declaree = req.body.declaree
            formeJuridique.description = req.body.description

            await formeJuridique.save()
                .then((formeJuridique) => {
                    return res.status(201).send(formeJuridique);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateFormeJuridique(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<FormeJuridique>> = { where: { id: req.params.id } }

        let formeJuridique: FormeJuridique | null = await FormeJuridique.findOne(options);
        if (formeJuridique != null) {

            let verificationFormeJuridique: FormeJuridique | null = await FormeJuridique.findOne({ where: { libelle: req.body.libelle } })
            if (verificationFormeJuridique != null && verificationFormeJuridique.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await formeJuridique.update({
                    sigle: req.body.sigle,
                    libelle: req.body.libelle,
                    declaree: req.body.declaree,
                    description: req.body.description,
                })
                    .then(async (formeJuridique) => {
                        return res.status(200).send(formeJuridique);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "FormeJuridique non trouvée" });
        }

        return null
    }

    static async deleteFormeJuridique(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<FormeJuridique>> = { where: { id: req.params.id } }

        let formeJuridique: FormeJuridique | null = await FormeJuridique.findOne(options);
        if (formeJuridique) {
            await formeJuridique.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "FormeJuridique supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "FormeJuridique non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<FormeJuridique>> = {}

        await FormeJuridique.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
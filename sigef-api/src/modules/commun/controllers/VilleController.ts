import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { Ville } from "../models/Ville";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class VilleController {

    constructor() { }

    static async getAllVilles(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let villeWhereOptions: WhereOptions<InferAttributes<Ville>> = {}

            // Application des filtres
            if (req.query.cantonId) villeWhereOptions.cantonId = req.query.cantonId as string;
            else if (req.query.canton) villeWhereOptions.cantonId = req.query.canton as string;
            if (req.query.search) {
                villeWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<Ville>> = {
                where: villeWhereOptions,
                order: [['createdAt', 'DESC']],
                include: Ville.associations.canton,
            }

            let countOptions: CountOptions<InferAttributes<Ville>> = {
                where: villeWhereOptions,
                include: Ville.associations.canton,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const villesCount: number = await Ville.count(countOptions)
                let villes: Ville[] = await Ville.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Ville>(villes, villesCount, page, limit)
                );
            }
            else {
                let villes: Ville[];
                villes = await Ville.findAll(options);

                return res.status(200).send(villes);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getVille(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Ville>> = {}
        options = {
            where: { id: req.params.id },
            include: [Ville.associations.canton]
        }

        try {
            const ville: Ville | null = await Ville.findOne(options);

            if (ville == null)
                return res.status(404).json({ success: false, message: "Ville non trouvée" });

            return res.status(200).send(ville);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createVille(req: Request, res: Response): Promise<any> {

        let ville: Ville | null = await Ville.findOne({ where: { libelle: req.body.libelle } });

        if (ville != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let ville: Ville = new Ville();
            ville.libelle = req.body.libelle
            ville.description = req.body.description
            ville.cantonId = req.body.cantonId

            await ville.save()
                .then((ville) => {
                    return res.status(201).send(ville);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateVille(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Ville>> = { where: { id: req.params.id } }

        let ville: Ville | null = await Ville.findOne(options);
        if (ville != null) {

            let verificationVille: Ville | null = await Ville.findOne({ where: { libelle: req.body.libelle } })
            if (verificationVille != null && verificationVille.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await ville.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                    cantonId: req.body.cantonId,
                })
                    .then(async (ville) => {
                        return res.status(200).send(ville);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "Ville non trouvée" });
        }

        return null
    }

    static async deleteVille(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Ville>> = { where: { id: req.params.id } }

        let ville: Ville | null = await Ville.findOne(options);
        if (ville) {
            await ville.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Ville supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Ville non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Ville>> = {}

        await Ville.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
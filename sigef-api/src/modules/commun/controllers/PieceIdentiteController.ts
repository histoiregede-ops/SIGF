import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { PieceIdentite } from "../models/PieceIdentite";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { CategoriesPieceIdentite } from "../../../core/enums/CategoriesPieceIdentite";

export default class PieceIdentiteController {

    constructor() { }

    static async getAllPiecesIdentite(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let pieceIdentiteWhereOptions: WhereOptions<InferAttributes<PieceIdentite>> = {}

            // Application des filtres
            if (req.query.categorie) pieceIdentiteWhereOptions.categorie = req.query.categorie as CategoriesPieceIdentite;
            if (req.query.search) {
                pieceIdentiteWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<PieceIdentite>> = {
                where: pieceIdentiteWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<PieceIdentite>> = {
                where: pieceIdentiteWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const pieceIdentitesCount: number = await PieceIdentite.count(countOptions)
                let pieceIdentites: PieceIdentite[] = await PieceIdentite.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<PieceIdentite>(pieceIdentites, pieceIdentitesCount, page, limit)
                );
            }
            else {
                let pieceIdentites: PieceIdentite[];
                pieceIdentites = await PieceIdentite.findAll(options);

                return res.status(200).send(pieceIdentites);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getPieceIdentite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PieceIdentite>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const pieceIdentite: PieceIdentite | null = await PieceIdentite.findOne(options);

            if (pieceIdentite == null)
                return res.status(404).json({ success: false, message: "PieceIdentite non trouvée" });

            return res.status(200).send(pieceIdentite);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createPieceIdentite(req: Request, res: Response): Promise<any> {

        let pieceIdentite: PieceIdentite | null = await PieceIdentite.findOne({ where: { libelle: req.body.libelle } });

        if (pieceIdentite != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let pieceIdentite: PieceIdentite = new PieceIdentite();
            pieceIdentite.libelle = req.body.libelle
            pieceIdentite.description = req.body.description
            pieceIdentite.categorie = req.body.categorie

            await pieceIdentite.save()
                .then((pieceIdentite) => {
                    return res.status(201).send(pieceIdentite);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updatePieceIdentite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PieceIdentite>> = { where: { id: req.params.id } }

        let pieceIdentite: PieceIdentite | null = await PieceIdentite.findOne(options);
        if (pieceIdentite != null) {

            let verificationPieceIdentite: PieceIdentite | null = await PieceIdentite.findOne({ where: { libelle: req.body.libelle } })
            if (verificationPieceIdentite != null && verificationPieceIdentite.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await pieceIdentite.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                    categorie: req.body.categorie,
                })
                    .then(async (pieceIdentite) => {
                        return res.status(200).send(pieceIdentite);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "PieceIdentite non trouvée" });
        }

        return null
    }

    static async deletePieceIdentite(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PieceIdentite>> = { where: { id: req.params.id } }

        let pieceIdentite: PieceIdentite | null = await PieceIdentite.findOne(options);
        if (pieceIdentite) {
            await pieceIdentite.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "PieceIdentite supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PieceIdentite non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<PieceIdentite>> = {}

        await PieceIdentite.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
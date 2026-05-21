import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { Profil } from "../models/Profil";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class ProfilController {

    constructor() { }

    static async getAllProfils(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let profilWhereOptions: WhereOptions<InferAttributes<Profil>> = {}

            // Application des filtres
            if (req.query.search) {
                profilWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<Profil>> = {
                where: profilWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<Profil>> = {
                where: profilWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const profilsCount: number = await Profil.count(countOptions)
                let profils: Profil[] = await Profil.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Profil>(profils, profilsCount, page, limit)
                );
            }
            else {
                let profils: Profil[];
                profils = await Profil.findAll(options);

                return res.status(200).send(profils);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getProfil(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Profil>> = {}
        options = {
            where: { id: req.params.id },
            include: [Profil.associations.roles]
        }

        try {
            const profil: Profil | null = await Profil.findOne(options);

            if (profil == null)
                return res.status(404).json({ success: false, message: "Profil non trouvé" });

            return res.status(200).send(profil);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createProfil(req: Request, res: Response): Promise<any> {

        let profil: Profil | null = await Profil.findOne({ where: { libelle: req.body.libelle } });

        if (profil != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let profil: Profil = new Profil();
            profil.libelle = req.body.libelle
            profil.description = req.body.description

            await profil.save()
                .then((profil) => {
                    return res.status(201).send(profil);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateProfil(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Profil>> = { where: { id: req.params.id } }

        let profil: Profil | null = await Profil.findOne(options);
        if (profil != null) {

            let verificationProfil: Profil | null = await Profil.findOne({ where: { libelle: req.body.libelle } })
            if (verificationProfil != null && verificationProfil.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await profil.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                })
                    .then(async (profil) => {
                        return res.status(200).send(profil);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "Profil non trouvé" });
        }

        return null
    }

    static async deleteProfil(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Profil>> = { where: { id: req.params.id } }

        let profil: Profil | null = await Profil.findOne(options);
        if (profil) {
            await profil.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Profil supprimé" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Profil non trouvé" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Profil>> = {}

        await Profil.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}

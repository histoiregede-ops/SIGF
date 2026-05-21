import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { Profession } from "../models/Profession";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class ProfessionController {

    constructor() { }

    static async getAllProfessions(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let professionWhereOptions: WhereOptions<InferAttributes<Profession>> = {}

            // Application des filtres
            if (req.query.search) {
                professionWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<Profession>> = {
                where: professionWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<Profession>> = {
                where: professionWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const professionsCount: number = await Profession.count(countOptions)
                let professions: Profession[] = await Profession.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Profession>(professions, professionsCount, page, limit)
                );
            }
            else {
                let professions: Profession[];
                professions = await Profession.findAll(options);

                return res.status(200).send(professions);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getProfession(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Profession>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const profession: Profession | null = await Profession.findOne(options);

            if (profession == null)
                return res.status(404).json({ success: false, message: "Profession non trouvée" });

            return res.status(200).send(profession);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createProfession(req: Request, res: Response): Promise<any> {

        let profession: Profession | null = await Profession.findOne({ where: { libelle: req.body.libelle } });

        if (profession != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let profession: Profession = new Profession();
            profession.libelle = req.body.libelle
            profession.description = req.body.description

            await profession.save()
                .then((profession) => {
                    return res.status(201).send(profession);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateProfession(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Profession>> = { where: { id: req.params.id } }

        let profession: Profession | null = await Profession.findOne(options);
        if (profession != null) {

            let verificationProfession: Profession | null = await Profession.findOne({ where: { libelle: req.body.libelle } })
            if (verificationProfession != null && verificationProfession.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await profession.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                })
                    .then(async (profession) => {
                        return res.status(200).send(profession);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "Profession non trouvée" });
        }

        return null
    }

    static async deleteProfession(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Profession>> = { where: { id: req.params.id } }

        let profession: Profession | null = await Profession.findOne(options);
        if (profession) {
            await profession.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Profession supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Profession non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Profession>> = {}

        await Profession.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
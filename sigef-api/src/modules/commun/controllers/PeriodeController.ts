import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { Periode } from "../models/Periode";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class PeriodeController {

    constructor() { }

    static async getAllPeriodes(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let periodeWhereOptions: WhereOptions<InferAttributes<Periode>> = {}

            // Application des filtres
            if (req.query.search) {
                periodeWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<Periode>> = {
                where: periodeWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<Periode>> = {
                where: periodeWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const periodesCount: number = await Periode.count(countOptions)
                let periodes: Periode[] = await Periode.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Periode>(periodes, periodesCount, page, limit)
                );
            }
            else {
                let periodes: Periode[];
                periodes = await Periode.findAll(options);

                return res.status(200).send(periodes);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getPeriode(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Periode>> = {}
        options = {
            where: { id: req.params.id },
            include: [Periode.associations.regions]
        }

        try {
            const periode: Periode | null = await Periode.findOne(options);

            if (periode == null)
                return res.status(404).json({ success: false, message: "Periode non trouvée" });

            return res.status(200).send(periode);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createPeriode(req: Request, res: Response): Promise<any> {

        let periode: Periode | null = await Periode.findOne({ where: { libelle: req.body.libelle } });

        if (periode != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let periode: Periode = new Periode();
            periode.libelle = req.body.libelle

            await periode.save()
                .then((periode) => {
                    return res.status(201).send(periode);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updatePeriode(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Periode>> = { where: { id: req.params.id } }

        let periode: Periode | null = await Periode.findOne(options);
        if (periode != null) {

            let verificationPeriode: Periode | null = await Periode.findOne({ where: { libelle: req.body.libelle } })
            if (verificationPeriode != null && verificationPeriode.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await periode.update({
                    libelle: req.body.libelle,
                })
                    .then(async (periode) => {
                        return res.status(200).send(periode);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "Periode non trouvée" });
        }

        return null
    }

    static async deletePeriode(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Periode>> = { where: { id: req.params.id } }

        let periode: Periode | null = await Periode.findOne(options);
        if (periode) {
            await periode.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Periode supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Periode non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Periode>> = {}

        await Periode.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
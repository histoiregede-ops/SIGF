import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { DivisionEnLot } from "../models/DivisionEnLot";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class DivisionEnLotController {

    constructor() { }

    static async getAllDivisionsEnLots(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let divisionEnLotWhereOptions: WhereOptions<InferAttributes<DivisionEnLot>> = {}

            // Application des filtres
            if (req.query.titreFoncierId) divisionEnLotWhereOptions.titreFoncierId = req.query.titreFoncierId as string;
            if (req.query.mode) divisionEnLotWhereOptions.modeAlienationId = req.query.mode as string;
            if (req.query.search) {
                divisionEnLotWhereOptions[Op.or] = [
                    { situationBatiment: { [Op.like]: `%${req.query.search}%` } },
                    { situationNiveau: { [Op.like]: `%${req.query.search}%` } },
                    { natureDescription: { [Op.like]: `%${req.query.search}%` } },
                    { affectation: { [Op.like]: `%${req.query.search}%` } },
                    { contenance: { [Op.like]: `%${req.query.search}%` } },
                    { mutationTitreFoncier: { [Op.like]: `%${req.query.search}%` } },
                    { extinctionLot: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<DivisionEnLot>> = {
                where: divisionEnLotWhereOptions,
                order: [['createdAt', 'DESC']],
                include: DivisionEnLotController.GET_INCLUDES,
            }

            let countOptions: CountOptions<InferAttributes<DivisionEnLot>> = {
                where: divisionEnLotWhereOptions,
                include: DivisionEnLotController.GET_INCLUDES,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const divisionsEnLotsCount: number = await DivisionEnLot.count(countOptions)
                let divisionsEnLots: DivisionEnLot[] = await DivisionEnLot.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<DivisionEnLot>(divisionsEnLots, divisionsEnLotsCount, page, limit)
                );
            }
            else {
                let divisionsEnLots: DivisionEnLot[];
                divisionsEnLots = await DivisionEnLot.findAll(options);

                return res.status(200).send(divisionsEnLots);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getDivisionEnLot(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DivisionEnLot>> = {}
        options = { where: { id: req.params.id } }

        try {
            const divisionEnLot: DivisionEnLot | null = await DivisionEnLot.findOne(options);

            if (divisionEnLot == null)
                return res.status(404).json({ success: false, message: "DivisionEnLot non trouvée" });

            return res.status(200).send(divisionEnLot);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createDivisionEnLot(req: Request, res: Response): Promise<any> {

        // let divisionEnLot: DivisionEnLot | null = await DivisionEnLot.findOne({ where: { libelle: req.body.libelle } });

        // if (divisionEnLot != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let divisionEnLot: DivisionEnLot = new DivisionEnLot();
        divisionEnLot.numeroLotOuVolume = req.body.numeroLotOuVolume
        divisionEnLot.situationBatiment = req.body.situationBatiment
        divisionEnLot.situationNiveau = req.body.situationNiveau
        divisionEnLot.natureDescription = req.body.natureDescription
        divisionEnLot.affectation = req.body.affectation
        divisionEnLot.contenance = req.body.contenance
        divisionEnLot.quotePartPartiesCommunes = req.body.quotePartPartiesCommunes
        divisionEnLot.valeurLot = req.body.valeurLot
        divisionEnLot.mutationTitreFoncier = req.body.mutationTitreFoncier
        divisionEnLot.extinctionLot = req.body.extinctionLot
        divisionEnLot.modeAlienationId = req.body.modeAlienationId
        divisionEnLot.titreFoncierId = req.body.titreFoncierId

        await divisionEnLot.save()
            .then((divisionEnLot) => {
                return res.status(201).send(divisionEnLot);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updateDivisionEnLot(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DivisionEnLot>> = { where: { id: req.params.id } }

        let divisionEnLot: DivisionEnLot | null = await DivisionEnLot.findOne(options);
        if (divisionEnLot != null) {

            await divisionEnLot.update({
                numeroLotOuVolume: req.body.numeroLotOuVolume,
                situationBatiment: req.body.situationBatiment,
                situationNiveau: req.body.situationNiveau,
                natureDescription: req.body.natureDescription,
                affectation: req.body.affectation,
                contenance: req.body.contenance,
                valeurLot: req.body.valeurLot,
                quotePartPartiesCommunes: req.body.quotePartPartiesCommunes,
                mutationTitreFoncier: req.body.mutationTitreFoncier,
                extinctionLot: req.body.extinctionLot,
                modeAlienationId: req.body.modeAlienationId,
                titreFoncierId: req.body.titreFoncierId,
            })
                .then(async (divisionEnLot) => {
                    return res.status(200).send(divisionEnLot);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "DivisionEnLot non trouvée" });
        }

        return null
    }

    static async deleteDivisionEnLot(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DivisionEnLot>> = { where: { id: req.params.id } }

        let divisionEnLot: DivisionEnLot | null = await DivisionEnLot.findOne(options);
        if (divisionEnLot) {
            await divisionEnLot.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "DivisionEnLot supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "DivisionEnLot non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<DivisionEnLot>> = {}

        await DivisionEnLot.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static GET_INCLUDES = [DivisionEnLot.associations.modeAlienation]
}
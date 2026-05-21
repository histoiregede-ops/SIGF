import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { DivisionEnVolume } from "../models/DivisionEnVolume";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class DivisionEnVolumeController {

    constructor() { }

    static async getAllDivisionsEnVolumes(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let divisionEnVolumeWhereOptions: WhereOptions<InferAttributes<DivisionEnVolume>> = {}

            // Application des filtres
            if (req.query.titreFoncierId) divisionEnVolumeWhereOptions.titreFoncierId = req.query.titreFoncierId as string;
            if (req.query.mode) divisionEnVolumeWhereOptions.modeAlienationId = req.query.mode as string;
            if (req.query.search) {
                divisionEnVolumeWhereOptions[Op.or] = [
                    { situationBatiment: { [Op.like]: `%${req.query.search}%` } },
                    { situationNiveau: { [Op.like]: `%${req.query.search}%` } },
                    { natureDescription: { [Op.like]: `%${req.query.search}%` } },
                    { affectation: { [Op.like]: `%${req.query.search}%` } },
                    { contenance: { [Op.like]: `%${req.query.search}%` } },
                    { mutationTitreFoncier: { [Op.like]: `%${req.query.search}%` } },
                    { extinctionVolume: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<DivisionEnVolume>> = {
                where: divisionEnVolumeWhereOptions,
                order: [['createdAt', 'DESC']],
                include: DivisionEnVolumeController.GET_INCLUDES,
            }

            let countOptions: CountOptions<InferAttributes<DivisionEnVolume>> = {
                where: divisionEnVolumeWhereOptions,
                include: DivisionEnVolumeController.GET_INCLUDES,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const divisionsEnVolumesCount: number = await DivisionEnVolume.count(countOptions)
                let divisionsEnVolumes: DivisionEnVolume[] = await DivisionEnVolume.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<DivisionEnVolume>(divisionsEnVolumes, divisionsEnVolumesCount, page, limit)
                );
            }
            else {
                let divisionsEnVolumes: DivisionEnVolume[];
                divisionsEnVolumes = await DivisionEnVolume.findAll(options);

                return res.status(200).send(divisionsEnVolumes);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getDivisionEnVolume(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DivisionEnVolume>> = {}
        options = { where: { id: req.params.id } }

        try {
            const divisionEnVolume: DivisionEnVolume | null = await DivisionEnVolume.findOne(options);

            if (divisionEnVolume == null)
                return res.status(404).json({ success: false, message: "DivisionEnVolume non trouvée" });

            return res.status(200).send(divisionEnVolume);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createDivisionEnVolume(req: Request, res: Response): Promise<any> {

        // let divisionEnVolume: DivisionEnVolume | null = await DivisionEnVolume.findOne({ where: { libelle: req.body.libelle } });

        // if (divisionEnVolume != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let divisionEnVolume: DivisionEnVolume = new DivisionEnVolume();
        divisionEnVolume.numeroVolume = req.body.numeroVolume
        divisionEnVolume.situationBatiment = req.body.situationBatiment
        divisionEnVolume.situationNiveau = req.body.situationNiveau
        divisionEnVolume.natureDescription = req.body.natureDescription
        divisionEnVolume.affectation = req.body.affectation
        divisionEnVolume.contenance = req.body.contenance
        divisionEnVolume.valeurVolume = req.body.valeurVolume
        divisionEnVolume.mutationTitreFoncier = req.body.mutationTitreFoncier
        divisionEnVolume.extinctionVolume = req.body.extinctionVolume
        divisionEnVolume.modeAlienationId = req.body.modeAlienationId
        divisionEnVolume.titreFoncierId = req.body.titreFoncierId

        await divisionEnVolume.save()
            .then((divisionEnVolume) => {
                return res.status(201).send(divisionEnVolume);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updateDivisionEnVolume(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DivisionEnVolume>> = { where: { id: req.params.id } }

        let divisionEnVolume: DivisionEnVolume | null = await DivisionEnVolume.findOne(options);
        if (divisionEnVolume != null) {

            await divisionEnVolume.update({
                numeroVolume: req.body.numeroVolume,
                situationBatiment: req.body.situationBatiment,
                situationNiveau: req.body.situationNiveau,
                natureDescription: req.body.natureDescription,
                affectation: req.body.affectation,
                contenance: req.body.contenance,
                valeurVolume: req.body.valeurVolume,
                mutationTitreFoncier: req.body.mutationTitreFoncier,
                extinctionVolume: req.body.extinctionVolume,
                modeAlienationId: req.body.modeAlienationId,
                titreFoncierId: req.body.titreFoncierId,
            })
                .then(async (divisionEnVolume) => {
                    return res.status(200).send(divisionEnVolume);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "DivisionEnVolume non trouvée" });
        }

        return null
    }

    static async deleteDivisionEnVolume(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DivisionEnVolume>> = { where: { id: req.params.id } }

        let divisionEnVolume: DivisionEnVolume | null = await DivisionEnVolume.findOne(options);
        if (divisionEnVolume) {
            await divisionEnVolume.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "DivisionEnVolume supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "DivisionEnVolume non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<DivisionEnVolume>> = {}

        await DivisionEnVolume.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static GET_INCLUDES = [DivisionEnVolume.associations.modeAlienation]
}
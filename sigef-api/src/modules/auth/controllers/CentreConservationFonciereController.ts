import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { CentreConservationFonciere } from "../models/CentreConservationFonciere";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class CentreConservationFonciereController {

    constructor() { }

    static async getAllCentresConservationFonciere(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let centreConservationFonciereWhereOptions: WhereOptions<InferAttributes<CentreConservationFonciere>> = {}

            // Application des filtres
            if (req.query.region) centreConservationFonciereWhereOptions.regionId = req.query.region as string;
            if (req.query.search) {
                centreConservationFonciereWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { adresse: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<CentreConservationFonciere>> = {
                where: centreConservationFonciereWhereOptions,
                order: [['createdAt', 'DESC']],
                include: CentreConservationFonciere.associations.region,
            }

            let countOptions: CountOptions<InferAttributes<CentreConservationFonciere>> = {
                where: centreConservationFonciereWhereOptions,
                include: CentreConservationFonciere.associations.region,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const centresConservationFonciereCount: number = await CentreConservationFonciere.count(countOptions)
                let centresConservationFonciere: CentreConservationFonciere[] = await CentreConservationFonciere.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<CentreConservationFonciere>(centresConservationFonciere, centresConservationFonciereCount, page, limit)
                );
            }
            else {
                let centresConservationFonciere: CentreConservationFonciere[];
                centresConservationFonciere = await CentreConservationFonciere.findAll(options);

                return res.status(200).send(centresConservationFonciere);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getCentreConservationFonciere(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<CentreConservationFonciere>> = {}
        options = {
            where: { id: req.params.id },
            include: [CentreConservationFonciere.associations.utilisateurs, CentreConservationFonciere.associations.region]
        }

        try {
            const centreConservationFonciere: CentreConservationFonciere | null = await CentreConservationFonciere.findOne(options);

            if (centreConservationFonciere == null)
                return res.status(404).json({ success: false, message: "CentreConservationFonciere non trouvé" });

            return res.status(200).send(centreConservationFonciere);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createCentreConservationFonciere(req: Request, res: Response): Promise<any> {
        if (!req.body?.libelle) {
            return res.status(400).json({ success: false, message: "Le champ libelle est requis" });
        }

        let centreConservationFonciere: CentreConservationFonciere | null = await CentreConservationFonciere.findOne({ where: { libelle: req.body.libelle } });

        if (centreConservationFonciere != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let centreConservationFonciere: CentreConservationFonciere = new CentreConservationFonciere();
            centreConservationFonciere.libelle = req.body.libelle
            centreConservationFonciere.adresse = req.body.adresse
            centreConservationFonciere.regionId = req.body.regionId

            await centreConservationFonciere.save()
                .then((centreConservationFonciere) => {
                    return res.status(201).send(centreConservationFonciere);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateCentreConservationFonciere(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<CentreConservationFonciere>> = { where: { id: req.params.id } }

        let centreConservationFonciere: CentreConservationFonciere | null = await CentreConservationFonciere.findOne(options);
        if (centreConservationFonciere != null) {
            const nextLibelle = req.body.libelle ?? centreConservationFonciere.libelle;
            const nextAdresse = req.body.adresse ?? centreConservationFonciere.adresse;
            const nextRegionId = req.body.regionId ?? centreConservationFonciere.regionId;

            let verificationCentreConservationFonciere: CentreConservationFonciere | null = await CentreConservationFonciere.findOne({
                where: {
                    [Op.and]: [
                        { id: { [Op.ne]: centreConservationFonciere.id } },
                        { libelle: nextLibelle }
                    ]
                }
            })
            if (verificationCentreConservationFonciere != null) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await centreConservationFonciere.update({
                    libelle: nextLibelle,
                    adresse: nextAdresse,
                    regionId: nextRegionId,
                })
                    .then(async (centreConservationFonciere) => {
                        return res.status(200).send(centreConservationFonciere);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "CentreConservationFonciere non trouvé" });
        }

        return null
    }

    static async deleteCentreConservationFonciere(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<CentreConservationFonciere>> = { where: { id: req.params.id } }

        let centreConservationFonciere: CentreConservationFonciere | null = await CentreConservationFonciere.findOne(options);
        if (centreConservationFonciere) {
            await centreConservationFonciere.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "CentreConservationFonciere supprimé" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "CentreConservationFonciere non trouvé" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<CentreConservationFonciere>> = {}

        await CentreConservationFonciere.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
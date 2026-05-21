import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { Diminution } from "../models/Diminution";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class DiminutionController {

    constructor() { }

    static async getAllDiminutions(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let diminutionWhereOptions: WhereOptions<InferAttributes<Diminution>> = {}

            // Application des filtres
            if (req.query.titreFoncierId) diminutionWhereOptions.titreFoncierId = req.query.titreFoncierId as string;
            if (req.query.mode) diminutionWhereOptions.modeAlienationId = req.query.mode as string;
            if (req.query.dateInscription) diminutionWhereOptions.dateInscription = req.query.dateInscription as string;
            if (req.query.search) {
                diminutionWhereOptions[Op.or] = [
                    { numeroBordereauAnalytique: { [Op.like]: `%${req.query.search}%` } },
                    { designationImmeuble: { [Op.like]: `%${req.query.search}%` } },
                    { numeroTitreAliene: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<Diminution>> = {
                where: diminutionWhereOptions,
                order: [['createdAt', 'DESC']],
                include: DiminutionController.GET_INCLUDES,
            }

            let countOptions: CountOptions<InferAttributes<Diminution>> = {
                where: diminutionWhereOptions,
                include: DiminutionController.GET_INCLUDES,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const diminutionsCount: number = await Diminution.count(countOptions)
                let diminutions: Diminution[] = await Diminution.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Diminution>(diminutions, diminutionsCount, page, limit)
                );
            }
            else {
                let diminutions: Diminution[];
                diminutions = await Diminution.findAll(options);

                return res.status(200).send(diminutions);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getDiminution(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Diminution>> = {}
        options = { where: { id: req.params.id } }

        try {
            const diminution: Diminution | null = await Diminution.findOne(options);

            if (diminution == null)
                return res.status(404).json({ success: false, message: "Diminution non trouvée" });

            return res.status(200).send(diminution);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createDiminution(req: Request, res: Response): Promise<any> {

        // let diminution: Diminution | null = await Diminution.findOne({ where: { libelle: req.body.libelle } });

        // if (diminution != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let diminution: Diminution = new Diminution();
        diminution.numeroBordereauAnalytique = req.body.numeroBordereauAnalytique
        diminution.dateInscription = req.body.dateInscription
        diminution.numeroTitreAliene = req.body.numeroTitreAliene
        diminution.designationImmeuble = req.body.designationImmeuble
        diminution.contenanceParcelleAlieneeEnHectare = req.body.contenanceParcelleAlieneeEnHectare
        diminution.contenanceParcelleAlieneeEnAre = req.body.contenanceParcelleAlieneeEnAre
        diminution.contenanceParcelleAlieneeEnCentiare = req.body.contenanceParcelleAlieneeEnCentiare
        diminution.prixAlienation = req.body.prixAlienation
        diminution.modeAlienationId = req.body.modeAlienationId
        diminution.titreFoncierId = req.body.titreFoncierId

        await diminution.save()
            .then((diminution) => {
                return res.status(201).send(diminution);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updateDiminution(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Diminution>> = { where: { id: req.params.id } }

        let diminution: Diminution | null = await Diminution.findOne(options);
        if (diminution != null) {

            await diminution.update({
                numeroBordereauAnalytique: req.body.numeroBordereauAnalytique,
                dateInscription: req.body.dateInscription,
                numeroTitreAliene: req.body.numeroTitreAliene,
                designationImmeuble: req.body.designationImmeuble,
                contenanceParcelleAlieneeEnHectare: req.body.contenanceParcelleAlieneeEnHectare,
                contenanceParcelleAlieneeEnAre: req.body.contenanceParcelleAlieneeEnAre,
                contenanceParcelleAlieneeEnCentiare: req.body.contenanceParcelleAlieneeEnCentiare,
                prixAlienation: req.body.prixAlienation,
                modeAlienationId: req.body.modeAlienationId,
                titreFoncierId: req.body.titreFoncierId,
            })
                .then(async (diminution) => {
                    return res.status(200).send(diminution);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Diminution non trouvée" });
        }

        return null
    }

    static async deleteDiminution(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Diminution>> = { where: { id: req.params.id } }

        let diminution: Diminution | null = await Diminution.findOne(options);
        if (diminution) {
            await diminution.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Diminution supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Diminution non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Diminution>> = {}

        await Diminution.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static GET_INCLUDES = [Diminution.associations.modeAlienation]
}
import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { Augmentation } from "../models/Augmentation";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class AugmentationController {

    constructor() { }

    static async getAllAugmentations(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let augmentationWhereOptions: WhereOptions<InferAttributes<Augmentation>> = {}

            // Application des filtres
            if (req.query.titreFoncierId) augmentationWhereOptions.titreFoncierId = req.query.titreFoncierId as string;
            if (req.query.mode) augmentationWhereOptions.modeAcquisitionId = req.query.mode as string;
            if (req.query.dateInscription) augmentationWhereOptions.dateInscription = req.query.dateInscription as string;
            if (req.query.search) {
                augmentationWhereOptions[Op.or] = [
                    { numeroBordereauAnalytique: { [Op.like]: `%${req.query.search}%` } },
                    { designationImmeuble: { [Op.like]: `%${req.query.search}%` } },
                    { numeroTitreAcquis: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<Augmentation>> = {
                where: augmentationWhereOptions,
                order: [['createdAt', 'DESC']],
                include: AugmentationController.GET_INCLUDES,
            }

            let countOptions: CountOptions<InferAttributes<Augmentation>> = {
                where: augmentationWhereOptions,
                include: AugmentationController.GET_INCLUDES,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const augmentationsCount: number = await Augmentation.count(countOptions)
                let augmentations: Augmentation[] = await Augmentation.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Augmentation>(augmentations, augmentationsCount, page, limit)
                );
            }
            else {
                let augmentations: Augmentation[];
                augmentations = await Augmentation.findAll(options);

                return res.status(200).send(augmentations);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getAugmentation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Augmentation>> = {}
        options = { where: { id: req.params.id } }

        try {
            const augmentation: Augmentation | null = await Augmentation.findOne(options);

            if (augmentation == null)
                return res.status(404).json({ success: false, message: "Augmentation non trouvée" });

            return res.status(200).send(augmentation);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createAugmentation(req: Request, res: Response): Promise<any> {

        // let augmentation: Augmentation | null = await Augmentation.findOne({ where: { libelle: req.body.libelle } });

        // if (augmentation != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let augmentation: Augmentation = new Augmentation();
        augmentation.numeroBordereauAnalytique = req.body.numeroBordereauAnalytique
        augmentation.dateInscription = req.body.dateInscription
        augmentation.numeroTitreAcquis = req.body.numeroTitreAcquis
        augmentation.designationImmeuble = req.body.designationImmeuble
        augmentation.contenanceImmeubleAcquisEnHectare = req.body.contenanceImmeubleAcquisEnHectare
        augmentation.contenanceImmeubleAcquisEnAre = req.body.contenanceImmeubleAcquisEnAre
        augmentation.contenanceImmeubleAcquisEnCentiare = req.body.contenanceImmeubleAcquisEnCentiare
        augmentation.prixAcquisition = req.body.prixAcquisition
        augmentation.modeAcquisitionId = req.body.modeAcquisitionId
        augmentation.titreFoncierId = req.body.titreFoncierId

        await augmentation.save()
            .then((augmentation) => {
                return res.status(201).send(augmentation);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updateAugmentation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Augmentation>> = { where: { id: req.params.id } }

        let augmentation: Augmentation | null = await Augmentation.findOne(options);
        if (augmentation != null) {

            await augmentation.update({
                numeroBordereauAnalytique: req.body.numeroBordereauAnalytique,
                dateInscription: req.body.dateInscription,
                numeroTitreAcquis: req.body.numeroTitreAcquis,
                designationImmeuble: req.body.designationImmeuble,
                contenanceImmeubleAcquisEnHectare: req.body.contenanceImmeubleAcquisEnHectare,
                contenanceImmeubleAcquisEnAre: req.body.contenanceImmeubleAcquisEnAre,
                contenanceImmeubleAcquisEnCentiare: req.body.contenanceImmeubleAcquisEnCentiare,
                prixAcquisition: req.body.prixAcquisition,
                modeAcquisitionId: req.body.modeAcquisitionId,
                titreFoncierId: req.body.titreFoncierId,
            })
                .then(async (augmentation) => {
                    return res.status(200).send(augmentation);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Augmentation non trouvée" });
        }

        return null
    }

    static async deleteAugmentation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Augmentation>> = { where: { id: req.params.id } }

        let augmentation: Augmentation | null = await Augmentation.findOne(options);
        if (augmentation) {
            await augmentation.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Augmentation supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Augmentation non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Augmentation>> = {}

        await Augmentation.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static GET_INCLUDES = [Augmentation.associations.modeAcquisition]
}
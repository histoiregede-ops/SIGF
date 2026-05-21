import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { TypesRegistre } from "../../../core/enums/TypesRegistre";
import { DataTypeUtils } from "../../../core/helpers/DataTypeUtils";
import { ActeRegistre } from "../models/ActeRegistre";

export default class ActeRegistreController {

    constructor() { }

    static async getAllActesRegistres(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let acteRegistreWhereOptions: WhereOptions<InferAttributes<ActeRegistre>> = {}

            // Filtres sur le type de registre
            if (req.query.typeRegistreId) {
                acteRegistreWhereOptions.typeRegistreId = req.query.typeRegistreId as TypesRegistre
            }

            // Application des filtres
            // if (req.query.dossier) acteRegistreWhereOptions.dossierRegistreId = req.query.dossier as string;
            if (req.query.region) acteRegistreWhereOptions.regionId = req.query.region as string;
            if (req.query.centre) acteRegistreWhereOptions.centreConservationFonciereId = req.query.centre as string;

            let options: FindOptions<InferAttributes<ActeRegistre>> = {
                where: acteRegistreWhereOptions,
                include: [
                    { association: ActeRegistre.associations.dossierRegistre, attributes: ['id', 'nom', 'volume'], required: false },
                    ActeRegistre.associations.region,
                    ActeRegistre.associations.centreConservationFonciere,
                    { association: ActeRegistre.associations.formalitePrealable, attributes: ['id'], required: false },
                    { association: ActeRegistre.associations.opposition, attributes: ['id'], required: false },
                    { association: ActeRegistre.associations.depot, attributes: ['id'], required: false },
                    { association: ActeRegistre.associations.titreFoncier, attributes: ['id'], required: false },
                ],
            }

            let countOptions: FindOptions<InferAttributes<ActeRegistre>> = {
                where: acteRegistreWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const actesRegistresCount: number = await ActeRegistre.count(countOptions)
                let actesRegistres: ActeRegistre[] = await ActeRegistre.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<ActeRegistre>(actesRegistres, actesRegistresCount, page, limit)
                );
            }
            else {
                let actesRegistres: ActeRegistre[];
                actesRegistres = await ActeRegistre.findAll(options);

                return res.status(200).send(actesRegistres);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    // static async getActeRegistre(req: Request, res: Response): Promise<any> {
    //     let options: FindOptions<InferAttributes<ActeRegistre>> = {}
    //     options = {
    //         where: { id: req.params.id }, include: [
    //             {
    //                 association: ActeRegistre.associations.sousActesRegistres,
    //                 // include: [ActeRegistre.associations.sousActesRegistres],
    //             },
    //         ]
    //     }

    //     try {
    //         const acteRegistre: ActeRegistre | null = await ActeRegistre.findOne(options);

    //         if (acteRegistre == null)
    //             return res.status(404).json({ success: false, message: "ActeRegistre non trouvée" });

    //         return res.status(200).send(acteRegistre);
    //     } catch (error) {
    //         return res.status(500).json({ success: false, error: error });
    //     }
    // }

    // static async createActeRegistre(req: Request, res: Response): Promise<any> {

    //     let acteRegistre: ActeRegistre | null = await ActeRegistre.findOne({ where: { nom: req.body.nom, acteRegistreParentId: req.body.acteRegistreParentId } });

    //     if (acteRegistre != null) {
    //         return res.status(400).json({ success: false, alreadyExists: true });
    //     }
    //     else {
    //         let acteRegistre: ActeRegistre = new ActeRegistre();
    //         acteRegistre.nom = req.body.nom
    //         acteRegistre.volume = req.body.volume
    //         acteRegistre.estRegistre = req.body.estRegistre
    //         acteRegistre.description = req.body.description
    //         acteRegistre.acteRegistreParentId = req.body.acteRegistreParentId
    //         acteRegistre.typeRegistreId = req.body.typeRegistreId
    //         acteRegistre.regionId = req.body.regionId
    //         acteRegistre.centreConservationFonciereId = req.body.centreConservationFonciereId

    //         await acteRegistre.save()
    //             .then((acteRegistre) => {
    //                 return res.status(201).send(acteRegistre);
    //             })
    //             .catch((error) => {
    //                 return res.status(400).json({ success: false, error: error });
    //             });
    //     }

    //     return null
    // }

    // static async updateActeRegistre(req: Request, res: Response): Promise<any> {
    //     let options: FindOptions<InferAttributes<ActeRegistre>> = { where: { id: req.params.id } }

    //     let acteRegistre: ActeRegistre | null = await ActeRegistre.findOne(options);
    //     if (acteRegistre != null) {

    //         await acteRegistre.update({
    //             nom: req.body.nom,
    //             volume: req.body.volume,
    //             estRegistre: req.body.estRegistre,
    //             description: req.body.description,
    //             acteRegistreParentId: req.body.acteRegistreParentId,
    //             typeRegistreId: req.body.typeRegistreId,
    //             regionId: req.body.regionId,
    //             centreConservationFonciereId: req.body.centreConservationFonciereId,
    //         })
    //             .then(async (acteRegistre) => {
    //                 return res.status(200).send(acteRegistre);
    //             })
    //             .catch((error) => {
    //                 return res.status(400).json({ success: false, error: error });
    //             });
    //     }
    //     else {
    //         return res.status(404).json({ success: false, message: "ActeRegistre non trouvée" });
    //     }

    //     return null
    // }

    // static async deleteActeRegistre(req: Request, res: Response): Promise<any> {
    //     let options: FindOptions<InferAttributes<ActeRegistre>> = { where: { id: req.params.id } }

    //     let acteRegistre: ActeRegistre | null = await ActeRegistre.findOne(options);
    //     if (acteRegistre) {
    //         await acteRegistre.destroy()
    //             .then(() => {
    //                 return res.status(200).json({ success: true, message: "ActeRegistre supprimée" });
    //             })
    //             .catch((error) => {
    //                 return res.status(500).json({ success: false, error: error });
    //             });
    //     }
    //     else {
    //         return res.status(404).json({ success: false, message: "ActeRegistre non trouvée" });
    //     }

    //     return null
    // }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<ActeRegistre>> = {}

        await ActeRegistre.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
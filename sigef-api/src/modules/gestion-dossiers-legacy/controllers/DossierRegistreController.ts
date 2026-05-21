import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { TypesRegistre } from "../../../core/enums/TypesRegistre";
import { DataTypeUtils } from "../../../core/helpers/DataTypeUtils";
import { DossierRegistre } from "../models/DossierRegistre";
import { ActeRegistre } from "../models/ActeRegistre";
import { TypeRegistre } from "../../commun/models/TypeRegistre";

export default class DossierRegistreController {

    constructor() { }

    static async getAllDossiersRegistres(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let dossierRegistreWhereOptions: WhereOptions<InferAttributes<DossierRegistre>> = {}

            // Filtres sur le type de registre
            if (req.query.typeRegistreId) {
                dossierRegistreWhereOptions.typeRegistreId = req.query.typeRegistreId as TypesRegistre
            }

            // Application des filtres
            if (req.query.nom) dossierRegistreWhereOptions.nom = { [Op.like]: `%${req.query.nom}%` }
            if (DataTypeUtils.getInstance().booleanFromString(req.query.estRegistre as string) != undefined) dossierRegistreWhereOptions.estRegistre = DataTypeUtils.getInstance().booleanFromString(req.query.estRegistre as string);
            if (req.query.dossierRegistre && req.query.dossierRegistre != 'undefined') dossierRegistreWhereOptions.dossierRegistreParentId = req.query.dossierRegistre as string;
            if (req.query.region) dossierRegistreWhereOptions.regionId = req.query.region as string;
            if (req.query.centre) dossierRegistreWhereOptions.centreConservationFonciereId = req.query.centre as string;

            let options: FindOptions<InferAttributes<DossierRegistre>> = {
                where: dossierRegistreWhereOptions,
                include: [
                    { association: DossierRegistre.associations.sousDossiersRegistres, attributes: ['id'], required: false },
                    { association: DossierRegistre.associations.actesRegistres, attributes: ['id'], required: false },
                    DossierRegistre.associations.region
                ],
                order: [['nom', 'ASC'], ['volume', 'ASC'], ['estRegistre', 'ASC']]
            }

            let countOptions: FindOptions<InferAttributes<DossierRegistre>> = {
                where: dossierRegistreWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const dossiersRegistresCount: number = await DossierRegistre.count(countOptions)
                let dossiersRegistres: DossierRegistre[] = await DossierRegistre.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<DossierRegistre>(dossiersRegistres, dossiersRegistresCount, page, limit)
                );
            }
            else {
                let dossiersRegistres: DossierRegistre[];
                dossiersRegistres = await DossierRegistre.findAll(options);

                return res.status(200).send(dossiersRegistres);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getDossierRegistre(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DossierRegistre>> = {}
        options = {
            where: { id: req.params.id }, include: [
                {
                    association: DossierRegistre.associations.sousDossiersRegistres,
                    // include: [DossierRegistre.associations.sousDossiersRegistres],
                },
            ]
        }

        try {
            const dossierRegistre: DossierRegistre | null = await DossierRegistre.findOne(options);

            if (dossierRegistre == null)
                return res.status(404).json({ success: false, message: "DossierRegistre non trouvée" });

            return res.status(200).send(dossierRegistre);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getProchainFolioDossierRegistre(dossierRegistreId: DossierRegistre['id'], typeRegistreId: TypeRegistre['id']): Promise<number | null> {
        try {
            // console.log(req.query, req.params)
            let dossierRegistreOptions: FindOptions<InferAttributes<DossierRegistre>> = {
                where: {
                    id: dossierRegistreId,
                    typeRegistreId: typeRegistreId,
                    estRegistre: true
                }
            }
            const dossierRegistre: DossierRegistre | null = await DossierRegistre.findOne(dossierRegistreOptions);

            if (dossierRegistre == null)
                return null;

            let acteRegistreOptions: FindOptions<InferAttributes<ActeRegistre>> = {
                where: { dossierRegistreId: dossierRegistre.id, folio: { [Op.not]: null } },
                limit: 1,
                order: [['folio', 'DESC']]
            }
            const actesRegistre: ActeRegistre[] = await ActeRegistre.findAll(acteRegistreOptions);

            if (actesRegistre.length == 0) {
                const folio: number = 1
                return folio
            }
            else if (actesRegistre.length == 1) {
                const folio: number = actesRegistre[0].folio ? (actesRegistre[0].folio + 1) : 1
                return folio
            }
            else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    static async getProchainNumeroOrdreDossierRegistre(dossierRegistreId: DossierRegistre['id'], typeRegistreId: TypeRegistre['id']): Promise<string | null> {
        try {
            // console.log(req.query, req.params)
            let dossierRegistreOptions: FindOptions<InferAttributes<DossierRegistre>> = {
                where: {
                    id: dossierRegistreId,
                    typeRegistreId: typeRegistreId,
                    estRegistre: true
                }
            }
            const dossierRegistre: DossierRegistre | null = await DossierRegistre.findOne(dossierRegistreOptions);

            if (dossierRegistre == null)
                return null;

            let acteRegistreOptions: FindOptions<InferAttributes<ActeRegistre>> = {
                where: { dossierRegistreId: dossierRegistre.id, numeroOrdre: { [Op.regexp]: '^[0-9]+$' } },
                limit: 1,
                order: [['numeroOrdre', 'DESC']]
            }
            const actesRegistre: ActeRegistre[] = await ActeRegistre.findAll(acteRegistreOptions);
            // actesRegistre

            if (actesRegistre.length == 0) {
                const numeroOrdre: number = 1
                return numeroOrdre.toString()
            }
            else if (actesRegistre.length == 1) {
                const lastNumeroOrdre: number | undefined = actesRegistre[0].numeroOrdre ? Number(actesRegistre[0].numeroOrdre) : undefined

                const numeroOrdre: number = lastNumeroOrdre ? (lastNumeroOrdre + 1) : 1
                return numeroOrdre.toString()
            }
            else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    static async createDossierRegistre(req: Request, res: Response): Promise<any> {

        let dossierRegistre: DossierRegistre | null = await DossierRegistre.findOne({ where: { nom: req.body.nom, dossierRegistreParentId: req.body.dossierRegistreParentId } });

        if (dossierRegistre != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let dossierRegistre: DossierRegistre = new DossierRegistre();
            dossierRegistre.nom = req.body.nom
            dossierRegistre.volume = req.body.volume
            dossierRegistre.estRegistre = req.body.estRegistre
            dossierRegistre.description = req.body.description
            dossierRegistre.dossierRegistreParentId = req.body.dossierRegistreParentId
            dossierRegistre.typeRegistreId = req.body.typeRegistreId
            dossierRegistre.regionId = req.body.regionId
            dossierRegistre.centreConservationFonciereId = req.body.centreConservationFonciereId

            await dossierRegistre.save()
                .then((dossierRegistre) => {
                    return res.status(201).send(dossierRegistre);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateDossierRegistre(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DossierRegistre>> = { where: { id: req.params.id } }

        let dossierRegistre: DossierRegistre | null = await DossierRegistre.findOne(options);
        if (dossierRegistre != null) {

            await dossierRegistre.update({
                nom: req.body.nom,
                volume: req.body.volume,
                estRegistre: req.body.estRegistre,
                description: req.body.description,
                dossierRegistreParentId: req.body.dossierRegistreParentId,
                typeRegistreId: req.body.typeRegistreId,
                regionId: req.body.regionId,
                centreConservationFonciereId: req.body.centreConservationFonciereId,
            })
                .then(async (dossierRegistre) => {
                    return res.status(200).send(dossierRegistre);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "DossierRegistre non trouvée" });
        }

        return null
    }

    static async deleteDossierRegistre(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DossierRegistre>> = { where: { id: req.params.id } }

        let dossierRegistre: DossierRegistre | null = await DossierRegistre.findOne(options);
        if (dossierRegistre) {
            await dossierRegistre.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "DossierRegistre supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "DossierRegistre non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<DossierRegistre>> = {}

        await DossierRegistre.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
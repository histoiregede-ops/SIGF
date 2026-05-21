import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes } from "sequelize";
import { DonneeIndexation } from "../models/DonneeIndexation";
import { Fichier } from "../models/Fichier";
import UtilisateurController from "../../auth/controllers/UtilisateurController";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { Region } from "../../commun/models/Region";
import { ProgressionTacheIndexation } from "../models/ProgressionTacheIndexation";
import { TacheIndexation } from "../models/TacheIndexation";
import { TypesRegistre } from "../../../core/enums/TypesRegistre";
import FormalitePrealableController from "../../gestion-dossiers-legacy/controllers/FormalitePrealableController";
import RegionController from "../../commun/controllers/RegionController";

export default class DonneeIndexationController {

    constructor() { }

    static async getAllDonneesIndexation(req: Request, res: Response): Promise<any> {
        
        const fichierInclude: any = {
            association: TacheIndexation.associations.fichier,
            required: true
        }
        if (req.query.typeRegistre) {
            fichierInclude.where = { typeRegistreId: req.query.typeRegistre }
        }

        let donneeIndexationIncludeOptions: Includeable[] = [
            {
                association: DonneeIndexation.associations.progressionTacheIndexation, include: [
                    {
                        association: ProgressionTacheIndexation.associations.tacheIndexation, include: [
                            fichierInclude
                        ],
                        required: false
                    }
                ],
                required: false
            },
            { association: DonneeIndexation.associations.region, include: [Region.associations.periode] },
        ]

        // Récupération des détails suivant le type de registre
        switch (req.query.typeRegistre) {
            case TypesRegistre.FORMALITES_PREALABLES:
                donneeIndexationIncludeOptions.push({ association: DonneeIndexation.associations.formalitePrealable,  })
                break;
            
            case TypesRegistre.OPPOSITIONS:
                donneeIndexationIncludeOptions.push({ association: DonneeIndexation.associations.opposition,  })
                break;
                            
            case TypesRegistre.DEPOTS:
                donneeIndexationIncludeOptions.push({ association: DonneeIndexation.associations.depot,  })
                break;
                            
            case TypesRegistre.TITRES_FONCIERS:
                donneeIndexationIncludeOptions.push({ association: DonneeIndexation.associations.titreFoncier,  })
                break;
        
            case TypesRegistre.ACTES:
                donneeIndexationIncludeOptions.push({ association: DonneeIndexation.associations.acteRegistre,  })
                break;

            default:
                break;
        }

        // Filtres de l'utilisateur

        let options: FindOptions<InferAttributes<DonneeIndexation>> = {
            include: donneeIndexationIncludeOptions,
            order: [['createdAt', 'DESC']]
        }

        try {
            // First query: Get IDs based on filters
            const countOptions: FindOptions<InferAttributes<DonneeIndexation>> = {
                attributes: ['id'],
                include: donneeIndexationIncludeOptions,
                raw: true,
                subQuery: false
            };
            let filteredDonnees: any[] = await DonneeIndexation.findAll(countOptions);
            
            // Early return if no data matches the filters
            if (filteredDonnees.length === 0) {
                const page = Number(req.query.page) || 0;
                const size = Number(req.query.size) || 10;
                const { limit } = DataPaginator.getInstance().getPagination(page, size);
                return res.status(200).send(DataPaginator.getInstance().getPagingData<DonneeIndexation>([], 0, page, limit));
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                let donneesIndexation: DonneeIndexation[];
                donneesIndexation = await DonneeIndexation.findAll(options);
                // const { rows, count } = await DonneeIndexation.findAndCountAll(options);

                // console.log(req.query, rows, count);
                // console.log(DataPaginator.getInstance().getPagingData<DonneeIndexation>(rows, count, page, limit))

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<DonneeIndexation>(donneesIndexation, filteredDonnees.length, page, limit)
                );
            }
            else {
                let donneesIndexation: DonneeIndexation[];
                donneesIndexation = await DonneeIndexation.findAll(options);

                return res.status(200).send(donneesIndexation);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getDonneeIndexation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DonneeIndexation>> = {}
        options = {
            where: { id: req.params.id },
            include: [
                DonneeIndexation.associations.typeRegistre,
                { association: DonneeIndexation.associations.region, include: [ Region.associations.periode ] },
                {
                    association: DonneeIndexation.associations.progressionTacheIndexation, include: [
                        ProgressionTacheIndexation.associations.qualiteDocument,
                        // {
                        //     association: ProgressionTacheIndexation.associations.tacheIndexation, include: [
                        //         {
                        //             association: TacheIndexation.associations.fichier,
                        //             where: { typeRegistreId: req.query.typeRegistre },
                        //             required: true
                        //         }
                        //     ],
                        //     required: true
                        // }
                    ],
                    // required: true
                }
            ],
        }

        try {
            const donneeindexation: DonneeIndexation | null = await DonneeIndexation.findOne(options);

            if (donneeindexation == null)
                return res.status(404).json({ success: false, message: "DonneeIndexation non trouvée" });

            return res.status(200).send(donneeindexation);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }


    static async deleteDonneeIndexation(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<DonneeIndexation>> = { where: { id: req.params.id } }

        let donneeindexation: DonneeIndexation | null = await DonneeIndexation.findOne(options);
        if (donneeindexation) {
            await donneeindexation.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "DonneeIndexation supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "DonneeIndexation non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<DonneeIndexation>> = {}

        await DonneeIndexation.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
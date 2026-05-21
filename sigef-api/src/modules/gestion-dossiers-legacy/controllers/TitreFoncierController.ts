import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { TitreFoncier } from "../models/TitreFoncier";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { PartiePrenante } from "../models/PartiePrenante";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import PartiePrenanteController from "./PartiePrenanteController";
import SituationProprieteController from "./SituationProprieteController";
import AugmentationController from "./AugmentationController";
import DiminutionController from "./DiminutionController";
import LimiteController from "./LimiteController";
import MutationController from "./MutationController";
import DivisionEnVolumeController from "./DivisionEnVolumeController";
import DivisionEnLotController from "./DivisionEnLotController";
import { Region } from "../../commun/models/Region";
import { DetailsNumeroTitreFoncier, NumeroTitreFoncierUtils } from "../../../core/helpers/NumeroTitreFoncierUtils";
import { ActeRegistre } from "../models/ActeRegistre";
import { TypesRegistre } from "../../../core/enums/TypesRegistre";
import DossierRegistreController from "./DossierRegistreController";
import { TitreFoncierRepository } from "../repositories/TitreFoncierRepository";

export default class TitreFoncierController {

    constructor() { }

    static async getAllTitresFonciers(req: Request, res: Response): Promise<any> {

        try {
            console.log('TitreFoncierController.getAllTitresFonciers called with query:', req.query);
            
            let options: FindOptions<InferAttributes<TitreFoncier>> = {
                order: [['createdAt', 'DESC']]
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const titresFonciersCount: number = await TitreFoncier.count()
                let titresFonciers: TitreFoncier[] = await TitreFoncier.findAll(options);

                console.log(`Found ${titresFonciers.length} titresFonciers, total count: ${titresFonciersCount}`);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<TitreFoncier>(titresFonciers, titresFonciersCount, page, limit)
                );
            }
            else {
                let titresFonciers: TitreFoncier[] = await TitreFoncier.findAll(options);
                console.log(`Found ${titresFonciers.length} titresFonciers`);

                return res.status(200).send(titresFonciers);
            }
        } catch (error: any) {
            console.error('TitreFoncierController.getAllTitresFonciers ERROR:', error.message, error.stack);
            return res.status(500).json({ 
                success: false, 
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
                details: error.stack?.split('\n')[0]
            });
        }
    }

    static async getTitreFoncier(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TitreFoncier>> = {}
        options = {
            where: { id: req.params.id },
            include: [
                { association: TitreFoncier.associations.limitesTitreFoncier, include: LimiteController.GET_INCLUDES },
                { association: TitreFoncier.associations.situationPropriete, include: SituationProprieteController.GET_INCLUDES },
                { association: TitreFoncier.associations.mutations, include: MutationController.GET_INCLUDES, },
                TitreFoncier.associations.donneeIndexation
            ],
        }

        try {
            const titreFoncier: TitreFoncier | null = await TitreFoncier.findOne(options);

            if (titreFoncier == null)
                return res.status(404).json({ success: false, message: "TitreFoncier non trouvé" });

            return res.status(200).send(titreFoncier);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getProchainNumeroTitreFoncier(regionId: Region['id']): Promise<any> {
        try {
            let regionOptions: FindOptions<InferAttributes<Region>> = { where: { id: regionId, actuelle: true }, include: [Region.associations.periode] }
            const region: Region | null = await Region.findOne(regionOptions);

            if (region == null)
                return null;

            let whereOptions: WhereOptions<InferAttributes<TitreFoncier>> = {}
            if (region.sigle) {
                whereOptions.numeroPrefixe = region.sigle
            }
            if (region.periode && region.periode.sigle) {
                whereOptions.numeroSuffixe = region.periode.sigle
            }

            let options: FindOptions<InferAttributes<TitreFoncier>> = {}
            options = {
                where: whereOptions,
                // include: [{ association: TitreFoncier.associations.situationPropriete, where: { id: region.id } }],
                limit: 1,
                order: [['numero', 'DESC']]
            }

            const titresFonciers: TitreFoncier[] = await TitreFoncier.findAll(options);

            if (titresFonciers.length == 0) {
                return {
                    numeroPrefixe: region.sigle,
                    numero: 1,
                    numeroSuffixe: region.periode.sigle
                };
            }
            else if (titresFonciers.length == 1) {
                return {
                    numeroPrefixe: region.sigle,
                    numero: titresFonciers[0].numero ? (titresFonciers[0].numero + 1) : 1,
                    numeroSuffixe: region.periode.sigle
                };
            }
            else {
                return null;
            }
        } catch (error) {
            return null;
        }
    }

    static async getTitreFoncierParNumeroTitreFoncier(req: Request, res: Response): Promise<any> {

        try {

            if (!req.params.numeroTitreFoncier)
                return res.status(400).json({ success: false });

            let numeroTitreFoncier: DetailsNumeroTitreFoncier = NumeroTitreFoncierUtils.getInstance().parseNumeroTitreFoncier(req.params.numeroTitreFoncier as string)

            let whereOptions: WhereOptions<InferAttributes<TitreFoncier>> = {}
            if (numeroTitreFoncier.prefixe) {
                whereOptions.numeroPrefixe = numeroTitreFoncier.prefixe
            }
            if (numeroTitreFoncier.numero) {
                whereOptions.numero = numeroTitreFoncier.numero
            }
            if (numeroTitreFoncier.suffixe) {
                whereOptions.numeroSuffixe = numeroTitreFoncier.suffixe
            }

            console.log(whereOptions)
            let options: FindOptions<InferAttributes<TitreFoncier>> = {}
            options = {
                where: whereOptions,
            }
            const titreFoncier: TitreFoncier | null = await TitreFoncier.findOne(options);

            if (titreFoncier == null)
                return res.status(404).json({ success: false, message: "TitreFoncier non trouvé" });

            return res.status(200).send(titreFoncier);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createTitreFoncier(req: Request, res: Response): Promise<any> {
        const transaction = await DatabaseConnection.getInstance().sequelize.transaction();

        if(req.body.acteRegistre == null)
            return res.status(400).json({ success: false });

        // let titreFoncier: TitreFoncier | null = await TitreFoncier.findOne({ where: { libelle: req.body.libelle } });

        // if (titreFoncier != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        req.body.utilisateurId = (req as any).utilisateurId

        await TitreFoncierRepository.create(req.body, transaction)
            .then(async (titreFoncier) => {
                await transaction.commit()
                return res.status(201).send(titreFoncier);
            })
            .catch(async (error) => {
                // Rollback
                await transaction.rollback()
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updateTitreFoncier(req: Request, res: Response): Promise<any> {
        const transaction = await DatabaseConnection.getInstance().sequelize.transaction();

        try {
            let options: FindOptions<InferAttributes<TitreFoncier>> = { where: { id: req.params.id } }
            let titreFoncier: TitreFoncier | null = await TitreFoncier.findOne(options);

            if (titreFoncier != null) {
                // await TitreFoncierRepository.update(req.body, transaction)
                await transaction.commit()
                return res.status(200).send(titreFoncier);
            }
            else {
                return res.status(404).json({ success: false, message: "TitreFoncier non trouvé" });
            }
        }
        catch (error) {
            // Rollback
            await transaction.rollback()
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async deleteTitreFoncier(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TitreFoncier>> = { where: { id: req.params.id } }

        let titreFoncier: TitreFoncier | null = await TitreFoncier.findOne(options);
        if (titreFoncier) {
            await titreFoncier.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "TitreFoncier supprimé" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "TitreFoncier non trouvé" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<TitreFoncier>> = {}

        await TitreFoncier.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES = [
        TitreFoncier.associations.limitesTitreFoncier,
        TitreFoncier.associations.situationPropriete,
        TitreFoncier.associations.augmentations,
        TitreFoncier.associations.diminutions,
        TitreFoncier.associations.droitsReelsConstituesParDenombrement,
        TitreFoncier.associations.privilegesHypotheques,
        TitreFoncier.associations.causesIndisponibilite,
        TitreFoncier.associations.oppositionsCasInscriptionDifferee,
        { association: TitreFoncier.associations.mutations, include: MutationController.INCLUDES, },
        TitreFoncier.associations.situationsFiscales,
        TitreFoncier.associations.divisionsEnVolumes,
        TitreFoncier.associations.divisionsEnLots,
        TitreFoncier.associations.acteRegistre,
    ]

    static GET_INCLUDES = [
        { association: TitreFoncier.associations.limitesTitreFoncier, include: LimiteController.GET_INCLUDES },
        { association: TitreFoncier.associations.situationPropriete, include: SituationProprieteController.GET_INCLUDES },
        { association: TitreFoncier.associations.augmentations, include: AugmentationController.GET_INCLUDES },
        { association: TitreFoncier.associations.diminutions, include: DiminutionController.GET_INCLUDES },
        TitreFoncier.associations.droitsReelsConstituesParDenombrement,
        TitreFoncier.associations.privilegesHypotheques,
        TitreFoncier.associations.causesIndisponibilite,
        TitreFoncier.associations.oppositionsCasInscriptionDifferee,
        { association: TitreFoncier.associations.mutations, include: MutationController.GET_INCLUDES, },
        TitreFoncier.associations.situationsFiscales,
        { association: TitreFoncier.associations.divisionsEnVolumes, include: DivisionEnVolumeController.GET_INCLUDES },
        { association: TitreFoncier.associations.divisionsEnLots, include: DivisionEnLotController.GET_INCLUDES },
        {
            association: TitreFoncier.associations.acteRegistre, include: [
                { association: ActeRegistre.associations.dossierRegistre, attributes: ['id', 'nom', 'volume'], required: false },
                ActeRegistre.associations.region,
                ActeRegistre.associations.centreConservationFonciere,
            ]
        }
    ]
}
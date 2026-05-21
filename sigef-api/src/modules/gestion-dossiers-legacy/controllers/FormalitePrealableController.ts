import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes, Op, WhereOptions } from "sequelize";
import { FormalitePrealable } from "../models/FormalitePrealable";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";
import PartiePrenanteController from "./PartiePrenanteController";
import SituationProprieteController from "./SituationProprieteController";
import InformationsProprieteController from "./InformationsProprieteController";
import { FormalitePrealableRepository } from "../repositories/FormalitePrelableRepository";
import { ActeRegistre } from "../models/ActeRegistre";
import { SituationPropriete } from "../models/SituationPropriete";
import { StatutsFormalitePrealable } from "../../../core/enums/StatutsFormalitePrealable";
import { InformationsPropriete } from "../models/InformationsPropriete";
import { PartiePrenante } from "../models/PartiePrenante";
import { CategoriesPartiePrenante } from "../../../core/enums/CategoriesPartiePrenante";
import { PersonnePhysique } from "../models/PersonnePhysique";

export default class FormalitePrealableController {

    constructor() { }

    static async filterAllFormalitesPrealables(req: Request, res: Response): Promise<any> {

        try {
            // console.log(FormalitePrealableController.INCLUDES)

            // Récupération de l'objet de filtrage
            const filtres: { [key: string]: any } = req.body

            // Filtres de l'utilisateur
            let formalitePrealableWhereOptions: WhereOptions<InferAttributes<FormalitePrealable>> = {}
            if (filtres.creatDebut && filtres.creatFin) formalitePrealableWhereOptions.dateDeDepot = { [Op.between]: [filtres.creatDebut as string, filtres.creatFin as string] };
            if (filtres.requisition) formalitePrealableWhereOptions.numeroRequisition = filtres.requisition as string;
            if (filtres.statut) formalitePrealableWhereOptions.statut = filtres.statut as StatutsFormalitePrealable;

            const [filterIncludeOptions, includeOptions]: [Includeable[], Includeable[]] = FormalitePrealableController.get_includes(filtres)
            // console.log(includeOptions)

            // Application des filtres
            let filterOptions: FindOptions<InferAttributes<FormalitePrealable>> = {
                attributes: ['id'],
                include: filterIncludeOptions,
                where: formalitePrealableWhereOptions
            }
            let _formalitesPrealables: FormalitePrealable[] = await FormalitePrealable.findAll(filterOptions)
            // console.log(_formalitesPrealables.map(value => value.id))

            // Options
            let options: FindOptions<InferAttributes<FormalitePrealable>> = {
                where: {
                    id: { [Op.in]: _formalitesPrealables.map(value => value.id) }
                },
                include: includeOptions,
                order: [['createdAt', 'DESC']]
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const formalitesPrealablesCount: number = _formalitesPrealables.length
                const formalitesPrealables: FormalitePrealable[] = await FormalitePrealable.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<FormalitePrealable>(formalitesPrealables, formalitesPrealablesCount, page, limit)
                );
            }
            else {
                let formalitesPrealables: FormalitePrealable[];
                formalitesPrealables = await FormalitePrealable.findAll(options);

                return res.status(200).send(formalitesPrealables);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getAllFormalitesPrealables(req: Request, res: Response): Promise<any> {

        try {
            // console.log(FormalitePrealableController.INCLUDES)

            let options: FindOptions<InferAttributes<FormalitePrealable>> = {
                include: FormalitePrealableController.GET_INCLUDES,
                order: [['createdAt', 'DESC']]
            }

            let countOptions: CountOptions<InferAttributes<FormalitePrealable>> = {
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const formalitesPrealablesCount: number = await FormalitePrealable.count(countOptions)
                let formalitesPrealables: FormalitePrealable[] = await FormalitePrealable.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<FormalitePrealable>(formalitesPrealables, formalitesPrealablesCount, page, limit)
                );
            }
            else {
                let formalitesPrealables: FormalitePrealable[];
                formalitesPrealables = await FormalitePrealable.findAll(options);

                return res.status(200).send(formalitesPrealables);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getFormalitePrealable(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<FormalitePrealable>> = {}
        options = {
            where: { id: req.params.id },
            include: [
                { association: FormalitePrealable.associations.partiesPrenantes, separate: true, include: PartiePrenanteController.GET_INCLUDES },
                { association: FormalitePrealable.associations.informationsPropriete, include: InformationsProprieteController.GET_INCLUDES },
                { association: FormalitePrealable.associations.situationPropriete, include: SituationProprieteController.GET_INCLUDES },
                FormalitePrealable.associations.donneeIndexation,
            ],
        }

        try {
            const formalitePrealable: FormalitePrealable | null = await FormalitePrealable.findOne(options);

            if (formalitePrealable == null)
                return res.status(404).json({ success: false, message: "FormalitePrealable non trouvée" });

            return res.status(200).send(formalitePrealable);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getFormalitePrealableParNumeroRequisition(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<FormalitePrealable>> = {}
        options = {
            where: { numeroRequisition: req.params.requisition },
            // include: FormalitePrealableController.GET_INCLUDES,
        }

        try {
            const formalitePrealable: FormalitePrealable | null = await FormalitePrealable.findOne(options);

            if (formalitePrealable == null)
                return res.status(404).json({ success: false, message: "FormalitePrealable non trouvée" });

            return res.status(200).send(formalitePrealable);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createFormalitePrealable(req: Request, res: Response): Promise<any> {
        const transaction = await DatabaseConnection.getInstance().sequelize.transaction();

        // console.log(req.body.piecesDeposees)
        // console.log(req.files)

        if(req.body.acteRegistre == null)
            return res.status(400).json({ success: false });

        // let formalitePrealable: FormalitePrealable | null = await FormalitePrealable.findOne({ where: { numeroRequisition: req.body.numeroRequisition } });

        // if (formalitePrealable != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {

        req.body.utilisateurId = (req as any).utilisateurId

        await FormalitePrealableRepository.create(req.body, transaction)
            .then(async (formalitePrealable) => {
                await transaction.commit()
                return res.status(201).send(formalitePrealable);
            })
            .catch(async (error) => {
                // Rollback
                await transaction.rollback()
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updateFormalitePrealable(req: Request, res: Response): Promise<any> {
        const transaction = await DatabaseConnection.getInstance().sequelize.transaction();

        try {
            let options: FindOptions<InferAttributes<FormalitePrealable>> = { where: { id: req.params.id } }
            let formalitePrealable: FormalitePrealable | null = await FormalitePrealable.findOne(options);

            if (formalitePrealable != null) {
                await FormalitePrealableRepository.update(req.body, transaction)
                await transaction.commit()
                return res.status(200).send(formalitePrealable);
            }
            else {
                return res.status(404).json({ success: false, message: "FormalitePrealable non trouvée" });
            }
        }
        catch (error) {
            // Rollback
            await transaction.rollback()
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async deleteFormalitePrealable(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<FormalitePrealable>> = { where: { id: req.params.id } }

        let formalitePrealable: FormalitePrealable | null = await FormalitePrealable.findOne(options);
        if (formalitePrealable) {
            await formalitePrealable.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "FormalitePrealable supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "FormalitePrealable non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<FormalitePrealable>> = {}

        await FormalitePrealable.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES = [
        { association: FormalitePrealable.associations.partiesPrenantes, separate: true, include: PartiePrenanteController.INCLUDES },
        FormalitePrealable.associations.informationsPropriete,
        FormalitePrealable.associations.situationPropriete,
        FormalitePrealable.associations.publicationDemandes,
        FormalitePrealable.associations.bornage,
        FormalitePrealable.associations.procedureJudiciaire,
        FormalitePrealable.associations.piecesDeposees,
        FormalitePrealable.associations.acteRegistre,
    ]

    static GET_INCLUDES = [
        { association: FormalitePrealable.associations.partiesPrenantes, separate: true, include: PartiePrenanteController.GET_INCLUDES },
        { association: FormalitePrealable.associations.informationsPropriete, include: InformationsProprieteController.GET_INCLUDES },
        { association: FormalitePrealable.associations.situationPropriete, include: SituationProprieteController.GET_INCLUDES },
        FormalitePrealable.associations.publicationDemandes,
        FormalitePrealable.associations.bornage,
        FormalitePrealable.associations.procedureJudiciaire,
        FormalitePrealable.associations.piecesDeposees,
        {
            association: FormalitePrealable.associations.acteRegistre, include: [
                { association: ActeRegistre.associations.dossierRegistre, attributes: ['id', 'nom', 'volume'], required: false },
                ActeRegistre.associations.region,
                ActeRegistre.associations.centreConservationFonciere,
            ]
        }
    ]

    static get_includes(filtres: any): [Includeable[], Includeable[]] {
        console.log("Filtres: ", filtres)
        
        // Filtres de l'utilisateur
        /// - Filtres Acte & Dossier Registre
        let acteRegistreWhereOptions: WhereOptions<InferAttributes<ActeRegistre>> = {}
        if (filtres.registre) acteRegistreWhereOptions.dossierRegistreId = filtres.registre as string;
        if (filtres.centre) acteRegistreWhereOptions.centreConservationFonciereId = filtres.centre as string;
        if (filtres.folio) acteRegistreWhereOptions.folio = filtres.folio as string;

        /// - Filtres InformationsPropriete
        let informationsProprieteWhereOptions: WhereOptions<InferAttributes<InformationsPropriete>> = {}
        if (filtres.type) informationsProprieteWhereOptions.natureTypeImmeubleId = filtres.type as string;
        if (filtres.etat) informationsProprieteWhereOptions.natureEtatImmeubleId = filtres.etat as string;

        /// - Filtres Situation
        let situationProprieteWhereOptions: WhereOptions<InferAttributes<SituationPropriete>> = {}
        if (filtres.region) situationProprieteWhereOptions.regionId = filtres.region as string;
        if (filtres.prefecture) situationProprieteWhereOptions.prefectureId = filtres.prefecture as string;
        if (filtres.commune) situationProprieteWhereOptions.communeId = filtres.commune as string;
        if (filtres.canton) situationProprieteWhereOptions.cantonId = filtres.canton as string;
        if (filtres.village) situationProprieteWhereOptions.villageId = filtres.village as string;
        if (filtres.ville) situationProprieteWhereOptions.villeId = filtres.ville as string;
        if (filtres.quartier) situationProprieteWhereOptions.quartierId = filtres.quartier as string;
        if (filtres.lieudit) situationProprieteWhereOptions.lieudit = filtres.lieudit as string;
        if (filtres.rue) situationProprieteWhereOptions.rue = filtres.rue as string;

        /// - Filtres PartiePrenante
        let partiesPrenantesWhereOptions: WhereOptions<InferAttributes<PartiePrenante>>[] = []
        if(filtres.partiesPrenantes && filtres.partiesPrenantes.length != 0) {
            for (let index = 0; index < filtres.partiesPrenantes.length; index++) {
                const filtrePartiePrenante = filtres.partiesPrenantes[index];
                
                switch (filtrePartiePrenante.categorie) {
                    case null:
                        //Toutes les catégories
                        partiesPrenantesWhereOptions.push({

                        })
                        break;

                    case CategoriesPartiePrenante.PERSONNE_PHYSIQUE:
                        //Toutes les catégories
                        let personnePhysiqueWhereOptions: WhereOptions<InferAttributes<PersonnePhysique>> = {}

                        if(filtrePartiePrenante.nom) personnePhysiqueWhereOptions.nom = filtrePartiePrenante.nom as string
                        if(filtrePartiePrenante.prenoms) personnePhysiqueWhereOptions.prenoms = filtrePartiePrenante.prenoms as string
                        if(filtrePartiePrenante.telephone) personnePhysiqueWhereOptions.telephone = filtrePartiePrenante.telephone as string
                        if(filtrePartiePrenante.adresseDomicile) personnePhysiqueWhereOptions.adresseDomicile = filtrePartiePrenante.adresseDomicile as string
                        if(filtrePartiePrenante.adresseResidence) personnePhysiqueWhereOptions.adresseResidence = filtrePartiePrenante.adresseResidence as string
                        if(filtrePartiePrenante.anneeNaissance) personnePhysiqueWhereOptions.anneeNaissance = filtrePartiePrenante.anneeNaissance as string
                        if(filtrePartiePrenante.dateNaissance) personnePhysiqueWhereOptions.dateNaissance = filtrePartiePrenante.dateNaissance as string
                        if(filtrePartiePrenante.lieuNaissance) personnePhysiqueWhereOptions.lieuNaissance = filtrePartiePrenante.lieuNaissance as string
                        if(filtrePartiePrenante.nif) personnePhysiqueWhereOptions.nif = filtrePartiePrenante.nif as string
                        if(filtrePartiePrenante.nomEpoux) personnePhysiqueWhereOptions.nomEpoux = filtrePartiePrenante.nomEpoux as string
                        if(filtrePartiePrenante.nomJeuneFille) personnePhysiqueWhereOptions.nomJeuneFille = filtrePartiePrenante.nomJeuneFille as string
                        if(filtrePartiePrenante.vivant) personnePhysiqueWhereOptions.vivant = filtrePartiePrenante.vivant as string
                        if(filtrePartiePrenante.civiliteId) personnePhysiqueWhereOptions.civiliteId = filtrePartiePrenante.civiliteId as string
                        if(filtrePartiePrenante.nationaliteId) personnePhysiqueWhereOptions.nationaliteId = filtrePartiePrenante.nationaliteId as string
                        if(filtrePartiePrenante.professionId) personnePhysiqueWhereOptions.professionId = filtrePartiePrenante.professionId as string

                        partiesPrenantesWhereOptions.push({
                            categorie: CategoriesPartiePrenante.PERSONNE_PHYSIQUE,
                        })
                        break;
                
                    default:
                        break;
                }
            }
        }

        // Application des filtres
        const acteRegistreAssociationRequired: boolean = Object.keys(acteRegistreWhereOptions).length > 0
        const informationsProprieteAssociationRequired: boolean = Object.keys(informationsProprieteWhereOptions).length > 0
        const situationProprieteAssociationRequired: boolean = Object.keys(situationProprieteWhereOptions).length > 0
        const partiesPrenantesAssociationRequired: boolean = Object.keys(partiesPrenantesWhereOptions).length > 0

        let filterIncludes: Includeable[] = [
            { 
                association: FormalitePrealable.associations.partiesPrenantes, separate: true,
                where: {
                    [Op.and]: partiesPrenantesWhereOptions
                },
                required: partiesPrenantesAssociationRequired
            },
            { 
                attributes: [],
                association: FormalitePrealable.associations.informationsPropriete,
                where: informationsProprieteWhereOptions,
                required: informationsProprieteAssociationRequired,
            },
            { 
                attributes: [],
                association: FormalitePrealable.associations.situationPropriete,
                where: situationProprieteWhereOptions,
                required: situationProprieteAssociationRequired,
            },
            {
                attributes: [],
                association: FormalitePrealable.associations.acteRegistre,
                where: acteRegistreWhereOptions,
                required: acteRegistreAssociationRequired,
            }
        ]

        let includes: Includeable[] = [
            { association: FormalitePrealable.associations.partiesPrenantes, separate: true, include: PartiePrenanteController.GET_INCLUDES },
            { 
                association: FormalitePrealable.associations.informationsPropriete,
                where: informationsProprieteWhereOptions,
                required: informationsProprieteAssociationRequired,
                include: InformationsProprieteController.GET_INCLUDES
            },
            { 
                association: FormalitePrealable.associations.situationPropriete,
                where: situationProprieteWhereOptions,
                required: situationProprieteAssociationRequired,
                include: SituationProprieteController.GET_INCLUDES
            },
            FormalitePrealable.associations.publicationDemandes,
            FormalitePrealable.associations.bornage,
            FormalitePrealable.associations.procedureJudiciaire,
            FormalitePrealable.associations.piecesDeposees,
            {
                association: FormalitePrealable.associations.acteRegistre,
                where: acteRegistreWhereOptions,
                required: acteRegistreAssociationRequired,
                include: [
                    { association: ActeRegistre.associations.dossierRegistre, attributes: ['id', 'nom', 'volume', 'estRegistre'], required: false },
                    ActeRegistre.associations.region,
                    ActeRegistre.associations.centreConservationFonciere,
                ]
            }
        ]

        return [filterIncludes, includes]
    }
}
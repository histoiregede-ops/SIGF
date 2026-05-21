import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes, WhereOptions } from "sequelize";
import { SituationPropriete } from "../models/SituationPropriete";
import RegionController from "../../commun/controllers/RegionController";
import { Region } from "../../commun/models/Region";

export default class SituationProprieteController {

    constructor() { }

    static async getAllSituationsPropriete(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<SituationPropriete>> = {}

        try {
            let situationsPropriete: SituationPropriete[];
            situationsPropriete = await SituationPropriete.findAll(options);

            return res.status(200).send(situationsPropriete);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getSituationPropriete(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<SituationPropriete>> = {}
        options = { where: { id: req.params.id } }

        try {
            const situationPropriete: SituationPropriete | null = await SituationPropriete.findOne(options);

            if (situationPropriete == null)
                return res.status(404).json({ success: false, message: "SituationPropriete non trouvée" });

            return res.status(200).send(situationPropriete);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createSituationPropriete(req: Request, res: Response): Promise<any> {

        // let situationPropriete: SituationPropriete | null = await SituationPropriete.findOne({ where: { libelle: req.body.libelle } });

        // if (situationPropriete != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
            let situationPropriete: SituationPropriete = new SituationPropriete();
            situationPropriete.lieudit = req.body.lieudit
            situationPropriete.rue = req.body.rue
            situationPropriete.regionId = req.body.regionId
            situationPropriete.prefectureId = req.body.prefectureId
            situationPropriete.communeId = req.body.communeId
            situationPropriete.villageId = req.body.villageId
            situationPropriete.villeId = req.body.villeId
            situationPropriete.cantonId = req.body.cantonId
            situationPropriete.quartierId = req.body.quartierId
            situationPropriete.formalitePrealableId = req.body.formalitePrealableId

            await situationPropriete.save()
                .then((situationPropriete) => {
                    return res.status(201).send(situationPropriete);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        // }

        // return null
    }

    static async updateSituationPropriete(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<SituationPropriete>> = { where: { id: req.params.id } }

        let situationPropriete: SituationPropriete | null = await SituationPropriete.findOne(options);
        if (situationPropriete != null) {

            await situationPropriete.update({
                regionId: req.body.regionId,
                prefectureId: req.body.prefectureId,
                communeId: req.body.communeId,
                villageId: req.body.villageId,
                villeId: req.body.villeId,
                cantonId: req.body.cantonId,
                quartierId: req.body.quartierId,
                lieudit: req.body.lieudit,
                rue: req.body.rue,
                formalitePrealableId: req.body.formalitePrealableId,
            })
                .then(async (situationPropriete) => {
                    return res.status(200).send(situationPropriete);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "SituationPropriete non trouvée" });
        }

        return null
    }

    static async deleteSituationPropriete(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<SituationPropriete>> = { where: { id: req.params.id } }

        let situationPropriete: SituationPropriete | null = await SituationPropriete.findOne(options);
        if (situationPropriete) {
            await situationPropriete.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "SituationPropriete supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "SituationPropriete non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<SituationPropriete>> = {}

        await SituationPropriete.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static GET_INCLUDES = [
        // { association: SituationPropriete.associations.region, include: [RegionController.GET_INCLUDES] },
        { association: SituationPropriete.associations.region, include: [] },
        SituationPropriete.associations.prefecture,
        SituationPropriete.associations.commune,
        SituationPropriete.associations.village,
        SituationPropriete.associations.ville,
        SituationPropriete.associations.canton,
        SituationPropriete.associations.quartier,
    ]
    
    // static get_includes(req: Request): Includeable[] {
    //     // Filtres de l'utilisateur
    //     /// - Filtres Region
    //     let regionWhereOptions: WhereOptions<InferAttributes<Region>> = {}
    //     if (req.query.region) regionWhereOptions.libelle = req.query.region as string;

    //     /// - Filtres Prefecture
    //     let prefectureWhereOptions: WhereOptions<InferAttributes<Prefecture>> = {}
    //     if (req.query.prefecture) prefectureWhereOptions.libelle = req.query.prefecture as string;
        
    //     /// - Filtres Commune
    //     let communeWhereOptions: WhereOptions<InferAttributes<Commune>> = {}
    //     if (req.query.commune) communeWhereOptions.libelle = req.query.commune as string;
        
    //     /// - Filtres Canton
    //     let cantonWhereOptions: WhereOptions<InferAttributes<Canton>> = {}
    //     if (req.query.canton) cantonWhereOptions.libelle = req.query.canton as string;
        
    //     /// - Filtres Village
    //     let villageWhereOptions: WhereOptions<InferAttributes<Village>> = {}
    //     if (req.query.village) villageWhereOptions.libelle = req.query.village as string;
        
    //     /// - Filtres Ville
    //     let villeWhereOptions: WhereOptions<InferAttributes<Ville>> = {}
    //     if (req.query.ville) villeWhereOptions.libelle = req.query.ville as string;
        
    //     /// - Filtres Quartier
    //     let quartierWhereOptions: WhereOptions<InferAttributes<Quartier>> = {}
    //     if (req.query.quartier) quartierWhereOptions.libelle = req.query.quartier as string;

    //     if (req.query.lieudit) regionWhereOptions.libelle = req.query.lieudit as string;
    //     if (req.query.rue) regionWhereOptions.libelle = req.query.rue as string;

    //     // Application des filtres
    //     const regionAssociationRequired: boolean = Object.keys(regionWhereOptions).length > 0
        
    //     let includes: Includeable[] = [
    //         { association: SituationPropriete.associations.region, include: [] },
    //         SituationPropriete.associations.prefecture,
    //         SituationPropriete.associations.commune,
    //         SituationPropriete.associations.village,
    //         SituationPropriete.associations.ville,
    //         SituationPropriete.associations.canton,
    //         SituationPropriete.associations.quartier,
    //     ]

    //     return includes
    // }
}
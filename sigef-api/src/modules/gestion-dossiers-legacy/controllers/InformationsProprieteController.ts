import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes, WhereOptions } from "sequelize";
import { InformationsPropriete } from "../models/InformationsPropriete";
import { NatureEtatImmeuble } from "../models/NatureEtatImmeuble";
import { NatureTypeImmeuble } from "../models/NatureTypeImmeuble";

export default class InformationsProprieteController {

    constructor() { }

    static async getAllInformationsProprietes(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<InformationsPropriete>> = {}

        try {
            let informationsPropriete: InformationsPropriete[];
            informationsPropriete = await InformationsPropriete.findAll(options);

            return res.status(200).send(informationsPropriete);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getInformationsPropriete(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<InformationsPropriete>> = {}
        options = { where: { id: req.params.id } }

        try {
            const informationsPropriete: InformationsPropriete | null = await InformationsPropriete.findOne(options);

            if (informationsPropriete == null)
                return res.status(404).json({ success: false, message: "InformationsPropriete non trouvée" });

            return res.status(200).send(informationsPropriete);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createInformationsPropriete(req: Request, res: Response): Promise<any> {

        // let informationsPropriete: InformationsPropriete | null = await InformationsPropriete.findOne({ where: { libelle: req.body.libelle } });

        // if (informationsPropriete != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let informationsPropriete: InformationsPropriete = new InformationsPropriete();
        informationsPropriete.description = req.body.description
        informationsPropriete.contenanceEnHectare = req.body.contenanceEnHectare
        informationsPropriete.contenanceEnAre = req.body.contenanceEnAre
        informationsPropriete.contenanceEnCentiare = req.body.contenanceEnCentiare
        informationsPropriete.valeurVenale = req.body.valeurVenale
        informationsPropriete.valeurLocative = req.body.valeurLocative
        informationsPropriete.natureTypeImmeubleId = req.body.natureTypeImmeubleId
        informationsPropriete.natureEtatImmeubleId = req.body.natureEtatImmeubleId
        informationsPropriete.formalitePrealableId = req.body.formalitePrealableId

        await informationsPropriete.save()
            .then((informationsPropriete) => {
                return res.status(201).send(informationsPropriete);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updateInformationsPropriete(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<InformationsPropriete>> = { where: { id: req.params.id } }

        let informationsPropriete: InformationsPropriete | null = await InformationsPropriete.findOne(options);
        if (informationsPropriete != null) {

            await informationsPropriete.update({
                description: req.body.description,
                contenanceEnHectare: req.body.contenanceEnHectare,
                contenanceEnAre: req.body.contenanceEnAre,
                contenanceEnCentiare: req.body.contenanceEnCentiare,
                valeurVenale: req.body.valeurVenale,
                valeurLocative: req.body.valeurLocative,
                natureTypeImmeubleId: req.body.natureTypeImmeubleId,
                natureEtatImmeubleId: req.body.natureEtatImmeubleId,
                formalitePrealableId: req.body.formalitePrealableId,
            })
                .then(async (informationsPropriete) => {
                    return res.status(200).send(informationsPropriete);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "InformationsPropriete non trouvée" });
        }

        return null
    }

    static async deleteInformationsPropriete(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<InformationsPropriete>> = { where: { id: req.params.id } }

        let informationsPropriete: InformationsPropriete | null = await InformationsPropriete.findOne(options);
        if (informationsPropriete) {
            await informationsPropriete.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "InformationsPropriete supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "InformationsPropriete non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<InformationsPropriete>> = {}

        await InformationsPropriete.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static GET_INCLUDES = [
        InformationsPropriete.associations.natureTypeImmeuble,
        InformationsPropriete.associations.natureEtatImmeuble,
    ]

    static get_includes(req: Request): Includeable[] {
        // Filtres de l'utilisateur
        /// - Filtres NatureTypeImmeuble
        let natureTypeImmeubleWhereOptions: WhereOptions<InferAttributes<NatureTypeImmeuble>> = {}
        if (req.query.type) natureTypeImmeubleWhereOptions.libelle = req.query.type as string;

        /// - Filtres NatureEtatImmeuble
        let natureEtatImmeubleWhereOptions: WhereOptions<InferAttributes<NatureEtatImmeuble>> = {}
        if (req.query.etat) natureEtatImmeubleWhereOptions.libelle = req.query.etat as string;

        // Application des filtres
        const natureTypeImmeubleAssociationRequired: boolean = Object.keys(natureTypeImmeubleWhereOptions).length > 0
        const natureEtatImmeubleAssociationRequired: boolean = Object.keys(natureEtatImmeubleWhereOptions).length > 0
        
        let includes: Includeable[] = [
            { association: InformationsPropriete.associations.natureTypeImmeuble, where: natureTypeImmeubleWhereOptions, required: natureTypeImmeubleAssociationRequired },
            { association: InformationsPropriete.associations.natureEtatImmeuble, where: natureEtatImmeubleWhereOptions, required: natureEtatImmeubleAssociationRequired },
        ]

        return includes
    }
}
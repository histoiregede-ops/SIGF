import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes } from "sequelize";
import { PartiePrenante } from "../models/PartiePrenante";
import GroupePersonnePhysiqueController from "./GroupePersonnePhysiqueController";
import PersonnePhysiqueController from "./PersonnePhysiqueController";
import GroupeConjointsController from "./GroupeConjointsController";
import GroupeHeritiersController from "./GroupeHeritiersController";
import PersonneMoraleController from "./PersonneMoraleController";
import PersonneRelationLegaleController from "./PersonneRelationLegaleController";

export default class PartiePrenanteController {

    constructor() { }

    static async getAllPartiesPrenantes(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PartiePrenante>> = {
            include: PartiePrenanteController.GET_INCLUDES
        }

        if (req.query.formalitePrealableId) {
            options.where = { formalitePrealableId: req.query.formalitePrealableId as string }
        }

        if (req.query.depotId) {
            options.where = { depotId: req.query.depotId as string }
        }

        if (req.query.oppositionId) {
            options.where = { oppositionId: req.query.oppositionId as string }
        }

        // if (req.query.formalitePrealableId) {
        //     options.where = { formalitePrealableId: req.query.formalitePrealableId as string }
        // }

        try {
            let partiesPrenantes: PartiePrenante[];
            partiesPrenantes = await PartiePrenante.findAll(options);

            return res.status(200).send(partiesPrenantes);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getPartiePrenante(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PartiePrenante>> = {}
        options = { where: { id: req.params.id } }

        try {
            const partiePrenante: PartiePrenante | null = await PartiePrenante.findOne(options);

            if (partiePrenante == null)
                return res.status(404).json({ success: false, message: "PartiePrenante non trouvée" });

            return res.status(200).send(partiePrenante);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createPartiePrenante(req: Request, res: Response): Promise<any> {

        // let partiePrenante: PartiePrenante | null = await PartiePrenante.findOne({ where: { libelle: req.body.libelle } });

        // if (partiePrenante != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let partiePrenante: PartiePrenante = new PartiePrenante();
        partiePrenante = req.body

        await PartiePrenante.create(partiePrenante, { include: PartiePrenanteController.INCLUDES })
            .then((partiePrenante) => {
                return res.status(201).send(partiePrenante);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updatePartiePrenante(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PartiePrenante>> = { where: { id: req.params.id } }

        let partiePrenante: PartiePrenante | null = await PartiePrenante.findOne(options);
        if (partiePrenante != null) {

            await partiePrenante.update({
                type: req.body.type,
                formalitePrealableId: req.body.formalitePrealableId,
                oppositionId: req.body.oppositionId,
            })
                .then(async (partiePrenante) => {
                    return res.status(200).send(partiePrenante);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PartiePrenante non trouvée" });
        }

        return null
    }

    static async deletePartiePrenante(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PartiePrenante>> = { where: { id: req.params.id } }

        let partiePrenante: PartiePrenante | null = await PartiePrenante.findOne(options);
        if (partiePrenante) {
            await partiePrenante.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "PartiePrenante supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PartiePrenante non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<PartiePrenante>> = {}

        await PartiePrenante.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES: Includeable[] = [
        { association: PartiePrenante.associations.personnePhysique, include: PersonnePhysiqueController.INCLUDES },
        { association: PartiePrenante.associations.personneMorale, include: PersonneMoraleController.INCLUDES },
        { association: PartiePrenante.associations.personneRelationLegale, include: PersonneRelationLegaleController.INCLUDES },
        { association: PartiePrenante.associations.groupePersonnePhysique, include: GroupePersonnePhysiqueController.INCLUDES },
        { association: PartiePrenante.associations.groupeConjoints, include: GroupeConjointsController.INCLUDES },
        { association: PartiePrenante.associations.groupeHeritiers, include: GroupeHeritiersController.INCLUDES },
    ]

    static GET_INCLUDES: Includeable[] = [
        { association: PartiePrenante.associations.personnePhysique, include: PersonnePhysiqueController.GET_INCLUDES },
        { association: PartiePrenante.associations.personneMorale, include: PersonneMoraleController.GET_INCLUDES },
        { association: PartiePrenante.associations.personneRelationLegale, include: PersonneRelationLegaleController.GET_INCLUDES },
        { association: PartiePrenante.associations.groupePersonnePhysique, include: GroupePersonnePhysiqueController.GET_INCLUDES },
        { association: PartiePrenante.associations.groupeConjoints, include: GroupeConjointsController.GET_INCLUDES },
        { association: PartiePrenante.associations.groupeHeritiers, include: GroupeHeritiersController.GET_INCLUDES },
    ]
}
import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes } from "sequelize";
import { GroupePersonnePhysique } from "../models/GroupePersonnePhysique";
import PersonneMembreController from "./PersonneMembreController";

export default class GroupePersonnePhysiqueController {

    constructor() { }

    static async getAllGroupesPersonnesPhysiques(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<GroupePersonnePhysique>> = {}

        try {
            let groupesPersonnesPhysiques: GroupePersonnePhysique[];
            groupesPersonnesPhysiques = await GroupePersonnePhysique.findAll(options);

            return res.status(200).send(groupesPersonnesPhysiques);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getGroupePersonnePhysique(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<GroupePersonnePhysique>> = {}
        options = { where: { id: req.params.id } }

        try {
            const groupePersonnePhysique: GroupePersonnePhysique | null = await GroupePersonnePhysique.findOne(options);

            if (groupePersonnePhysique == null)
                return res.status(404).json({ success: false, message: "GroupePersonnePhysique non trouvée" });

            return res.status(200).send(groupePersonnePhysique);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createGroupePersonnePhysique(req: Request, res: Response): Promise<any> {

        // let groupePersonnePhysique: GroupePersonnePhysique | null = await GroupePersonnePhysique.findOne({ where: { libelle: req.body.libelle } });

        // if (groupePersonnePhysique != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let groupePersonnePhysique: GroupePersonnePhysique = new GroupePersonnePhysique();
        groupePersonnePhysique.typeLienGroupeId = req.body.typeLienGroupeId
        groupePersonnePhysique.partiePrenanteId = req.body.partiePrenanteId

        await GroupePersonnePhysique.create(groupePersonnePhysique, { include: GroupePersonnePhysiqueController.INCLUDES })
            .then((groupePersonnePhysique) => {
                return res.status(201).send(groupePersonnePhysique);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updateGroupePersonnePhysique(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<GroupePersonnePhysique>> = { where: { id: req.params.id } }

        let groupePersonnePhysique: GroupePersonnePhysique | null = await GroupePersonnePhysique.findOne(options);
        if (groupePersonnePhysique != null) {

            await groupePersonnePhysique.update({
                typeLienGroupeId: req.body.typeLienGroupeId,
                partiePrenanteId: req.body.partiePrenanteId,
            })
                .then(async (groupePersonnePhysique) => {
                    return res.status(200).send(groupePersonnePhysique);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "GroupePersonnePhysique non trouvée" });
        }

        return null
    }

    static async deleteGroupePersonnePhysique(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<GroupePersonnePhysique>> = { where: { id: req.params.id } }

        let groupePersonnePhysique: GroupePersonnePhysique | null = await GroupePersonnePhysique.findOne(options);
        if (groupePersonnePhysique) {
            await groupePersonnePhysique.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "GroupePersonnePhysique supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "GroupePersonnePhysique non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<GroupePersonnePhysique>> = {}

        await GroupePersonnePhysique.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES: Includeable[] = [
        { association: GroupePersonnePhysique.associations.personnesMembres, include: PersonneMembreController.INCLUDES }
    ]

    static GET_INCLUDES: Includeable[] = [
        GroupePersonnePhysique.associations.typeLienGroupe,
        { association: GroupePersonnePhysique.associations.personnesMembres, separate: true, include: PersonneMembreController.GET_INCLUDES },
    ]
}
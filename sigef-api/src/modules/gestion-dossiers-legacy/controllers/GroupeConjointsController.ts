import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes } from "sequelize";
import { GroupeConjoints } from "../models/GroupeConjoints";
import PersonneConjointeController from "./PersonneConjointeController";

export default class GroupeConjointsController {

    constructor() { }

    static async getAllGroupesConjoints(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<GroupeConjoints>> = {}

        try {
            let groupesConjoints: GroupeConjoints[];
            groupesConjoints = await GroupeConjoints.findAll(options);

            return res.status(200).send(groupesConjoints);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getGroupeConjoints(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<GroupeConjoints>> = {}
        options = { where: { id: req.params.id } }

        try {
            const groupeConjoints: GroupeConjoints | null = await GroupeConjoints.findOne(options);

            if (groupeConjoints == null)
                return res.status(404).json({ success: false, message: "GroupeConjoints non trouvée" });

            return res.status(200).send(groupeConjoints);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createGroupeConjoints(req: Request, res: Response): Promise<any> {

        // let groupeConjoints: GroupeConjoints | null = await GroupeConjoints.findOne({ where: { libelle: req.body.libelle } });

        // if (groupeConjoints != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
            let groupeConjoints: GroupeConjoints = new GroupeConjoints();
            groupeConjoints.partiePrenanteId = req.body.partiePrenanteId

            await groupeConjoints.save()
                .then((groupeConjoints) => {
                    return res.status(201).send(groupeConjoints);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        // }

        // return null
    }

    static async updateGroupeConjoints(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<GroupeConjoints>> = { where: { id: req.params.id } }

        let groupeConjoints: GroupeConjoints | null = await GroupeConjoints.findOne(options);
        if (groupeConjoints != null) {

            await groupeConjoints.update({
                partiePrenanteId: req.body.partiePrenanteId,
            })
                .then(async (groupeConjoints) => {
                    return res.status(200).send(groupeConjoints);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "GroupeConjoints non trouvée" });
        }

        return null
    }

    static async deleteGroupeConjoints(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<GroupeConjoints>> = { where: { id: req.params.id } }

        let groupeConjoints: GroupeConjoints | null = await GroupeConjoints.findOne(options);
        if (groupeConjoints) {
            await groupeConjoints.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "GroupeConjoints supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "GroupeConjoints non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<GroupeConjoints>> = {}

        await GroupeConjoints.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES: Includeable[] = [
        { association: GroupeConjoints.associations.personnesConjointes, include: PersonneConjointeController.INCLUDES }
    ]

    static GET_INCLUDES: Includeable[] = [
        { association: GroupeConjoints.associations.personnesConjointes, separate: true, include: PersonneConjointeController.GET_INCLUDES }
    ]
}
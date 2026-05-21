import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes } from "sequelize";
import { GroupeHeritiers } from "../models/GroupeHeritiers";
import PersonneDisposantController from "./PersonneDisposantController";
import ConjointPersonneDisposantController from "./ConjointPersonneDisposantController";

export default class GroupeHeritiersController {

    constructor() { }

    static async getAllGroupesHeritiers(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<GroupeHeritiers>> = {}

        try {
            let groupesHeritiers: GroupeHeritiers[];
            groupesHeritiers = await GroupeHeritiers.findAll(options);

            return res.status(200).send(groupesHeritiers);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getGroupeHeritiers(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<GroupeHeritiers>> = {}
        options = { where: { id: req.params.id } }

        try {
            const groupeHeritiers: GroupeHeritiers | null = await GroupeHeritiers.findOne(options);

            if (groupeHeritiers == null)
                return res.status(404).json({ success: false, message: "GroupeHeritiers non trouvée" });

            return res.status(200).send(groupeHeritiers);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createGroupeHeritiers(req: Request, res: Response): Promise<any> {

        // let groupeHeritiers: GroupeHeritiers | null = await GroupeHeritiers.findOne({ where: { libelle: req.body.libelle } });

        // if (groupeHeritiers != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let groupeHeritiers: GroupeHeritiers = new GroupeHeritiers();
        groupeHeritiers.termesSuccession = req.body.termesSuccession
        groupeHeritiers.description = req.body.partiePrenanteId
        groupeHeritiers.partiePrenanteId = req.body.partiePrenanteId

        await GroupeHeritiers.create(groupeHeritiers, { include: GroupeHeritiersController.INCLUDES })
            .then((groupeHeritiers) => {
                return res.status(201).send(groupeHeritiers);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updateGroupeHeritiers(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<GroupeHeritiers>> = { where: { id: req.params.id } }

        let groupeHeritiers: GroupeHeritiers | null = await GroupeHeritiers.findOne(options);
        if (groupeHeritiers != null) {

            await groupeHeritiers.update({
                termesSuccession: req.body.termesSuccession,
                description: req.body.description,
                partiePrenanteId: req.body.partiePrenanteId,
            })
                .then(async (groupeHeritiers) => {
                    return res.status(200).send(groupeHeritiers);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "GroupeHeritiers non trouvée" });
        }

        return null
    }

    static async deleteGroupeHeritiers(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<GroupeHeritiers>> = { where: { id: req.params.id } }

        let groupeHeritiers: GroupeHeritiers | null = await GroupeHeritiers.findOne(options);
        if (groupeHeritiers) {
            await groupeHeritiers.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "GroupeHeritiers supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "GroupeHeritiers non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<GroupeHeritiers>> = {}

        await GroupeHeritiers.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES: Includeable[] = [
        { association: GroupeHeritiers.associations.personneDisposant, include: PersonneDisposantController.INCLUDES },
        { association: GroupeHeritiers.associations.conjointsPersonneDisposant, include: ConjointPersonneDisposantController.INCLUDES },
    ]

    static GET_INCLUDES: Includeable[] = [
        { association: GroupeHeritiers.associations.personneDisposant, include: PersonneDisposantController.GET_INCLUDES },
        { association: GroupeHeritiers.associations.conjointsPersonneDisposant, separate: true, include: ConjointPersonneDisposantController.GET_INCLUDES },
    ]
}
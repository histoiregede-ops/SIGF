import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes } from "sequelize";
import { PersonneMembre } from "../models/PersonneMembre";
import PersonnePhysiqueController from "./PersonnePhysiqueController";

export default class PersonneMembreController {

    constructor() { }

    static async getAllPersonnesMembres(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneMembre>> = {}

        try {
            let personnesMembres: PersonneMembre[];
            personnesMembres = await PersonneMembre.findAll(options);

            return res.status(200).send(personnesMembres);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getPersonneMembre(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneMembre>> = {}
        options = { where: { id: req.params.id } }

        try {
            const personneMembre: PersonneMembre | null = await PersonneMembre.findOne(options);

            if (personneMembre == null)
                return res.status(404).json({ success: false, message: "PersonneMembre non trouvée" });

            return res.status(200).send(personneMembre);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createPersonneMembre(req: Request, res: Response): Promise<any> {

        // let personneMembre: PersonneMembre | null = await PersonneMembre.findOne({ where: { libelle: req.body.libelle } });

        // if (personneMembre != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let personneMembre: PersonneMembre = new PersonneMembre();
        personneMembre.personnePhysiqueId = req.body.personnePhysiqueId
        personneMembre.groupePersonnePhysiqueId = req.body.groupePersonnePhysiqueId

        await PersonneMembre.create(personneMembre, { include: PersonneMembreController.INCLUDES })
            .then((personneMembre) => {
                return res.status(201).send(personneMembre);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updatePersonneMembre(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneMembre>> = { where: { id: req.params.id } }

        let personneMembre: PersonneMembre | null = await PersonneMembre.findOne(options);
        if (personneMembre != null) {

            await personneMembre.update({
                personnePhysiqueId: req.body.personnePhysiqueId,
                groupePersonnePhysiqueId: req.body.groupePersonnePhysiqueId,
            })
                .then(async (personneMembre) => {
                    return res.status(200).send(personneMembre);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PersonneMembre non trouvée" });
        }

        return null
    }

    static async deletePersonneMembre(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneMembre>> = { where: { id: req.params.id } }

        let personneMembre: PersonneMembre | null = await PersonneMembre.findOne(options);
        if (personneMembre) {
            await personneMembre.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "PersonneMembre supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PersonneMembre non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<PersonneMembre>> = {}

        await PersonneMembre.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES: Includeable[] = [
        { association: PersonneMembre.associations.personnePhysique, include: PersonnePhysiqueController.INCLUDES }
    ]

    static GET_INCLUDES: Includeable[] = [
        { association: PersonneMembre.associations.personnePhysique, include: PersonnePhysiqueController.GET_INCLUDES }
    ]
}
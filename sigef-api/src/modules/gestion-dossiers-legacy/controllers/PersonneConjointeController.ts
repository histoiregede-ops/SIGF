import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes } from "sequelize";
import { PersonneConjointe } from "../models/PersonneConjointe";
import PersonnePhysiqueController from "./PersonnePhysiqueController";

export default class PersonneConjointeController {

    constructor() { }

    static async getAllPersonnesConjointes(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneConjointe>> = {}

        try {
            let personnesConjointes: PersonneConjointe[];
            personnesConjointes = await PersonneConjointe.findAll(options);

            return res.status(200).send(personnesConjointes);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getPersonneConjointe(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneConjointe>> = {}
        options = { where: { id: req.params.id } }

        try {
            const personneConjointe: PersonneConjointe | null = await PersonneConjointe.findOne(options);

            if (personneConjointe == null)
                return res.status(404).json({ success: false, message: "PersonneConjointe non trouvée" });

            return res.status(200).send(personneConjointe);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createPersonneConjointe(req: Request, res: Response): Promise<any> {

        // let personneConjointe: PersonneConjointe | null = await PersonneConjointe.findOne({ where: { libelle: req.body.libelle } });

        // if (personneConjointe != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let personneConjointe: PersonneConjointe = new PersonneConjointe();
        personneConjointe.personnePhysiqueId = req.body.personnePhysiqueId
        personneConjointe.groupeConjointsId = req.body.groupeConjointsId

        await PersonneConjointe.create(personneConjointe, { include: PersonneConjointeController.INCLUDES })
            .then((personneConjointe) => {
                return res.status(201).send(personneConjointe);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updatePersonneConjointe(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneConjointe>> = { where: { id: req.params.id } }

        let personneConjointe: PersonneConjointe | null = await PersonneConjointe.findOne(options);
        if (personneConjointe != null) {

            await personneConjointe.update({
                personnePhysiqueId: req.body.personnePhysiqueId,
                groupeConjointsId: req.body.groupeConjointsId,
            })
                .then(async (personneConjointe) => {
                    return res.status(200).send(personneConjointe);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PersonneConjointe non trouvée" });
        }

        return null
    }

    static async deletePersonneConjointe(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneConjointe>> = { where: { id: req.params.id } }

        let personneConjointe: PersonneConjointe | null = await PersonneConjointe.findOne(options);
        if (personneConjointe) {
            await personneConjointe.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "PersonneConjointe supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PersonneConjointe non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<PersonneConjointe>> = {}

        await PersonneConjointe.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES: Includeable[] = [
        { association: PersonneConjointe.associations.personnePhysique, include: PersonnePhysiqueController.INCLUDES }
    ]

    static GET_INCLUDES: Includeable[] = [
        { association: PersonneConjointe.associations.personnePhysique, include: PersonnePhysiqueController.GET_INCLUDES }
    ]

}
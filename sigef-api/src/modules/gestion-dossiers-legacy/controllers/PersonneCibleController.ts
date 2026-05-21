import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes } from "sequelize";
import { PersonneCible } from "../models/PersonneCible";
import { PersonnePhysique } from "../models/PersonnePhysique";

export default class PersonneCibleController {

    constructor() { }

    static async getAllPersonnesCibles(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneCible>> = {}

        try {
            let personnesCibles: PersonneCible[];
            personnesCibles = await PersonneCible.findAll(options);

            return res.status(200).send(personnesCibles);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getPersonneCible(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneCible>> = {}
        options = { where: { id: req.params.id } }

        try {
            const personneCible: PersonneCible | null = await PersonneCible.findOne(options);

            if (personneCible == null)
                return res.status(404).json({ success: false, message: "PersonneCible non trouvée" });

            return res.status(200).send(personneCible);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createPersonneCible(req: Request, res: Response): Promise<any> {

        // let personneCible: PersonneCible | null = await PersonneCible.findOne({ where: { libelle: req.body.libelle } });

        // if (personneCible != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let personneCible: PersonneCible = new PersonneCible();
        personneCible.personnePhysiqueId = req.body.personnePhysiqueId
        personneCible.personneRelationLegaleId = req.body.personneRelationLegaleId

        await PersonneCible.create(personneCible, { include: PersonneCibleController.GET_INCLUDES })
            .then((personneCible) => {
                return res.status(201).send(personneCible);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updatePersonneCible(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneCible>> = { where: { id: req.params.id } }

        let personneCible: PersonneCible | null = await PersonneCible.findOne(options);
        if (personneCible != null) {

            await personneCible.update({
                personnePhysiqueId: req.body.personnePhysiqueId,
                personneRelationLegaleId: req.body.personneRelationLegaleId,
            })
                .then(async (personneCible) => {
                    return res.status(200).send(personneCible);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PersonneCible non trouvée" });
        }

        return null
    }

    static async deletePersonneCible(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneCible>> = { where: { id: req.params.id } }

        let personneCible: PersonneCible | null = await PersonneCible.findOne(options);
        if (personneCible) {
            await personneCible.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "PersonneCible supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PersonneCible non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<PersonneCible>> = {}

        await PersonneCible.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES: Includeable[] = [PersonneCible.associations.personnePhysique]

    static GET_INCLUDES: Includeable[] = [
        {
            association: PersonneCible.associations.personnePhysique, include: [
                PersonnePhysique.associations.civilite,
                PersonnePhysique.associations.nationalite,
                PersonnePhysique.associations.profession,
            ]
        }
    ]
}
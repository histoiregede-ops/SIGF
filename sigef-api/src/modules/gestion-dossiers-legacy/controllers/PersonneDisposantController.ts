import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes } from "sequelize";
import { PersonneDisposant } from "../models/PersonneDisposant";
import PersonnePhysiqueController from "./PersonnePhysiqueController";

export default class PersonneDisposantController {

    constructor() { }

    static async getAllPersonnesDisposants(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneDisposant>> = {}

        try {
            let personnesDisposants: PersonneDisposant[];
            personnesDisposants = await PersonneDisposant.findAll(options);

            return res.status(200).send(personnesDisposants);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getPersonneDisposant(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneDisposant>> = {}
        options = { where: { id: req.params.id } }

        try {
            const personneDisposant: PersonneDisposant | null = await PersonneDisposant.findOne(options);

            if (personneDisposant == null)
                return res.status(404).json({ success: false, message: "PersonneDisposant non trouvée" });

            return res.status(200).send(personneDisposant);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createPersonneDisposant(req: Request, res: Response): Promise<any> {

        // let personneDisposant: PersonneDisposant | null = await PersonneDisposant.findOne({ where: { libelle: req.body.libelle } });

        // if (personneDisposant != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let personneDisposant: PersonneDisposant = new PersonneDisposant();
        personneDisposant.personnePhysiqueId = req.body.personnePhysiqueId
        personneDisposant.groupeHeritiersId = req.body.groupeHeritiersId

        await PersonneDisposant.create(personneDisposant, { include: PersonneDisposantController.INCLUDES })
            .then((personneDisposant) => {
                return res.status(201).send(personneDisposant);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updatePersonneDisposant(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneDisposant>> = { where: { id: req.params.id } }

        let personneDisposant: PersonneDisposant | null = await PersonneDisposant.findOne(options);
        if (personneDisposant != null) {

            await personneDisposant.update({
                personnePhysiqueId: req.body.personnePhysiqueId,
                groupeHeritiersId: req.body.groupeHeritiersId,
            })
                .then(async (personneDisposant) => {
                    return res.status(200).send(personneDisposant);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PersonneDisposant non trouvée" });
        }

        return null
    }

    static async deletePersonneDisposant(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneDisposant>> = { where: { id: req.params.id } }

        let personneDisposant: PersonneDisposant | null = await PersonneDisposant.findOne(options);
        if (personneDisposant) {
            await personneDisposant.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "PersonneDisposant supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PersonneDisposant non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<PersonneDisposant>> = {}

        await PersonneDisposant.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES: Includeable[] = [
        { association: PersonneDisposant.associations.personnePhysique, include: PersonnePhysiqueController.INCLUDES }
    ]

    static GET_INCLUDES: Includeable[] = [
        { association: PersonneDisposant.associations.personnePhysique, include: PersonnePhysiqueController.GET_INCLUDES }
    ]
}
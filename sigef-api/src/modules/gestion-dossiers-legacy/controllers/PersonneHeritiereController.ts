import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes } from "sequelize";
import { PersonneHeritiere } from "../models/PersonneHeritiere";
import PersonnePhysiqueController from "./PersonnePhysiqueController";

export default class PersonneHeritiereController {

    constructor() { }

    static async getAllPersonnesHeritieres(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneHeritiere>> = {}

        try {
            let personnesHeritieres: PersonneHeritiere[];
            personnesHeritieres = await PersonneHeritiere.findAll(options);

            return res.status(200).send(personnesHeritieres);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getPersonneHeritiere(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneHeritiere>> = {}
        options = { where: { id: req.params.id } }

        try {
            const personneHeritiere: PersonneHeritiere | null = await PersonneHeritiere.findOne(options);

            if (personneHeritiere == null)
                return res.status(404).json({ success: false, message: "PersonneHeritiere non trouvée" });

            return res.status(200).send(personneHeritiere);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createPersonneHeritiere(req: Request, res: Response): Promise<any> {

        // let personneHeritiere: PersonneHeritiere | null = await PersonneHeritiere.findOne({ where: { libelle: req.body.libelle } });

        // if (personneHeritiere != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let personneHeritiere: PersonneHeritiere = new PersonneHeritiere();
        personneHeritiere.personnePhysiqueId = req.body.personnePhysiqueId
        personneHeritiere.conjointPersonneDisposantId = req.body.conjointPersonneDisposantId

        await PersonneHeritiere.create(personneHeritiere, { include: PersonneHeritiereController.INCLUDES })
            .then((personneHeritiere) => {
                return res.status(201).send(personneHeritiere);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updatePersonneHeritiere(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneHeritiere>> = { where: { id: req.params.id } }

        let personneHeritiere: PersonneHeritiere | null = await PersonneHeritiere.findOne(options);
        if (personneHeritiere != null) {

            await personneHeritiere.update({
                personnePhysiqueId: req.body.personnePhysiqueId,
                conjointPersonneDisposantId: req.body.conjointPersonneDisposantId,
            })
                .then(async (personneHeritiere) => {
                    return res.status(200).send(personneHeritiere);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PersonneHeritiere non trouvée" });
        }

        return null
    }

    static async deletePersonneHeritiere(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneHeritiere>> = { where: { id: req.params.id } }

        let personneHeritiere: PersonneHeritiere | null = await PersonneHeritiere.findOne(options);
        if (personneHeritiere) {
            await personneHeritiere.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "PersonneHeritiere supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PersonneHeritiere non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<PersonneHeritiere>> = {}

        await PersonneHeritiere.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES: Includeable[] = [
        { association: PersonneHeritiere.associations.personnePhysique, include: PersonnePhysiqueController.INCLUDES }
    ]

    static GET_INCLUDES: Includeable[] = [
        { association: PersonneHeritiere.associations.personnePhysique, include: PersonnePhysiqueController.GET_INCLUDES }
    ]
}
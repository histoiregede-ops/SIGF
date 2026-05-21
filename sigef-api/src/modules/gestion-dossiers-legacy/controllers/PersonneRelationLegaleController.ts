import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes } from "sequelize";
import { PersonneRelationLegale } from "../models/PersonneRelationLegale";
import { PersonneCible } from "../models/PersonneCible";
import { PersonnePhysique } from "../models/PersonnePhysique";
import PersonneCibleController from "./PersonneCibleController";

export default class PersonneRelationLegaleController {

    constructor() { }

    static async getAllPersonnesRelationLegale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneRelationLegale>> = {}

        try {
            let personnesRelationLegale: PersonneRelationLegale[];
            personnesRelationLegale = await PersonneRelationLegale.findAll(options);

            return res.status(200).send(personnesRelationLegale);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getPersonneRelationLegale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneRelationLegale>> = {}
        options = { where: { id: req.params.id } }

        try {
            const personneRelationLegale: PersonneRelationLegale | null = await PersonneRelationLegale.findOne(options);

            if (personneRelationLegale == null)
                return res.status(404).json({ success: false, message: "PersonneRelationLegale non trouvée" });

            return res.status(200).send(personneRelationLegale);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createPersonneRelationLegale(req: Request, res: Response): Promise<any> {

        // let personneRelationLegale: PersonneRelationLegale | null = await PersonneRelationLegale.findOne({ where: { libelle: req.body.libelle } });

        // if (personneRelationLegale != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let personneRelationLegale: PersonneRelationLegale = new PersonneRelationLegale();
        personneRelationLegale.typeRelationLegaleId = req.body.typeRelationLegaleId
        personneRelationLegale.partiePrenanteId = req.body.partiePrenanteId

        await PersonneRelationLegale.create(personneRelationLegale, { include: PersonneRelationLegaleController.INCLUDES })
            .then((personneRelationLegale) => {
                return res.status(201).send(personneRelationLegale);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updatePersonneRelationLegale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneRelationLegale>> = { where: { id: req.params.id } }

        let personneRelationLegale: PersonneRelationLegale | null = await PersonneRelationLegale.findOne(options);
        if (personneRelationLegale != null) {

            await personneRelationLegale.update({
                typeRelationLegaleId: req.body.typeRelationLegaleId,
                partiePrenanteId: req.body.partiePrenanteId,
            })
                .then(async (personneRelationLegale) => {
                    return res.status(200).send(personneRelationLegale);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PersonneRelationLegale non trouvée" });
        }

        return null
    }

    static async deletePersonneRelationLegale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneRelationLegale>> = { where: { id: req.params.id } }

        let personneRelationLegale: PersonneRelationLegale | null = await PersonneRelationLegale.findOne(options);
        if (personneRelationLegale) {
            await personneRelationLegale.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "PersonneRelationLegale supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PersonneRelationLegale non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<PersonneRelationLegale>> = {}

        await PersonneRelationLegale.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES: Includeable[] = [
        { association: PersonneRelationLegale.associations.personneCible, include: PersonneCibleController.INCLUDES }
    ]

    static GET_INCLUDES: Includeable[] = [
        PersonneRelationLegale.associations.typeRelationLegale,
        {  association: PersonneRelationLegale.associations.personneCible, include: PersonneCibleController.GET_INCLUDES }
    ]
}
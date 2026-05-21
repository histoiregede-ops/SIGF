import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes } from "sequelize";
import { PersonneMorale } from "../models/PersonneMorale";
import RepresentantPersonneMoraleController from "./RepresentantPersonneMoraleController";

export default class PersonneMoraleController {

    constructor() { }

    static async getAllPersonnesMorales(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneMorale>> = {}

        try {
            let personnesMorales: PersonneMorale[];
            personnesMorales = await PersonneMorale.findAll(options);

            return res.status(200).send(personnesMorales);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getPersonneMorale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneMorale>> = {}
        options = { where: { id: req.params.id } }

        try {
            const personneMorale: PersonneMorale | null = await PersonneMorale.findOne(options);

            if (personneMorale == null)
                return res.status(404).json({ success: false, message: "PersonneMorale non trouvée" });

            return res.status(200).send(personneMorale);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createPersonneMorale(req: Request, res: Response): Promise<any> {

        // let personneMorale: PersonneMorale | null = await PersonneMorale.findOne({ where: { libelle: req.body.libelle } });

        // if (personneMorale != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let personneMorale: PersonneMorale = new PersonneMorale();
        personneMorale.raisonSocialeOuDenomination = req.body.raisonSocialeOuDenomination
        personneMorale.adresse = req.body.adresse
        personneMorale.telephone = req.body.telephone
        personneMorale.formeJuridiqueId = req.body.formeJuridiqueId
        personneMorale.secteurActiviteId = req.body.secteurActiviteId
        personneMorale.partiePrenanteId = req.body.partiePrenanteId

        await personneMorale.save()
            .then((personneMorale) => {
                return res.status(201).send(personneMorale);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updatePersonneMorale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneMorale>> = { where: { id: req.params.id } }

        let personneMorale: PersonneMorale | null = await PersonneMorale.findOne(options);
        if (personneMorale != null) {

            await personneMorale.update({
                raisonSocialeOuDenomination: req.body.raisonSocialeOuDenomination,
                adresse: req.body.adresse,
                telephone: req.body.telephone,
                formeJuridiqueId: req.body.formeJuridiqueId,
                secteurActiviteId: req.body.secteurActiviteId,
            })
                .then(async (personneMorale) => {
                    return res.status(200).send(personneMorale);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PersonneMorale non trouvée" });
        }

        return null
    }

    static async deletePersonneMorale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonneMorale>> = { where: { id: req.params.id } }

        let personneMorale: PersonneMorale | null = await PersonneMorale.findOne(options);
        if (personneMorale) {
            await personneMorale.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "PersonneMorale supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PersonneMorale non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<PersonneMorale>> = {}

        await PersonneMorale.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES: Includeable[] = [
        { association: PersonneMorale.associations.representants, include: RepresentantPersonneMoraleController.INCLUDES }
    ]

    static GET_INCLUDES: Includeable[] = [
        PersonneMorale.associations.formeJuridique,
        PersonneMorale.associations.secteurActivite,
        PersonneMorale.associations.typePersonneMorale,
        {
            association: PersonneMorale.associations.representants, separate: true, include: RepresentantPersonneMoraleController.GET_INCLUDES
        }
    ]
}
import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes } from "sequelize";
import { PersonnePhysique } from "../models/PersonnePhysique";
import { RepresentantPersonnePhysique } from "../models/RepresentantPersonnePhysique";
import RepresentantPersonnePhysiqueController from "./RepresentantPersonnePhysiqueController";

export default class PersonnePhysiqueController {

    constructor() { }

    static async getAllPersonnesPhysiques(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonnePhysique>> = {}

        try {
            let personnesPhysiques: PersonnePhysique[];
            personnesPhysiques = await PersonnePhysique.findAll(options);

            return res.status(200).send(personnesPhysiques);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getPersonnePhysique(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonnePhysique>> = {}
        options = { where: { id: req.params.id } }

        try {
            const personnePhysique: PersonnePhysique | null = await PersonnePhysique.findOne(options);

            if (personnePhysique == null)
                return res.status(404).json({ success: false, message: "PersonnePhysique non trouvée" });

            return res.status(200).send(personnePhysique);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createPersonnePhysique(req: Request, res: Response): Promise<any> {

        // let personnePhysique: PersonnePhysique | null = await PersonnePhysique.findOne({ where: { libelle: req.body.libelle } });

        // if (personnePhysique != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let personnePhysique: PersonnePhysique = new PersonnePhysique();
        personnePhysique.nom = req.body.nom
        personnePhysique.prenoms = req.body.prenoms
        personnePhysique.telephone = req.body.telephone
        personnePhysique.adresseDomicile = req.body.adresseDomicile
        personnePhysique.adresseResidence = req.body.adresseResidence
        personnePhysique.anneeNaissance = req.body.anneeNaissance
        personnePhysique.dateNaissance = req.body.dateNaissance
        personnePhysique.lieuNaissance = req.body.lieuNaissance
        personnePhysique.nif = req.body.nif
        personnePhysique.vivant = req.body.vivant
        personnePhysique.nomEpoux = req.body.nomEpoux
        personnePhysique.nomJeuneFille = req.body.nomJeuneFille
        personnePhysique.civiliteId = req.body.civiliteId
        personnePhysique.nationaliteId = req.body.nationaliteId
        personnePhysique.professionId = req.body.professionId
        personnePhysique.partiePrenanteId = req.body.partiePrenanteId

        await PersonnePhysique.create(personnePhysique, { include: PersonnePhysiqueController.INCLUDES })
            .then((personnePhysique) => {
                return res.status(201).send(personnePhysique);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updatePersonnePhysique(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonnePhysique>> = { where: { id: req.params.id } }

        let personnePhysique: PersonnePhysique | null = await PersonnePhysique.findOne(options);
        if (personnePhysique != null) {

            await personnePhysique.update({
                nom: req.body.nom,
                prenoms: req.body.prenoms,
                telephone: req.body.telephone,
                adresseDomicile: req.body.adresseDomicile,
                adresseResidence: req.body.adresseResidence,
                anneeNaissance: req.body.anneeNaissance,
                dateNaissance: req.body.dateNaissance,
                lieuNaissance: req.body.lieuNaissance,
                nif: req.body.nif,
                vivant: req.body.vivant,
                nomEpoux: req.body.nomEpoux,
                nomJeuneFille: req.body.nomJeuneFille,
                civiliteId: req.body.civiliteId,
                nationaliteId: req.body.nationaliteId,
                professionId: req.body.professionId,
            })
                .then(async (personnePhysique) => {
                    return res.status(200).send(personnePhysique);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PersonnePhysique non trouvée" });
        }

        return null
    }

    static async deletePersonnePhysique(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PersonnePhysique>> = { where: { id: req.params.id } }

        let personnePhysique: PersonnePhysique | null = await PersonnePhysique.findOne(options);
        if (personnePhysique) {
            await personnePhysique.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "PersonnePhysique supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PersonnePhysique non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<PersonnePhysique>> = {}

        await PersonnePhysique.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES: Includeable[] = [
        { association: PersonnePhysique.associations.representants, include: RepresentantPersonnePhysiqueController.INCLUDES }
    ]

    static GET_INCLUDES: Includeable[] = [
        PersonnePhysique.associations.civilite,
        PersonnePhysique.associations.nationalite,
        PersonnePhysique.associations.profession,
        {
            association: PersonnePhysique.associations.representants, separate: true, include: RepresentantPersonnePhysiqueController.GET_INCLUDES
        }
    ]
}
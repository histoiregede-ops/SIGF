import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes } from "sequelize";
import { ConjointPersonneDisposant } from "../models/ConjointPersonneDisposant";
import { PersonnePhysique } from "../models/PersonnePhysique";
import PersonnePhysiqueController from "./PersonnePhysiqueController";
import PersonneHeritiereController from "./PersonneHeritiereController";

export default class ConjointPersonneDisposantController {

    constructor() { }

    static async getAllConjointsPersonneDisposant(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<ConjointPersonneDisposant>> = {}

        try {
            let conjointsPersonneDisposant: ConjointPersonneDisposant[];
            conjointsPersonneDisposant = await ConjointPersonneDisposant.findAll(options);

            return res.status(200).send(conjointsPersonneDisposant);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getConjointPersonneDisposant(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<ConjointPersonneDisposant>> = {}
        options = { where: { id: req.params.id } }

        try {
            const conjointPersonneDisposant: ConjointPersonneDisposant | null = await ConjointPersonneDisposant.findOne(options);

            if (conjointPersonneDisposant == null)
                return res.status(404).json({ success: false, message: "ConjointPersonneDisposant non trouvée" });

            return res.status(200).send(conjointPersonneDisposant);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createConjointPersonneDisposant(req: Request, res: Response): Promise<any> {

        // let conjointPersonneDisposant: ConjointPersonneDisposant | null = await ConjointPersonneDisposant.findOne({ where: { libelle: req.body.libelle } });

        // if (conjointPersonneDisposant != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let conjointPersonneDisposant: ConjointPersonneDisposant = new ConjointPersonneDisposant();
        conjointPersonneDisposant.groupeHeritiersId = req.body.groupeHeritiersId
        conjointPersonneDisposant.personnePhysiqueId = req.body.personnePhysiqueId

        await ConjointPersonneDisposant.create(conjointPersonneDisposant, { include: ConjointPersonneDisposantController.INCLUDES })
            .then((conjointPersonneDisposant) => {
                return res.status(201).send(conjointPersonneDisposant);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updateConjointPersonneDisposant(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<ConjointPersonneDisposant>> = { where: { id: req.params.id } }

        let conjointPersonneDisposant: ConjointPersonneDisposant | null = await ConjointPersonneDisposant.findOne(options);
        if (conjointPersonneDisposant != null) {

            await conjointPersonneDisposant.update({
                groupeHeritiersId: req.body.groupeHeritiersId,
                personnePhysiqueId: req.body.personnePhysiqueId,
            })
                .then(async (conjointPersonneDisposant) => {
                    return res.status(200).send(conjointPersonneDisposant);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "ConjointPersonneDisposant non trouvée" });
        }

        return null
    }

    static async deleteConjointPersonneDisposant(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<ConjointPersonneDisposant>> = { where: { id: req.params.id } }

        let conjointPersonneDisposant: ConjointPersonneDisposant | null = await ConjointPersonneDisposant.findOne(options);
        if (conjointPersonneDisposant) {
            await conjointPersonneDisposant.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "ConjointPersonneDisposant supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "ConjointPersonneDisposant non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<ConjointPersonneDisposant>> = {}

        await ConjointPersonneDisposant.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES: Includeable[] = [
        { association: ConjointPersonneDisposant.associations.personnePhysique },
        { association: ConjointPersonneDisposant.associations.personnesHeritieres, include: PersonneHeritiereController.INCLUDES }
    ]

    static GET_INCLUDES: Includeable[] = [
        { association: ConjointPersonneDisposant.associations.personnePhysique, include: PersonnePhysiqueController.GET_INCLUDES },
        { association: ConjointPersonneDisposant.associations.personnesHeritieres, separate: true, include: PersonneHeritiereController.GET_INCLUDES }
    ]
}
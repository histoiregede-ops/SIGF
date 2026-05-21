import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes } from "sequelize";
import { RepresentantPersonneMorale } from "../models/RepresentantPersonneMorale";
import { PersonnePhysique } from "../models/PersonnePhysique";

export default class RepresentantPersonneMoraleController {

    constructor() { }

    static async getAllRepresentantsPersonneMorale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<RepresentantPersonneMorale>> = {}

        try {
            let representantsPersonneMorale: RepresentantPersonneMorale[];
            representantsPersonneMorale = await RepresentantPersonneMorale.findAll(options);

            return res.status(200).send(representantsPersonneMorale);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getRepresentantPersonneMorale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<RepresentantPersonneMorale>> = {}
        options = { where: { id: req.params.id } }

        try {
            const representantPersonneMorale: RepresentantPersonneMorale | null = await RepresentantPersonneMorale.findOne(options);

            if (representantPersonneMorale == null)
                return res.status(404).json({ success: false, message: "RepresentantPersonneMorale non trouvée" });

            return res.status(200).send(representantPersonneMorale);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createRepresentantPersonneMorale(req: Request, res: Response): Promise<any> {

        // let representantPersonneMorale: RepresentantPersonneMorale | null = await RepresentantPersonneMorale.findOne({ where: { libelle: req.body.libelle } });

        // if (representantPersonneMorale != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let representantPersonneMorale: RepresentantPersonneMorale = new RepresentantPersonneMorale();
        representantPersonneMorale.personneMoraleId = req.body.personneMoraleId
        representantPersonneMorale.representantId = req.body.representantId

        await RepresentantPersonneMorale.create(representantPersonneMorale, { include: RepresentantPersonneMoraleController.INCLUDES })
            .then((representantPersonneMorale) => {
                return res.status(201).send(representantPersonneMorale);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updateRepresentantPersonneMorale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<RepresentantPersonneMorale>> = { where: { id: req.params.id } }

        let representantPersonneMorale: RepresentantPersonneMorale | null = await RepresentantPersonneMorale.findOne(options);
        if (representantPersonneMorale != null) {

            await representantPersonneMorale.update({
                personneMoraleId: req.body.personneMoraleId,
                representantId: req.body.representantId,
            })
                .then(async (representantPersonneMorale) => {
                    return res.status(200).send(representantPersonneMorale);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "RepresentantPersonneMorale non trouvée" });
        }

        return null
    }

    static async deleteRepresentantPersonneMorale(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<RepresentantPersonneMorale>> = { where: { id: req.params.id } }

        let representantPersonneMorale: RepresentantPersonneMorale | null = await RepresentantPersonneMorale.findOne(options);
        if (representantPersonneMorale) {
            await representantPersonneMorale.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "RepresentantPersonneMorale supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "RepresentantPersonneMorale non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<RepresentantPersonneMorale>> = {}

        await RepresentantPersonneMorale.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES: Includeable[] = [RepresentantPersonneMorale.associations.representant]

    static GET_INCLUDES: Includeable[] = [
        {
            association: RepresentantPersonneMorale.associations.representant, include: [
                PersonnePhysique.associations.civilite,
                PersonnePhysique.associations.nationalite,
                PersonnePhysique.associations.profession,
            ]
        }
    ]
}
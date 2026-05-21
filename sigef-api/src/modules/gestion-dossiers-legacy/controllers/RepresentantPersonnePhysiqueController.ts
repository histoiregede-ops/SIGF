import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes } from "sequelize";
import { RepresentantPersonnePhysique } from "../models/RepresentantPersonnePhysique";
import { PersonnePhysique } from "../models/PersonnePhysique";

export default class RepresentantPersonnePhysiqueController {

    constructor() { }

    static async getAllRepresentantsPersonnePhysique(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<RepresentantPersonnePhysique>> = {}

        try {
            let representantsPersonnePhysique: RepresentantPersonnePhysique[];
            representantsPersonnePhysique = await RepresentantPersonnePhysique.findAll(options);

            return res.status(200).send(representantsPersonnePhysique);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getRepresentantPersonnePhysique(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<RepresentantPersonnePhysique>> = {}
        options = { where: { id: req.params.id } }

        try {
            const representantPersonnePhysique: RepresentantPersonnePhysique | null = await RepresentantPersonnePhysique.findOne(options);

            if (representantPersonnePhysique == null)
                return res.status(404).json({ success: false, message: "RepresentantPersonnePhysique non trouvée" });

            return res.status(200).send(representantPersonnePhysique);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createRepresentantPersonnePhysique(req: Request, res: Response): Promise<any> {

        // let representantPersonnePhysique: RepresentantPersonnePhysique | null = await RepresentantPersonnePhysique.findOne({ where: { libelle: req.body.libelle } });

        // if (representantPersonnePhysique != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let representantPersonnePhysique: RepresentantPersonnePhysique = new RepresentantPersonnePhysique();
        representantPersonnePhysique.personnePhysiqueId = req.body.personnePhysiqueId
        representantPersonnePhysique.representantId = req.body.representantId

        await RepresentantPersonnePhysique.create(representantPersonnePhysique, { include: RepresentantPersonnePhysiqueController.INCLUDES })
            .then((representantPersonnePhysique) => {
                return res.status(201).send(representantPersonnePhysique);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updateRepresentantPersonnePhysique(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<RepresentantPersonnePhysique>> = { where: { id: req.params.id } }

        let representantPersonnePhysique: RepresentantPersonnePhysique | null = await RepresentantPersonnePhysique.findOne(options);
        if (representantPersonnePhysique != null) {

            await representantPersonnePhysique.update({
                personnePhysiqueId: req.body.personnePhysiqueId,
                representantId: req.body.representantId,
            })
                .then(async (representantPersonnePhysique) => {
                    return res.status(200).send(representantPersonnePhysique);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "RepresentantPersonnePhysique non trouvée" });
        }

        return null
    }

    static async deleteRepresentantPersonnePhysique(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<RepresentantPersonnePhysique>> = { where: { id: req.params.id } }

        let representantPersonnePhysique: RepresentantPersonnePhysique | null = await RepresentantPersonnePhysique.findOne(options);
        if (representantPersonnePhysique) {
            await representantPersonnePhysique.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "RepresentantPersonnePhysique supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "RepresentantPersonnePhysique non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<RepresentantPersonnePhysique>> = {}

        await RepresentantPersonnePhysique.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }

    static INCLUDES: Includeable[] = [RepresentantPersonnePhysique.associations.representant]

    static GET_INCLUDES: Includeable[] = [
        {
            association: RepresentantPersonnePhysique.associations.representant, include: [
                PersonnePhysique.associations.civilite,
                PersonnePhysique.associations.nationalite,
                PersonnePhysique.associations.profession,
            ]
        }
    ]
}
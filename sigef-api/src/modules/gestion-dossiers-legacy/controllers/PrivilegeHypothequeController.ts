import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { PrivilegeHypotheque } from "../models/PrivilegeHypotheque";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class PrivilegeHypothequeController {

    constructor() { }

    static async getAllPrivilegesHypotheques(req: Request, res: Response): Promise<any> {

        console.log(req.query, Op.or)

        try {
            // Filtres de l'utilisateur
            let privilegeHypothequeWhereOptions: WhereOptions<InferAttributes<PrivilegeHypotheque>> = {}

            // Application des filtres
            if (req.query.titreFoncierId) privilegeHypothequeWhereOptions.titreFoncierId = req.query.titreFoncierId as string;
            if (req.query.dateInscription) privilegeHypothequeWhereOptions.dateInscription = req.query.dateInscription as string;
            if (req.query.dateRadiation) privilegeHypothequeWhereOptions.dateRadiation = req.query.dateRadiation as string;
            if (req.query.search) {
                privilegeHypothequeWhereOptions[Op.or] = [
                    { numeroBordereauAnalytiqueConstitution: { [Op.like]: `%${req.query.search}%` } },
                    { designationDroitConstitue: { [Op.like]: `%${req.query.search}%` } },
                    { beneficiaire: { [Op.like]: `%${req.query.search}%` } },
                    { $numeroBordereauAnalytiqueRadiation$: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<PrivilegeHypotheque>> = {
                where: privilegeHypothequeWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<PrivilegeHypotheque>> = {
                where: privilegeHypothequeWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const privilegesHypothequesCount: number = await PrivilegeHypotheque.count(countOptions)
                let privilegesHypotheques: PrivilegeHypotheque[] = await PrivilegeHypotheque.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<PrivilegeHypotheque>(privilegesHypotheques, privilegesHypothequesCount, page, limit)
                );
            }
            else {
                let privilegesHypotheques: PrivilegeHypotheque[];
                privilegesHypotheques = await PrivilegeHypotheque.findAll(options);

                return res.status(200).send(privilegesHypotheques);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getPrivilegeHypotheque(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PrivilegeHypotheque>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const privilegehypotheque: PrivilegeHypotheque | null = await PrivilegeHypotheque.findOne(options);

            if (privilegehypotheque == null)
                return res.status(404).json({ success: false, message: "PrivilegeHypotheque non trouvée" });

            return res.status(200).send(privilegehypotheque);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createPrivilegeHypotheque(req: Request, res: Response): Promise<any> {

        // let privilegehypotheque: PrivilegeHypotheque | null = await PrivilegeHypotheque.findOne({ where: { libelle: req.body.libelle } });

        // if (privilegehypotheque != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
        let privilegehypotheque: PrivilegeHypotheque = new PrivilegeHypotheque();
        privilegehypotheque.numeroBordereauAnalytiqueConstitution = req.body.numeroBordereauAnalytiqueConstitution
        privilegehypotheque.dateInscription = req.body.dateInscription
        privilegehypotheque.designationDroitConstitue = req.body.designationDroitConstitue
        privilegehypotheque.montantCharge = req.body.montantCharge
        privilegehypotheque.numeroBordereauAnalytiqueRadiation = req.body.numeroBordereauAnalytiqueRadiation
        privilegehypotheque.dateRadiation = req.body.dateRadiation
        privilegehypotheque.titreFoncierId = req.body.titreFoncierId

        await privilegehypotheque.save()
            .then((privilegehypotheque) => {
                return res.status(201).send(privilegehypotheque);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });
        // }

        // return null
    }

    static async updatePrivilegeHypotheque(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PrivilegeHypotheque>> = { where: { id: req.params.id } }

        let privilegehypotheque: PrivilegeHypotheque | null = await PrivilegeHypotheque.findOne(options);
        if (privilegehypotheque != null) {

            // let verificationPrivilegeHypotheque: PrivilegeHypotheque | null = await PrivilegeHypotheque.findOne({ where: { libelle: req.body.libelle } })
            // if (verificationPrivilegeHypotheque != null && verificationPrivilegeHypotheque.libelle != req.body.libelle) {
            //     return res.status(400).json({ success: false, alreadyExists: true });
            // }
            // else {

            await privilegehypotheque.update({
                numeroBordereauAnalytiqueConstitution: req.body.numeroBordereauAnalytiqueConstitution,
                dateInscription: req.body.dateInscription,
                designationDroitConstitue: req.body.designationDroitConstitue,
                montantCharge: req.body.montantCharge,
                numeroBordereauAnalytiqueRadiation: req.body.numeroBordereauAnalytiqueRadiation,
                dateRadiation: req.body.dateRadiation,
                titreFoncierId: req.body.titreFoncierId,
            })
                .then(async (privilegehypotheque) => {
                    return res.status(200).send(privilegehypotheque);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
            // }
        }
        else {
            return res.status(404).json({ success: false, message: "PrivilegeHypotheque non trouvée" });
        }

        return null
    }

    static async deletePrivilegeHypotheque(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PrivilegeHypotheque>> = { where: { id: req.params.id } }

        let privilegehypotheque: PrivilegeHypotheque | null = await PrivilegeHypotheque.findOne(options);
        if (privilegehypotheque) {
            await privilegehypotheque.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "PrivilegeHypotheque supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PrivilegeHypotheque non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<PrivilegeHypotheque>> = {}

        await PrivilegeHypotheque.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { Utilisateur } from "../models/Utilisateur";
import { RolesIDs } from "../../../core/enums/RolesIDs";
import * as bcrypt from 'bcryptjs';
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { DataTypeUtils } from "../../../core/helpers/DataTypeUtils";
import { Profil } from "../models/Profil";
import { RoleProfil } from "../models/RoleProfil";

export default class IndexeurController {

    constructor() { }

    static ATTRIBUTES = ['id', 'nom', 'prenoms', 'identifiant', 'email', 'contact', 'photoDeProfil', 'actif', 'createdAt', 'updatedAt']

    static async getAllIndexeurs(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let rolesProfilWhereOptions: WhereOptions<InferAttributes<RoleProfil>> = { actif: true, roleId: RolesIDs.INDEXATION_INDEXEUR }
            let utilisateurWhereOptions: WhereOptions<InferAttributes<Utilisateur>> = {}

            // Application des filtres
            if (DataTypeUtils.getInstance().booleanFromString(req.query.actif as string) != undefined) utilisateurWhereOptions.actif = DataTypeUtils.getInstance().booleanFromString(req.query.actif as string);
            if (req.query.search) {
                utilisateurWhereOptions[Op.or] = [
                    { nom: { [Op.like]: `%${req.query.search}%` } },
                    { prenoms: { [Op.like]: `%${req.query.search}%` } },
                    { identifiant: { [Op.like]: `%${req.query.search}%` } },
                    { email: { [Op.like]: `%${req.query.search}%` } },
                    { contact: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<Utilisateur>> = {
                attributes: IndexeurController.ATTRIBUTES,
                where: utilisateurWhereOptions,
                include: [{
                    association: Utilisateur.associations.profil,
                    include: [
                        { association: Profil.associations.rolesProfil, where: rolesProfilWhereOptions, attributes: [] }
                    ],
                    required: true
                }],
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<Utilisateur>> = {
                where: utilisateurWhereOptions,
                include: [{
                    association: Utilisateur.associations.profil, include: [
                        { association: Profil.associations.rolesProfil, where: rolesProfilWhereOptions, attributes: [] }
                    ]
                }],
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const indexeursCount: number = await Utilisateur.count(countOptions)
                let indexeurs: Utilisateur[] = await Utilisateur.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Utilisateur>(indexeurs, indexeursCount, page, limit)
                );
            }
            else {
                let indexeurs: Utilisateur[];
                indexeurs = await Utilisateur.findAll(options);

                return res.status(200).send(indexeurs);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getIndexeur(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Utilisateur>> = {}
        options = {
            where: { id: req.params.id },
            attributes: IndexeurController.ATTRIBUTES,
            include: [{
                association: Utilisateur.associations.profil, include: [
                    { association: Profil.associations.rolesProfil, where: { actif: true, roleId: RolesIDs.INDEXATION_INDEXEUR }, attributes: [] }
                ], required: true
            }],
        }

        try {
            const indexeur: Utilisateur | null = await Utilisateur.findOne(options);

            if (indexeur == null)
                return res.status(404).json({ success: false, message: "Indexeur non trouve" });

            return res.status(200).send(indexeur);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    // static async registerIndexeur(req: Request, res: Response): Promise<any> {
    //     let emailAlreadyUsed: boolean = await Utilisateur.findOne({ where: { email: req.body.email } }) != null
    //     let identifiantAlreadyUsed: boolean = await Utilisateur.findOne({ where: { identifiant: req.body.identifiant } }) != null
    //     let nomPrenomsAlreadyUsed: boolean = await Utilisateur.findOne({ where: { [Op.and]: [{ nom: req.body.nom }, { prenoms: req.body.prenoms }] } }) != null


    //     if (emailAlreadyUsed || identifiantAlreadyUsed || nomPrenomsAlreadyUsed) {
    //         return res.status(400).json({ emailAlreadyUsed: emailAlreadyUsed, identifiantAlreadyUsed: identifiantAlreadyUsed, nomPrenomsAlreadyUsed: nomPrenomsAlreadyUsed });
    //     }

    //     let utilisateur: Utilisateur = new Utilisateur();
    //     utilisateur.nom = req.body.nom;
    //     utilisateur.prenoms = req.body.prenoms;
    //     utilisateur.identifiant = req.body.identifiant;
    //     utilisateur.email = req.body.email;
    //     utilisateur.motDePasse = bcrypt.hashSync(req.body.motDePasse, 10);
    //     utilisateur.contact = req.body.contact;
    //     utilisateur.profilId = req.body.profilId;

    //     await utilisateur.save()
    //         .then(async (utilisateur) => {
    //             // await RoleUtilisateur.create({
    //             //     utilisateurId: utilisateur.id,
    //             //     roleId: RolesIDs.INDEXATION_INDEXEUR,
    //             //     actif: true
    //             // })

    //             return res.status(201).send({ success: true });
    //         })
    //         .catch((error) => {
    //             return res.status(400).json({ success: false, error: error });
    //         });

    //     return null
    // }

    static async updateIndexeur(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const { nom, prenoms, contact } = req.body;

            const indexeur = await Utilisateur.findByPk(id);
            if (!indexeur) {
                return res.status(404).json({ success: false, message: "Indexeur non trouvé" });
            }

            if (nom && prenoms && (indexeur.nom !== nom || indexeur.prenoms !== prenoms)) {
                const alreadyUsed = await Utilisateur.findOne({
                    where: { nom, prenoms, id: { [Op.ne]: id } }
                });
                if (alreadyUsed) return res.status(400).json({ nomPrenomsAlreadyUsed: true });
            }

            await indexeur.update({ nom, prenoms, contact });
            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ success: false, error });
        }
    }

    static async updateMotDePasseIndexeur(req: Request, res: Response): Promise<any> {
        try {
            const { id } = req.params;
            const { motDePasse } = req.body;

            if (!motDePasse) {
                return res.status(400).json({ success: false, message: "Le mot de passe est requis." });
            }

            const indexeur = await Utilisateur.findByPk(id);
            if (!indexeur) {
                return res.status(404).json({ success: false, message: "Indexeur non trouvé" });
            }

            await indexeur.update({ motDePasse: bcrypt.hashSync(motDePasse, 10) });
            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ success: false, error });
        }
    }

    static async updateActifIndexeur(req: Request, res: Response): Promise<any> {

        let options: FindOptions<InferAttributes<Utilisateur>> = { where: { id: req.params.id } }

        let indexeur: Utilisateur | null = await Utilisateur.findOne(options);
        if (indexeur != null) {

            await indexeur.update({
                actif: !indexeur.actif
            },)
                .then(async (indexeur) => {
                    return res.status(200).json({ success: true });
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });

            return null
        }
        else {
            return res.status(404).json({ success: false, message: "Indexeur non trouvé" });
        }
    }

    static async deleteIndexeur(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Utilisateur>> = {
            include: [{
                association: Utilisateur.associations.profil, include: [
                    { association: Profil.associations.rolesProfil, where: { actif: true, roleId: RolesIDs.INDEXATION_INDEXEUR }, attributes: [] }
                ], required: true
            }],
        }

        let indexeur: Utilisateur | null = await Utilisateur.findOne({ where: { id: req.params.id } });
        if (indexeur) {
            await indexeur.destroy(options)
                .then(() => {
                    return res.status(200).json({ success: true, message: "Indexeur supprimé" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Indexeur non trouvé" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Utilisateur>> = {
            include: [{
                association: Utilisateur.associations.profil, include: [
                    { association: Profil.associations.rolesProfil, where: { actif: true, roleId: RolesIDs.INDEXATION_INDEXEUR }, attributes: [] }
                ]
            }],
        }

        await Utilisateur.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
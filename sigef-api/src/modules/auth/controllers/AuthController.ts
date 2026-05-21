import { Request, Response } from "express";
import { Utilisateur } from "../models/Utilisateur";
import * as bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { FindOptions, InferAttributes, Op } from "sequelize";
import { EmailSender } from "../../../core/helpers/EmailSender";
import { IDGenerator } from "../../../core/helpers/IDGenerator";
import { RoleProfil } from "../models/RoleProfil";
import { Profil } from "../models/Profil";

export default class AuthController {
private static getJwtSecret(): string {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET environment variable is required. Copy .env.example to .env and set a strong secret.');
        }
        return secret;
    }

    constructor() { }

    static getEmailConfirmationToken(id: string, email: string): string {
        return jwt.sign(
            {
                // Will expire in 60 * 60 seconds (1 hour)
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: {
                    id: id,
                    email: email
                }
            },
            AuthController.getJwtSecret()
        );
    }

    static async login(req: Request, res: Response): Promise<any> {
        try {
            const email = (req.body.email || '').trim().toLowerCase();
            const identifiant = (req.body.identifiant || '').trim().toLowerCase();
            const motDePasse = (req.body.motDePasse || '').trim();

            if (!motDePasse || (!email && !identifiant)) {
                return res.status(400).json({ success: false, message: "Identifiants invalides" });
            }

            const whereClause: any = { actif: true };
            if (email) {
                whereClause[Op.or] = [{ email }, { identifiant }];
            } else {
                whereClause.identifiant = identifiant;
            }

            const utilisateur = await Utilisateur.findOne({ where: whereClause });

            if (!utilisateur) {
                return res.status(401).json({ success: false, message: 'Identifiants invalides' });
            }

            const passwordMatch = bcrypt.compareSync(motDePasse, utilisateur.motDePasse);

            if (passwordMatch) {
                const token = jwt.sign(
                    {
                        id: utilisateur.id,
                        email: utilisateur.email,
                        identifiant: utilisateur.identifiant,
                    },
                    AuthController.getJwtSecret(),
                    { expiresIn: '15m' }
                );

                console.log(`Login success for user: ${utilisateur.identifiant}`);
                return res.status(200).json({ identifiant: utilisateur.identifiant, token: token });
            } else {
                console.log(`Login failed for user: ${utilisateur.identifiant} - wrong password`);
                return res.status(401).json({ success: false, message: 'Identifiants invalides' });
            }
        } catch (error: any) {
            console.error('Login error:', error.message);
            if (error.message?.includes('JWT_SECRET')) {
                return res.status(500).json({ success: false, message: 'Configuration error: JWT_SECRET missing. Check .env' });
            }
            return res.status(500).json({ success: false, message: 'Erreur serveur' });
        }
    }

    static async register(req: Request, res: Response): Promise<any | null> {

        if (req.body.identifiant == undefined || req.body.email == undefined) {
            return res.status(400).json({ emptyField: true });
        }

        let emailAlreadyUsed: boolean = await Utilisateur.findOne({ where: { email: req.body.email } }) != null
        let identifiantAlreadyUsed: boolean = await Utilisateur.findOne({ where: { identifiant: req.body.identifiant } }) != null
        let nomPrenomsAlreadyUsed: boolean = await Utilisateur.findOne({ where: { [Op.and]: [{ nom: req.body.nom }, { prenoms: req.body.prenoms }] } }) != null


        if (emailAlreadyUsed || identifiantAlreadyUsed || nomPrenomsAlreadyUsed) {
            return res.status(400).json({ emailAlreadyUsed: emailAlreadyUsed, identifiantAlreadyUsed: identifiantAlreadyUsed, nomPrenomsAlreadyUsed: nomPrenomsAlreadyUsed });
        }

        let utilisateur: Utilisateur = new Utilisateur();
        utilisateur.nom = req.body.nom;
        utilisateur.prenoms = req.body.prenoms;
        utilisateur.identifiant = req.body.identifiant;
        utilisateur.email = req.body.email;
        utilisateur.motDePasse = bcrypt.hashSync(req.body.motDePasse, 10);
        utilisateur.contact = req.body.contact;

        await utilisateur.save()
            .then(async (utilisateur) => {
                const redirectTo: string = req.query.redirectTo as string
                const token = AuthController.getEmailConfirmationToken(String(utilisateur.id), utilisateur.email)

                // await EmailSender.getInstance().sendEmailConfirmLink(utilisateur.identifiant, utilisateur.email, redirectTo, token)

                return res.status(201).send({ success: true });
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });

        return null
    }

    static async registerAgent(req: Request, res: Response): Promise<any | null> {
        if (req.body.utilisateur.identifiant == undefined || req.body.utilisateur.email == undefined) {
            return res.status(400).json({ emptyField: true });
        }

        let emailAlreadyUsed: boolean = await Utilisateur.findOne({ where: { email: req.body.utilisateur.email } }) != null
        let identifiantAlreadyUsed: boolean = await Utilisateur.findOne({ where: { identifiant: req.body.utilisateur.identifiant } }) != null
        let nomPrenomsAlreadyUsed: boolean = await Utilisateur.findOne({ where: { [Op.and]: [{ nom: req.body.utilisateur.nom }, { prenoms: req.body.utilisateur.prenoms }] } }) != null


        if (emailAlreadyUsed || identifiantAlreadyUsed || nomPrenomsAlreadyUsed) {
            return res.status(400).json({ emailAlreadyUsed: emailAlreadyUsed, identifiantAlreadyUsed: identifiantAlreadyUsed, nomPrenomsAlreadyUsed: nomPrenomsAlreadyUsed });
        }

        const tempPassword = IDGenerator.getInstance().generateMotDePasseUtilisateur()
        let utilisateur: Utilisateur = new Utilisateur();
        utilisateur.nom = req.body.utilisateur.nom;
        utilisateur.prenoms = req.body.utilisateur.prenoms;
        utilisateur.identifiant = req.body.utilisateur.identifiant;
        utilisateur.email = req.body.utilisateur.email;
        utilisateur.motDePasse = bcrypt.hashSync(tempPassword, 10);
        utilisateur.contact = req.body.utilisateur.contact;
        utilisateur.profilId = req.body.utilisateur.profilId;

        await utilisateur.save()
            .then(async (utilisateur) => {
                // const redirectTo: string = req.query.redirectTo as string
                // const token = AuthController.getEmailConfirmationToken(utilisateur.id, utilisateur.email)

                // await EmailSender.getInstance().sendEmailConfirmLink(utilisateur.identifiant, utilisateur.email, redirectTo, token)
                EmailSender.getInstance().sendMessageInscriptionAgent(utilisateur.identifiant, tempPassword, utilisateur.email)

                return res.status(201).send({ success: true });
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });

        return null
    }

    static async updateProfile(req: Request, res: Response): Promise<any | null> {

        let options: FindOptions<InferAttributes<Utilisateur>> = { where: { id: (req as any).utilisateurId } }

        let files: any = req.files
        if (files && files['profile']) {
            let profile: Express.Multer.File | undefined = (files['profile'])[0] as Express.Multer.File | undefined

            if (profile) {
                let utilisateur: Utilisateur | null = await Utilisateur.findOne(options);
                if (utilisateur != null) {
                    await utilisateur.update({
                        photoDeProfil: profile.filename,
                    })
                        .then(async () => {
                            return res.status(200).json({ success: false });
                        })
                        .catch((error) => {
                            return res.status(400).json({ success: false, error: error });
                        });

                    return null
                }
                else {
                    return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
                }
            }
            else {
                return res.status(400).json({ success: false });
            }
        }
        else {
            return res.status(400).json({ success: false });
        }
    }

    static async sendEmailConfirmLink(req: Request, res: Response): Promise<any | null> {
        let options: FindOptions<InferAttributes<Utilisateur>> = {}

        let utilisateur: Utilisateur | null = await Utilisateur.findOne(options);
        if (utilisateur) {
            if (utilisateur.dateVerificationEmail == undefined) {
                const redirectTo: string = req.query.redirectTo as string
                const token = AuthController.getEmailConfirmationToken(String(utilisateur.id), utilisateur.email)

                await EmailSender.getInstance().sendEmailConfirmLink(utilisateur.identifiant, utilisateur.email, redirectTo, token)
                    .then(async () => {
                        return res.sendStatus(200);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
            else {
                return res.status(300).json({ success: false, message: "Email déjà vérifié" });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }

        return null
    }

    static async emailConfirm(req: Request, res: Response): Promise<any | null> {
        const token: string = req.query.token as string
        let decoded: any

        try {
            decoded = jwt.verify(token, AuthController.getJwtSecret())
        } catch (error) {
            return res.status(404).json({ success: false, error: error })
        }

        let options: FindOptions<InferAttributes<Utilisateur>> = {}
        options = { where: { id: decoded.data.id, email: decoded.data.email } }

        let utilisateur: Utilisateur | null = await Utilisateur.findOne(options);
        if (utilisateur != null) {
            if (utilisateur.dateVerificationEmail == undefined) {
                await utilisateur.update({
                    dateVerificationEmail: new Date()
                })
                    .then(async (utilisateur) => {
                        return res.sendStatus(200);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
            else {
                return res.status(300).json({ success: false, message: "Email déjà vérifié" });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }

        return null
    }

    static async sendPasswordResetLink(req: Request, res: Response): Promise<any> {
        if (req.query.email && req.query.redirectTo) {
            let options: FindOptions<InferAttributes<Utilisateur>> = {}
            options = { where: { email: req.query.email as string } }

            let utilisateur: Utilisateur | null = await Utilisateur.findOne(options);
            if (utilisateur) {
                if (utilisateur.dateVerificationEmail != undefined) {
                    const redirectTo: string = req.query.redirectTo as string
                    const token = jwt.sign(
                        {
                            // Will expire in 15 * 60 seconds (15 minutes)
                            exp: Math.floor(Date.now() / 1000) + (15 * 60),
                            data: {
                                email: utilisateur.email
                            }
                        },
                        //TODO change and move in config file
                        AuthController.getJwtSecret()
                    );

                    await EmailSender.getInstance().sendPasswordResetLink(utilisateur.identifiant, utilisateur.email, redirectTo, token)
                        .then(async () => {
                            return res.sendStatus(200);
                        })
                        .catch((error) => {
                            return res.status(400).json({ success: false, error: error });
                        });
                }
                else {
                    return res.status(400).json({ success: false, message: "Email non vérifié" });
                }
            }
            else {
                return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
            }
        }
        else {
            return res.status(400).json({ success: false });
        }

        return null
    }

    static async passwordReset(req: Request, res: Response): Promise<any | null> {
        if (!req.body?.oldPassword || !req.body?.password) {
            return res.status(400).json({ success: false, message: "oldPassword et password sont requis" });
        }

        let options: FindOptions<InferAttributes<Utilisateur>> = {}
        options = { where: { id: (req as any).utilisateurId } }

        let utilisateur: Utilisateur | null = await Utilisateur.findOne(options);
        if (utilisateur != null) {
            if (bcrypt.compareSync(req.body.oldPassword, utilisateur.motDePasse)) {
                await utilisateur.update({
                    motDePasse: bcrypt.hashSync(req.body.password, 10)
                })
                    .then(async (utilisateur) => {
                        return res.status(200).json({ success: true })
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
            else {
                return res.status(400).json({ passwordWrong: true });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
        }

        return null
    }

    static async getLoggedUser(req: Request, res: Response): Promise<any | null> {
        let options: FindOptions<InferAttributes<Utilisateur>> = {}
        options = { 
            where: { id: (req as any).utilisateurId },
            attributes: ['nom', 'prenoms', 'identifiant', 'email', 'contact', 'photoDeProfil'],
            include: [
                {association: Utilisateur.associations.profil},
                Utilisateur.associations.centreConservationFonciere
            ]
        }

        try {
let utilisateur: Utilisateur | null = await Utilisateur.findOne(options);

            if (utilisateur == null)
                return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
            else {
                return res.status(200).send(utilisateur);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getLoggedUserRoles(req: Request, res: Response): Promise<any | null> {
        let options: FindOptions<InferAttributes<Utilisateur>> = {}
        options = { 
            where: { id: (req as any).utilisateurId, actif: true },
            include: [
                {association: Utilisateur.associations.profil, include: [
                    { association: Profil.associations.rolesProfil, where: { actif: true }, attributes: ['roleId'] }
                ]}
            ]
        }

        try {
        let utilisateur: Utilisateur | null = await Utilisateur.findOne(options);
        if (!utilisateur || !utilisateur.profil) {
            return res.status(404).json({ success: false, message: 'Utilisateur ou profil non trouvé' });
        }
        const rolesProfil: RoleProfil[] = utilisateur.profil.rolesProfil ?? [];
        
        return res.status(200).send(rolesProfil);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }


}
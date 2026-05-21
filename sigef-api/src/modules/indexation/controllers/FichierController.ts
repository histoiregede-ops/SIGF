
import { Request, RequestHandler, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes, Op, Sequelize, WhereOptions } from "sequelize";
import { Fichier } from "../models/Fichier";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { TypesRegistre } from "../../../core/enums/TypesRegistre";
import { Region } from "../../commun/models/Region";
import { FileMetadataExtractor } from "../../../core/helpers/FileMetadataExtractor";
import { TacheIndexation } from "../models/TacheIndexation";
import UtilisateurController from "../../auth/controllers/UtilisateurController";
import { ProgressionTacheIndexation } from "../models/ProgressionTacheIndexation";
import { EtatsProgressionIndexation } from "../../../core/enums/EtatsProgressionIndexation";
import multer from "multer"
import * as path from "path"
import * as fs from "fs"
import { customAlphabet } from 'nanoid'
import "../../auth/models/_associations"
import { Utilisateur } from "../../auth/models/Utilisateur";
import { Profil } from "../../auth/models/Profil";
import { RolesIDs } from "../../../core/enums/RolesIDs";

export default class FichierController {

    constructor() { }

    static async getAllFichiers(req: Request, res: Response): Promise<any> {

        /**
         * L'approche adoptée pour le filtrage des données se présente comme suit: 
         * - Dans un premier, on récupère la liste des IDs de notre modèle de base (uniquement les IDs nous intéressent),
         * - Ensuite, à partir de cette liste on récupère les enregistrements correspodants avec les associations spécifiées incluses
         */

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let fichierWhereOptions: WhereOptions<InferAttributes<Fichier>> = {}
            let tacheIndexationWhereOptions: WhereOptions<InferAttributes<TacheIndexation>> = {}
            let progressionTacheIndexationWhereOptions: WhereOptions<InferAttributes<ProgressionTacheIndexation>> = {}

            // Application des filtres
            if (req.query.fichier) fichierWhereOptions.nom = { [Op.like]: `%${req.query.fichier}%` };
            if (req.query.dossier) fichierWhereOptions.dossierId = req.query.dossier as string
            if (req.query.region) fichierWhereOptions.regionId = req.query.region as string
            if (req.query.etatSaisie) tacheIndexationWhereOptions.etatSaisie = req.query.etatSaisie as string;
            if (req.query.etatControle) tacheIndexationWhereOptions.etatControle = req.query.etatControle as string;
            if (req.query.indexeur) {
                tacheIndexationWhereOptions.indexeurUtilisateurId = req.query.indexeur == 'null' ? null : (Number(req.query.indexeur) as any)
            }
            if (req.query.controleur) {
                tacheIndexationWhereOptions.controleurUtilisateurId = req.query.controleur == 'null' ? null : (Number(req.query.controleur) as any)
            }
            if (req.query.rejete && req.query.rejete == 'true') progressionTacheIndexationWhereOptions.etat = EtatsProgressionIndexation.REJETE;
            if (req.query.signale && req.query.signale == 'true') progressionTacheIndexationWhereOptions.etat = EtatsProgressionIndexation.SIGNALE;

            // Application de la progression
            const tacheIndexationAssociationRequired: boolean = Object.keys(tacheIndexationWhereOptions).length > 0
            const progressionTacheIndexationAssociationRequired: boolean = Object.keys(progressionTacheIndexationWhereOptions).length > 0

            // console.log(tacheIndexationAssociationRequired, progressionTacheIndexationAssociationRequired)
            let includeOptions: Includeable[] = [
                { association: Fichier.associations.region, include: [Region.associations.periode] },
                Fichier.associations.typeRegistre
            ]
            let filterIncludeOptions: Includeable[] = []

            if (req.query.withProgression != undefined && req.query.withProgression == '1') {
                // Pour ne récupérer que les fichiers indexables
                fichierWhereOptions.indexable = true

                filterIncludeOptions.push({
                    association: Fichier.associations.tacheIndexation,
                    where: tacheIndexationWhereOptions,
                    include: [
                        {
                            association: TacheIndexation.associations.progressionsTacheIndexation,
                            where: progressionTacheIndexationWhereOptions,
                            include: [ProgressionTacheIndexation.associations.qualiteDocument],
                            required: progressionTacheIndexationAssociationRequired,
                            attributes: []
                        },
                    ],
                    required: tacheIndexationAssociationRequired || progressionTacheIndexationAssociationRequired,
                    attributes: []
                })

                includeOptions.push({
                    association: Fichier.associations.tacheIndexation,
                    include: [
                        {
                            association: TacheIndexation.associations.progressionsTacheIndexation,
                            include: [ProgressionTacheIndexation.associations.qualiteDocument],
                        },
                        { association: TacheIndexation.associations.indexeurUtilisateur, attributes: UtilisateurController.ATTRIBUTES },
                        { association: TacheIndexation.associations.controleurUtilisateur, attributes: UtilisateurController.ATTRIBUTES },
                    ],
                })
            }

            // Filtres sur le type de registre
            if (req.query.typeRegistreId) {
                fichierWhereOptions.typeRegistreId = req.query.typeRegistreId as TypesRegistre
            }

            // Récupération des ids des fichiers en se basant sur les filtres de l'utilisateur
            // Options
            let filterOptions: FindOptions<InferAttributes<Fichier>> = {
                where: fichierWhereOptions,
                attributes: ['id'],
                include: filterIncludeOptions,
                order: [['nom', 'ASC']]
            }
            let _fichiers: Fichier[] = await Fichier.findAll(filterOptions)
            // console.log(_fichiers.map(value => value.id))

            if (_fichiers.length === 0) {
                const page = Number(req.query.page) || 0;
                const size = Number(req.query.size) || 10;
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size);
                return res.status(200).send(DataPaginator.getInstance().getPagingData<Fichier>([], 0, page, limit));
            }

            // Options
            let options: FindOptions<InferAttributes<Fichier>> = {
                where: {
                    id: { [Op.in]: _fichiers.map(value => value.id) }
                },
                include: includeOptions,
                order: [['nom', 'ASC']]
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const fichiersCount: number = _fichiers.length
                let fichiers: Fichier[];
                fichiers = await Fichier.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Fichier>(fichiers, fichiersCount, page, limit)
                );
            }
            else {
                let fichiers: Fichier[];
                fichiers = await Fichier.findAll(options);

                return res.status(200).send(fichiers);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getFichier(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Fichier>> = {}
        options = {
            where: { id: req.params.id },
            include: [
                { association: Fichier.associations.region, include: [Region.associations.periode] },
                {
                    association: Fichier.associations.tacheIndexation, include: [
                        TacheIndexation.associations.progressionsTacheIndexation,
                    ]
                },
                Fichier.associations.typeRegistre
            ],
        }

        try {
            const fichier: Fichier | null = await Fichier.findOne(options);

            if (fichier == null)
                return res.status(404).json({ success: false, message: "Fichier non trouvée" });

            return res.status(200).send(fichier);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getFichierContenu(req: Request, res: Response): Promise<any> {
        try {
            const fichier: Fichier | null = await Fichier.findByPk(req.params.id, {
                attributes: ['id', 'fichier', 'nom', 'extension']
            });

            if (fichier == null) {
                console.error(`Fichier non trouvé pour l'ID: ${req.params.id}`);
                return res.status(404).json({ success: false, message: "Fichier non trouvé" });
            }

            const filePath = path.join('public/fichiers/', fichier.fichier!);

            if (!fs.existsSync(filePath)) {
                console.error(`Fichier physique non trouvé: ${filePath}`);
                return res.status(404).json({ success: false, message: "Fichier physique non trouvé sur le serveur" });
            }

            const fileContent = fs.readFileSync(filePath);
            
            // Set comprehensive CORS and file download headers
            const safeFileName = encodeURIComponent(`${fichier.nom}${fichier.extension ?? '.pdf'}`)
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename*=UTF-8''${safeFileName}`);
            res.setHeader('Content-Length', fileContent.length.toString());
            res.setHeader('Cache-Control', 'public, max-age=3600');
            res.setHeader('Accept-Ranges', 'bytes');
            
            // Ensure CORS headers are present (may be redundant but ensures compatibility)
            res.setHeader('Access-Control-Allow-Origin', req.get('origin') || '*');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition, Content-Length, Content-Type');
            
            console.log(`Serving file: ${fichier.nom}, size: ${fileContent.length} bytes`);
            res.status(200).send(fileContent);
        } catch (error) {
            console.error('Erreur lors de la récupération du contenu du fichier:', error);
            return res.status(500).json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' });
        }
    }

    static uploadSingleFichier(): RequestHandler {

        const storage = multer.diskStorage({
            destination: (req, file, callback) => {
                const dir: string = "public/fichiers/"
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true })
                }

                callback(null, dir)
            },
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now()
                const nanoid = customAlphabet('1234567890abcdef', 30)
                callback(null, nanoid() + '_' + uniqueSuffix)
            },
        })

        const upload = multer({
            storage,
            limits: {
                fileSize: 1024 * 1024 * 1024 // 1 Go
            },
            fileFilter: (req, file, cb) => {
                const isPdf =
                    file.mimetype === 'application/pdf' ||
                    file.mimetype === 'application/octet-stream' && path.extname(file.originalname).toLowerCase() === '.pdf' ||
                    path.extname(file.originalname).toLowerCase() === '.pdf'
                cb(null, isPdf)
            }
        })

        return upload.single('fichier')
    }

    // Backward-compatible: keep old method name but still apply the same multer limits.
    static uploadFichier(): RequestHandler {
        return FichierController.uploadSingleFichier()
    }

    /** Récupère le fichier uploadé (multer.single → req.file, multer.fields → req.files). */
    private static getUploadedFichier(req: Request): Express.Multer.File | undefined {
        if (req.file) {
            return req.file
        }
        const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined
        return files?.['fichier']?.[0]
    }

    static async utilisateurALeRole(utilisateurId: number, rolesCibles: string[]): Promise<boolean> {
        try {
            const utilisateur = await Utilisateur.findByPk(utilisateurId, {
                include: [
                    {
                        association: 'profil',
                        attributes: ['id', 'libelle'],
                        include: [
                            {
                                association: Profil.associations.rolesProfil,
                                where: { actif: true },
                                attributes: ['roleId'],
                                required: false,
                            }
                        ]
                    }
                ]
            });

            if (!utilisateur?.profil) {
                return false;
            }

            const rolesProfil = (utilisateur.profil as Profil).rolesProfil ?? [];
            if (rolesProfil.length === 0) {
                return false;
            }

            const rolesUtilisateur = rolesProfil
                .map((rp) => String(rp.roleId))
                .filter((id) => id.length > 0);

            return rolesCibles.some((cible) => rolesUtilisateur.includes(cible));
        } catch (e: any) {
            console.error('[FichierController.utilisateurALeRole] failed:', e?.message ?? e);
            return false;
        }
    }

    static async createFichier(req: Request, res: Response): Promise<any> {
        const utilisateurId = (req as any).utilisateurId;
        const autorise = await FichierController.utilisateurALeRole(utilisateurId, [
            RolesIDs.INDEXATION_ADMINISTRATEUER,
            RolesIDs.INDEXATION_CONTROLEUR
        ]);
        if (!autorise) {
            return res.status(403).json({ success: false, message: "Accès refusé. Seuls les administrateurs et les contrôleurs peuvent importer des fichiers." });
        }

        const fic = FichierController.getUploadedFichier(req)
        if (fic) {
                const extension = path.extname(fic.originalname).toLowerCase()
                
                const cleanOptionalValue = (value: any): any => {
                    if (value === undefined || value === null || value === '' || value === 'undefined' || value === 'null') {
                        return null;
                    }
                    return value;
                };

                const dossierId = cleanOptionalValue(req.body.dossierId);
                const description = cleanOptionalValue(req.body.description);

                const duplicateWhere: any = { nom: req.body.nom };
                if (dossierId) {
                    duplicateWhere.dossierId = dossierId;
                }

                const existingFile = await Fichier.findOne({ where: duplicateWhere });
                if (existingFile) {
                    return res.status(400).json({ success: false, alreadyExists: true });
                }

                let fichier: Fichier = new Fichier();
                fichier.nom = req.body.nom
                fichier.description = description
                fichier.tailleEnOctets = req.body.tailleEnOctets
                const pageCount = await FileMetadataExtractor.getInstance().getPageCount(extension, fic.path)
                fichier.nombrePages = pageCount ?? 0  // Default to 0 if null
                fichier.extension = extension
                fichier.indexable = req.body.indexable
                fichier.typeRegistreId = req.body.typeRegistreId
                fichier.dossierId = dossierId
                fichier.regionId = req.body.regionId
                fichier.fichier = fic.filename

                await fichier.save()
                    .then((fichier) => {
                        return res.status(201).send(fichier);
                    })
                    .catch((error) => {
                        console.error('[FichierController.createFichier] save failed:', error);
                        return res.status(400).json({ success: false, error: error });
                    });
        } else {
            return res.status(400).json({
                success: false,
                message: 'Fichier PDF manquant ou format non accepté (application/pdf).',
            });
        }

        return null
    }

    static async updateFichier(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Fichier>> = { where: { id: req.params.id } }

        let fichier: Fichier | null = await Fichier.findOne(options);
        if (fichier != null) {

            await fichier.update({
                nom: req.body.nom,
                description: req.body.description,
                nombrePages: req.body.nombrePages,
                indexable: req.body.indexable,
                typeRegistreId: req.body.typeRegistreId,
                dossierId: req.body.dossierId,
                regionId: req.body.regionId,
            })
                .then(async (fichier) => {
                    return res.status(200).send(fichier);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Fichier non trouvée" });
        }

        return null
    }

    static async updateFichierContenu(req: Request, res: Response): Promise<any> {
        const utilisateurId = (req as any).utilisateurId;
        const autorise = await FichierController.utilisateurALeRole(utilisateurId, [
            RolesIDs.INDEXATION_ADMINISTRATEUER,
            RolesIDs.INDEXATION_CONTROLEUR
        ]);
        if (!autorise) {
            return res.status(403).json({ success: false, message: "Accès refusé. Seuls les administrateurs et les contrôleurs peuvent remplacer des fichiers." });
        }

        let options: FindOptions<InferAttributes<Fichier>> = { where: { id: req.params.id } }

        let fichier: Fichier | null = await Fichier.findOne(options);
        if (fichier != null) {
            const fic = FichierController.getUploadedFichier(req)
            if (fic) {
                const extension = path.extname(fic.originalname).toLowerCase()
                const pageCount = await FileMetadataExtractor.getInstance().getPageCount(extension, fic.path)

                await fichier.update({
                    tailleEnOctets: req.body.tailleEnOctets,
                    nombrePages: pageCount ?? 0,
                    extension: extension,
                    fichier: fic.filename
                })
                    .then(async (fichier) => {
                        return res.status(200).send(fichier);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            } else {
                return res.status(400).json({
                    success: false,
                    message: 'Fichier PDF manquant ou format non accepté (application/pdf).',
                });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "Fichier non trouvée" });
        }

        return null
    }

    static async deleteFichier(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Fichier>> = { where: { id: req.params.id } }

        let fichier: Fichier | null = await Fichier.findOne(options);
        if (fichier) {
            await fichier.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "Fichier supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Fichier non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Fichier>> = {}

        await Fichier.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
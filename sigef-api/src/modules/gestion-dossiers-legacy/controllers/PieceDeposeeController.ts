import { Request, RequestHandler, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op } from "sequelize";
import { PieceDeposee } from "../models/PieceDeposee";
import * as fs from "fs";
import multer from "multer";
import { customAlphabet } from "nanoid";
import { Fichier } from "../../indexation/models/Fichier";
import * as path from "path";

export default class PieceDeposeeController {

    constructor() { }

    static uploadPieceDeposee(): RequestHandler {
        const storage = multer.diskStorage({
            destination: (req, file, callback) => {
                const dir: string = "public/pieces/"
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true })
                }

                callback(null, dir)
            },
            filename: async (req, file, callback) => {
                try {
                    // console.log(req.body)
                    const uniqueSuffix = Date.now() // + path.extname(file.originalname)
                    const nanoid = customAlphabet('1234567890abcdef', 50)
                    // console.log(nanoid() + '_' + uniqueSuffix)

                    callback(null, nanoid() + '_' + uniqueSuffix)
                }
                catch (error) {
                    // callback(null, null)
                    return req.res.status(500).json({ success: false, error: error });
                }
            },
        })
        const upload = multer({ storage: storage })

        return upload.fields([{ name: 'fichier', maxCount: 1 }])
    }

    static async getAllPiecesDeposees(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PieceDeposee>> = {}

        try {
            let piecesDeposees: PieceDeposee[];
            piecesDeposees = await PieceDeposee.findAll(options);

            return res.status(200).send(piecesDeposees);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getPieceDeposee(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PieceDeposee>> = {}
        options = { where: { id: req.params.id } }

        try {
            const pieceDeposee: PieceDeposee | null = await PieceDeposee.findOne(options);

            if (pieceDeposee == null)
                return res.status(404).json({ success: false, message: "PieceDeposee non trouvée" });

            return res.status(200).send(pieceDeposee);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getPieceDeposeeContenu(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PieceDeposee>> = {}
        options = { where: { id: req.params.id } }

        try {
            const pieceDeposee: PieceDeposee | null = await PieceDeposee.findOne(options);

            if (pieceDeposee == null)
                return res.status(404).json({ success: false, message: "PieceDeposee non trouvée" });

            return res.status(200).send(pieceDeposee);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createPieceDeposee(req: Request, res: Response): Promise<any> {

        let pieceDeposee: PieceDeposee = new PieceDeposee();
        pieceDeposee.nom = req.body.nom
        pieceDeposee.description = req.body.description
        pieceDeposee.oppositionId = req.body.oppositionId
        pieceDeposee.depotId = req.body.depotId

        let files: any = req.files
        if (files && files['fichier']) {
            let fichier: Express.Multer.File | undefined = (files['fichier'])[0] as Express.Multer.File | undefined
            const extension = path.extname(fichier.originalname).toLowerCase()

            if (fichier) {
                pieceDeposee.fichier = fichier.filename
                pieceDeposee.tailleEnOctets = req.body.tailleEnOctets
                pieceDeposee.extension = extension
            }
        }

        await pieceDeposee.save()
            .then((pieceDeposee) => {
                return res.status(201).send(pieceDeposee);
            })
            .catch((error) => {
                return res.status(400).json({ success: false, error: error });
            });

        return null
    }

    static async updatePieceDeposee(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PieceDeposee>> = { where: { id: req.params.id } }

        let pieceDeposee: PieceDeposee | null = await PieceDeposee.findOne(options);
        if (pieceDeposee != null) {

            await pieceDeposee.update({
                nom: req.body.nom,
                description: req.body.description,
                fichier: req.body.fichier,
                oppositionId: req.body.oppositionId,
                depotId: req.body.depotId,
            })
                .then(async (pieceDeposee) => {
                    return res.status(200).send(pieceDeposee);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PieceDeposee non trouvée" });
        }

        return null
    }
    
    static async updatePieceDeposeeContenu(req: Request, res: Response): Promise<any> {
        // console.log(req.body)
        let options: FindOptions<InferAttributes<PieceDeposee>> = { where: { id: req.params.id } }

        let fichier: PieceDeposee | null = await PieceDeposee.findOne(options);
        if (fichier != null) {
            let files: any = req.files
            if (files && files['fichier']) {
                let fic: Express.Multer.File | undefined = (files['fichier'])[0] as Express.Multer.File | undefined
                const extension = path.extname(fic.originalname).toLowerCase()

                if (fic) {
                    await fichier.update({
                        tailleEnOctets: req.body.tailleEnOctets,
                        extension: extension,
                        fichier: fic.filename
                    })
                        .then(async (fichier) => {
                            return res.status(200).send(fichier);
                        })
                        .catch((error) => {
                            return res.status(400).json({ success: false, error: error });
                        });
                }
                else {
                    return res.status(400).json({ success: false });
                }
            }
            else {
                return res.status(400).json({ success: false });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "Fichier non trouvée" });
        }

        return null
    }

    static async deletePieceDeposee(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PieceDeposee>> = { where: { id: req.params.id } }

        let pieceDeposee: PieceDeposee | null = await PieceDeposee.findOne(options);
        if (pieceDeposee) {
            await pieceDeposee.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "PieceDeposee supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PieceDeposee non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<PieceDeposee>> = {}

        await PieceDeposee.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
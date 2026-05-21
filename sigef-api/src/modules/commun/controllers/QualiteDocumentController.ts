import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { QualiteDocument } from "../models/QualiteDocument";
import { DataPaginator } from "../../../core/helpers/DataPaginator";
import { DataTypeUtils } from "../../../core/helpers/DataTypeUtils";

export default class QualiteDocumentController {

    constructor() { }

    static async getAllQualitesDocument(req: Request, res: Response): Promise<any> {
        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let qualiteDocumentWhereOptions: WhereOptions<InferAttributes<QualiteDocument>> = {}

            // Application des filtres
            if (DataTypeUtils.getInstance().booleanFromString(req.query.aSignaler as string) != undefined) qualiteDocumentWhereOptions.aSignaler = DataTypeUtils.getInstance().booleanFromString(req.query.aSignaler as string);
            if (req.query.search) {
                qualiteDocumentWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<QualiteDocument>> = {
                where: qualiteDocumentWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<QualiteDocument>> = {
                where: qualiteDocumentWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const qualitesDocumentCount: number = await QualiteDocument.count(countOptions)
                let qualitesDocument: QualiteDocument[] = await QualiteDocument.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<QualiteDocument>(qualitesDocument, qualitesDocumentCount, page, limit)
                );
            }
            else {
                let qualitesDocument: QualiteDocument[];
                qualitesDocument = await QualiteDocument.findAll(options);

                return res.status(200).send(qualitesDocument);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getQualiteDocument(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<QualiteDocument>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const qualitedocument: QualiteDocument | null = await QualiteDocument.findOne(options);

            if (qualitedocument == null)
                return res.status(404).json({ success: false, message: "QualiteDocument non trouvée" });

            return res.status(200).send(qualitedocument);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createQualiteDocument(req: Request, res: Response): Promise<any> {

        let qualitedocument: QualiteDocument | null = await QualiteDocument.findOne({ where: { libelle: req.body.libelle } });

        if (qualitedocument != null) {
            return res.status(400).json({ success: false, alreadyExists: true });
        }
        else {
            let qualitedocument: QualiteDocument = new QualiteDocument();
            qualitedocument.libelle = req.body.libelle
            qualitedocument.description = req.body.description
            qualitedocument.aSignaler = req.body.aSignaler

            await qualitedocument.save()
                .then((qualitedocument) => {
                    return res.status(201).send(qualitedocument);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }

        return null
    }

    static async updateQualiteDocument(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<QualiteDocument>> = { where: { id: req.params.id } }

        let qualitedocument: QualiteDocument | null = await QualiteDocument.findOne(options);
        if (qualitedocument != null) {

            let verificationQualiteDocument: QualiteDocument | null = await QualiteDocument.findOne({ where: { libelle: req.body.libelle } })
            if (verificationQualiteDocument != null && verificationQualiteDocument.libelle != req.body.libelle) {
                return res.status(400).json({ success: false, alreadyExists: true });
            }
            else {

                await qualitedocument.update({
                    libelle: req.body.libelle,
                    description: req.body.description,
                    aSignaler: req.body.aSignaler,
                })
                    .then(async (qualitedocument) => {
                        return res.status(200).send(qualitedocument);
                    })
                    .catch((error) => {
                        return res.status(400).json({ success: false, error: error });
                    });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "QualiteDocument non trouvée" });
        }

        return null
    }

    static async deleteQualiteDocument(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<QualiteDocument>> = { where: { id: req.params.id } }

        let qualitedocument: QualiteDocument | null = await QualiteDocument.findOne(options);
        if (qualitedocument) {
            await qualitedocument.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "QualiteDocument supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "QualiteDocument non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<QualiteDocument>> = {}

        await QualiteDocument.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
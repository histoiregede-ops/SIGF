import { Request, Response } from "express";
import { FindOptions, InferAttributes } from "sequelize";
import { BordereauAnalytique } from "../models/BordereauAnalytique";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class BordereauAnalytiqueController {

    static async getAllBordereauxAnalytiques(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<BordereauAnalytique>> = {
            order: [['createdAt', 'DESC']],
            include: [{ all: true, nested: true }]
        }

        try {
            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const { rows, count } = await BordereauAnalytique.findAndCountAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<BordereauAnalytique>(rows, count, page, limit)
                );
            }
            else {
                const bordereaux = await BordereauAnalytique.findAll(options);
                return res.status(200).send(bordereaux);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getBordereauAnalytique(req: Request, res: Response): Promise<any> {
        try {
            const bordereau = await BordereauAnalytique.findByPk(req.params.id, { include: [{ all: true, nested: true }] });
            if (!bordereau) return res.status(404).json({ success: false, message: "Bordereau non trouvé" });
            return res.status(200).send(bordereau);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createBordereauAnalytique(req: Request, res: Response): Promise<any> {
        try {
            const bordereau = await BordereauAnalytique.create(req.body);
            return res.status(201).send(bordereau);
        } catch (error) {
            return res.status(400).json({ success: false, error: error });
        }
    }

    static async updateBordereauAnalytique(req: Request, res: Response): Promise<any> {
        try {
            const bordereau = await BordereauAnalytique.findByPk(req.params.id);
            if (!bordereau) return res.status(404).json({ success: false, message: "Bordereau non trouvé" });
            await bordereau.update(req.body);
            return res.status(200).send(bordereau);
        } catch (error) {
            return res.status(400).json({ success: false, error: error });
        }
    }

    static async deleteBordereauAnalytique(req: Request, res: Response): Promise<any> {
        try {
            const bordereau = await BordereauAnalytique.findByPk(req.params.id);
            if (!bordereau) return res.status(404).json({ success: false, message: "Bordereau non trouvé" });
            await bordereau.destroy();
            return res.status(200).json({ success: true, message: "Bordereau supprimé" });
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }
}

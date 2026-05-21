import { Request, Response } from "express";
import { FindOptions, InferAttributes } from "sequelize";
import { Requisition } from "../models/Requisition";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class RequisitionController {

    static async getAllRequisitions(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Requisition>> = {
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

                const { rows, count } = await Requisition.findAndCountAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Requisition>(rows, count, page, limit)
                );
            }
            else {
                const requisitions = await Requisition.findAll(options);
                return res.status(200).send(requisitions);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getRequisition(req: Request, res: Response): Promise<any> {
        try {
            const requisition = await Requisition.findByPk(req.params.id, { include: [{ all: true, nested: true }] });
            if (!requisition) return res.status(404).json({ success: false, message: "Réquisition non trouvée" });
            return res.status(200).send(requisition);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createRequisition(req: Request, res: Response): Promise<any> {
        try {
            const requisition = await Requisition.create(req.body);
            return res.status(201).send(requisition);
        } catch (error) {
            return res.status(400).json({ success: false, error: error });
        }
    }

    static async updateRequisition(req: Request, res: Response): Promise<any> {
        try {
            const requisition = await Requisition.findByPk(req.params.id);
            if (!requisition) return res.status(404).json({ success: false, message: "Réquisition non trouvée" });
            await requisition.update(req.body);
            return res.status(200).send(requisition);
        } catch (error) {
            return res.status(400).json({ success: false, error: error });
        }
    }

    static async deleteRequisition(req: Request, res: Response): Promise<any> {
        try {
            const requisition = await Requisition.findByPk(req.params.id);
            if (!requisition) return res.status(404).json({ success: false, message: "Réquisition non trouvée" });
            await requisition.destroy();
            return res.status(200).json({ success: true, message: "Réquisition supprimée" });
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }
}

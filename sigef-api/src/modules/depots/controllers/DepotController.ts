import { Request, Response } from "express";
import { Depot } from "../models/Depot";
import { DepotPartiePrenante } from "../models/PartiePrenante";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";

export default class DepotController {
    static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const data = await Depot.findAll({
                include: [
                    { model: DepotPartiePrenante, as: 'partiesPrenantes' }
                ]
            });
            return res.status(200).send({ success: true, data });
        } catch (error: any) {
            return res.status(500).send({ success: false, message: error.message });
        }
    }

    static async getById(req: Request, res: Response): Promise<any> {
        try {
            const data = await Depot.findByPk(req.params.id, {
                include: [
                    { model: DepotPartiePrenante, as: 'partiesPrenantes' }
                ]
            });
            if (!data) return res.status(404).send({ success: false, message: "Dépôt non trouvé" });
            return res.status(200).send({ success: true, data });
        } catch (error: any) {
            return res.status(500).send({ success: false, message: error.message });
        }
    }

    static async create(req: Request, res: Response): Promise<any> {
        const transaction = await DatabaseConnection.getInstance().sequelize!.transaction();
        try {
            const { partiesPrenantes, ...depotData } = req.body;

            const depot = await Depot.create(depotData, { transaction });

            if (partiesPrenantes && Array.isArray(partiesPrenantes)) {
                await Promise.all(partiesPrenantes.map((pp: any) =>
                    DepotPartiePrenante.create({ ...pp, depotId: depot.id }, { transaction })
                ));
            }

            await transaction.commit();
            return res.status(201).send({ success: true, data: depot, message: "Dépôt enregistré avec succès" });
        } catch (error: any) {
            await transaction.rollback();
            return res.status(500).send({ success: false, message: error.message });
        }
    }

    static async update(req: Request, res: Response): Promise<any> {
        const transaction = await DatabaseConnection.getInstance().sequelize!.transaction();
        try {
            const depot = await Depot.findByPk(req.params.id);
            if (!depot) {
                await transaction.rollback();
                return res.status(404).send({ success: false, message: "Dépôt non trouvé" });
            }

            const { partiesPrenantes, ...depotData } = req.body;
            await depot.update(depotData, { transaction });

            // Sync partiesPrenantes (delete and recreate)
            await DepotPartiePrenante.destroy({ where: { depotId: depot.id }, transaction });
            if (partiesPrenantes && Array.isArray(partiesPrenantes)) {
                await Promise.all(partiesPrenantes.map((pp: any) =>
                    DepotPartiePrenante.create({ ...pp, depotId: depot.id }, { transaction })
                ));
            }

            await transaction.commit();
            return res.status(200).send({ success: true, data: depot, message: "Dépôt mis à jour avec succès" });
        } catch (error: any) {
            await transaction.rollback();
            return res.status(500).send({ success: false, message: error.message });
        }
    }

    static async delete(req: Request, res: Response): Promise<any> {
        try {
            const depot = await Depot.findByPk(req.params.id);
            if (!depot) return res.status(404).send({ success: false, message: "Dépôt non trouvé" });
            await depot.destroy();
            return res.status(200).send({ success: true, message: "Dépôt supprimé avec succès" });
        } catch (error: any) {
            return res.status(500).send({ success: false, message: error.message });
        }
    }
}

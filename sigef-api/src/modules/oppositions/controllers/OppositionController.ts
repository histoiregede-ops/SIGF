import { Request, Response } from "express";
import { Opposition } from "../models/Opposition";
import { OppositionPartiePrenante } from "../models/PartiePrenante";
import { OppositionRequisition } from "../models/OppositionRequisition";
import { DatabaseConnection } from "../../../core/helpers/DatabaseConnection";

export default class OppositionController {
    static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const data = await Opposition.findAll({
                include: [
                    { model: OppositionPartiePrenante, as: 'partiesPrenantes' },
                    { model: OppositionRequisition, as: 'requisitions' }
                ]
            });
            return res.status(200).send({ success: true, data });
        } catch (error: any) {
            return res.status(500).send({ success: false, message: error.message });
        }
    }

    static async getById(req: Request, res: Response): Promise<any> {
        try {
            const data = await Opposition.findByPk(req.params.id, {
                include: [
                    { model: OppositionPartiePrenante, as: 'partiesPrenantes' },
                    { model: OppositionRequisition, as: 'requisitions' }
                ]
            });
            if (!data) return res.status(404).send({ success: false, message: "Opposition non trouvée" });
            return res.status(200).send({ success: true, data });
        } catch (error: any) {
            return res.status(500).send({ success: false, message: error.message });
        }
    }

    static async create(req: Request, res: Response): Promise<any> {
        const transaction = await DatabaseConnection.getInstance().sequelize!.transaction();
        try {
            const { partiesPrenantes, requisitions, ...oppositionData } = req.body;
            
            const opposition = await Opposition.create(oppositionData, { transaction });

            if (partiesPrenantes && Array.isArray(partiesPrenantes)) {
                await Promise.all(partiesPrenantes.map(pp => 
                    OppositionPartiePrenante.create({ ...pp, oppositionId: opposition.id }, { transaction })
                ));
            }

            if (requisitions && Array.isArray(requisitions)) {
                await Promise.all(requisitions.map(req => 
                    OppositionRequisition.create({ ...req, oppositionId: opposition.id }, { transaction })
                ));
            }

            await transaction.commit();
            return res.status(201).send({ success: true, data: opposition, message: "Opposition enregistrée avec succès" });
        } catch (error: any) {
            await transaction.rollback();
            return res.status(500).send({ success: false, message: error.message });
        }
    }

    static async update(req: Request, res: Response): Promise<any> {
        const transaction = await DatabaseConnection.getInstance().sequelize!.transaction();
        try {
            const opposition = await Opposition.findByPk(req.params.id);
            if (!opposition) {
                await transaction.rollback();
                return res.status(404).send({ success: false, message: "Opposition non trouvée" });
            }

            const { partiesPrenantes, requisitions, ...oppositionData } = req.body;
            await opposition.update(oppositionData, { transaction });

            // Sync partiesPrenantes (delete and recreate)
            await OppositionPartiePrenante.destroy({ where: { oppositionId: opposition.id }, transaction });
            if (partiesPrenantes && Array.isArray(partiesPrenantes)) {
                await Promise.all(partiesPrenantes.map(pp => 
                    OppositionPartiePrenante.create({ ...pp, oppositionId: opposition.id }, { transaction })
                ));
            }

            // Sync requisitions (delete and recreate)
            await OppositionRequisition.destroy({ where: { oppositionId: opposition.id }, transaction });
            if (requisitions && Array.isArray(requisitions)) {
                await Promise.all(requisitions.map(req => 
                    OppositionRequisition.create({ ...req, oppositionId: opposition.id }, { transaction })
                ));
            }

            await transaction.commit();
            return res.status(200).send({ success: true, data: opposition, message: "Opposition mise à jour avec succès" });
        } catch (error: any) {
            await transaction.rollback();
            return res.status(500).send({ success: false, message: error.message });
        }
    }

    static async delete(req: Request, res: Response): Promise<any> {
        try {
            const opposition = await Opposition.findByPk(req.params.id);
            if (!opposition) return res.status(404).send({ success: false, message: "Opposition non trouvée" });
            await opposition.destroy();
            return res.status(200).send({ success: true, message: "Opposition supprimée avec succès" });
        } catch (error: any) {
            return res.status(500).send({ success: false, message: error.message });
        }
    }
}

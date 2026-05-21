import { Request, Response } from "express";
import { FormalitePrealable } from "../models/FormalitePrealable";

export default class FormaliteController {
    static async getAll(req: Request, res: Response): Promise<any> {
        try {
            const data = await FormalitePrealable.findAll();
            return res.status(200).send({ success: true, data });
        } catch (error: any) {
            return res.status(500).send({ success: false, message: error.message });
        }
    }

    static async getById(req: Request, res: Response): Promise<any> {
        try {
            const data = await FormalitePrealable.findByPk(req.params.id);
            if (!data) return res.status(404).send({ success: false, message: "Formalité non trouvée" });
            return res.status(200).send({ success: true, data });
        } catch (error: any) {
            return res.status(500).send({ success: false, message: error.message });
        }
    }

    static async create(req: Request, res: Response): Promise<any> {
        try {
            const data = await FormalitePrealable.create(req.body);
            return res.status(201).send({ success: true, data, message: "Formalité enregistrée avec succès" });
        } catch (error: any) {
            return res.status(500).send({ success: false, message: error.message });
        }
    }

    static async update(req: Request, res: Response): Promise<any> {
        try {
            const formalite = await FormalitePrealable.findByPk(req.params.id);
            if (!formalite) return res.status(404).send({ success: false, message: "Formalité non trouvée" });
            await formalite.update(req.body);
            return res.status(200).send({ success: true, data: formalite, message: "Formalité mise à jour avec succès" });
        } catch (error: any) {
            return res.status(500).send({ success: false, message: error.message });
        }
    }

    static async delete(req: Request, res: Response): Promise<any> {
        try {
            const formalite = await FormalitePrealable.findByPk(req.params.id);
            if (!formalite) return res.status(404).send({ success: false, message: "Formalité non trouvée" });
            await formalite.destroy();
            return res.status(200).send({ success: true, message: "Formalité supprimée avec succès" });
        } catch (error: any) {
            return res.status(500).send({ success: false, message: error.message });
        }
    }
}

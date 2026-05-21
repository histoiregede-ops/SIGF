import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes } from "sequelize";
import { PublicationDemandes } from "../models/PublicationDemandes";

export default class PublicationDemandesController {

    constructor() { }

    static async getAllPublicationsDemandess(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PublicationDemandes>> = {}

        try {
            let publicationsDemandes: PublicationDemandes[];
            publicationsDemandes = await PublicationDemandes.findAll(options);

            return res.status(200).send(publicationsDemandes);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getPublicationDemandes(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PublicationDemandes>> = {}
        options = { where: { id: req.params.id } }

        try {
            const publicationDemandes: PublicationDemandes | null = await PublicationDemandes.findOne(options);

            if (publicationDemandes == null)
                return res.status(404).json({ success: false, message: "PublicationDemandes non trouvée" });

            return res.status(200).send(publicationDemandes);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async createPublicationDemandes(req: Request, res: Response): Promise<any> {

        // let publicationDemandes: PublicationDemandes | null = await PublicationDemandes.findOne({ where: { libelle: req.body.libelle } });

        // if (publicationDemandes != null) {
        //     return res.status(400).json({ success: false, alreadyExists: true });
        // }
        // else {
            let publicationDemandes: PublicationDemandes = new PublicationDemandes();
            publicationDemandes.referenceJournalOfficiel = req.body.referenceJournalOfficiel
            publicationDemandes.dateTransmissionInsertionJournal = req.body.dateTransmissionInsertionJournal
            publicationDemandes.dateInsertionJournal = req.body.dateInsertionJournal
            publicationDemandes.dateTransmissionAffichageAudienceTribunal = req.body.dateTransmissionAffichageAudienceTribunal
            publicationDemandes.dateAffichageAudienceTribunal = req.body.dateAffichageAudienceTribunal
            publicationDemandes.dateEnvoiAffichagePublication = req.body.dateEnvoiAffichagePublication
            publicationDemandes.dateAccuseReceptionAffichagePublication = req.body.dateAccuseReceptionAffichagePublication
            publicationDemandes.dateEnvoiNotificationsIndividuelles = req.body.dateEnvoiNotificationsIndividuelles
            publicationDemandes.dateRetourAccusesReceptionNotificationsIndividuelles = req.body.dateRetourAccusesReceptionNotificationsIndividuelles
            publicationDemandes.dateNormaleClotureDelais = req.body.dateNormaleClotureDelais
            publicationDemandes.propagationRaisonAbsencesClotureDelais = req.body.propagationRaisonAbsencesClotureDelais
            publicationDemandes.formalitePrealableId = req.body.formalitePrealableId

            await publicationDemandes.save()
                .then((publicationDemandes) => {
                    return res.status(201).send(publicationDemandes);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        // }

        // return null
    }

    static async updatePublicationDemandes(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PublicationDemandes>> = { where: { id: req.params.id } }

        let publicationDemandes: PublicationDemandes | null = await PublicationDemandes.findOne(options);
        if (publicationDemandes != null) {

            await publicationDemandes.update({
                referenceJournalOfficiel: req.body.referenceJournalOfficiel,
                dateTransmissionInsertionJournal: req.body.dateTransmissionInsertionJournal,
                dateInsertionJournal: req.body.dateInsertionJournal,
                dateTransmissionAffichageAudienceTribunal: req.body.dateTransmissionAffichageAudienceTribunal,
                dateAffichageAudienceTribunal: req.body.dateAffichageAudienceTribunal,
                dateEnvoiAffichagePublication: req.body.dateEnvoiAffichagePublication,
                dateAccuseReceptionAffichagePublication: req.body.dateAccuseReceptionAffichagePublication,
                dateEnvoiNotificationsIndividuelles: req.body.dateEnvoiNotificationsIndividuelles,
                dateRetourAccusesReceptionNotificationsIndividuelles: req.body.dateRetourAccusesReceptionNotificationsIndividuelles,
                dateNormaleClotureDelais: req.body.dateNormaleClotureDelais,
                propagationRaisonAbsencesClotureDelais: req.body.propagationRaisonAbsencesClotureDelais,
                formalitePrealableId: req.body.formalitePrealableId,
            })
                .then(async (publicationDemandes) => {
                    return res.status(200).send(publicationDemandes);
                })
                .catch((error) => {
                    return res.status(400).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PublicationDemandes non trouvée" });
        }

        return null
    }

    static async deletePublicationDemandes(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<PublicationDemandes>> = { where: { id: req.params.id } }

        let publicationDemandes: PublicationDemandes | null = await PublicationDemandes.findOne(options);
        if (publicationDemandes) {
            await publicationDemandes.destroy()
                .then(() => {
                    return res.status(200).json({ success: true, message: "PublicationDemandes supprimée" });
                })
                .catch((error) => {
                    return res.status(500).json({ success: false, error: error });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "PublicationDemandes non trouvée" });
        }

        return null
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<PublicationDemandes>> = {}

        await PublicationDemandes.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
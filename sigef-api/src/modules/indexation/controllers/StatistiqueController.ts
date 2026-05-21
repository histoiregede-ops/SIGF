import { Request, Response } from "express";
import { CountOptions, FindOptions, Includeable, InferAttributes, Op, WhereOptions } from "sequelize";
import { Fichier } from "../models/Fichier";
import { EtatsControleIndexation, EtatsSaisieIndexation } from "../../../core/enums/EtatsIndexation";
import { TypesRegistre } from "../../../core/enums/TypesRegistre";
import { TacheIndexation } from "../models/TacheIndexation";
import { ProgressionTacheIndexation } from "../models/ProgressionTacheIndexation";
import { DateUtils } from "../../../core/helpers/DateUtils";
import { EtatsProgressionIndexation } from "../../../core/enums/EtatsProgressionIndexation";
import { Utilisateur } from "../../auth/models/Utilisateur";
import { RolesIDs } from "../../../core/enums/RolesIDs";
import { Profil } from "../../auth/models/Profil";
import IndexeurController from "../../auth/controllers/IndexeurController";
import ControleurController from "../../auth/controllers/ControleurController";

export type StatistiquesGlobales = {
    injectes: { total: number, pourcentage: number }
    assignes: { total: number, pourcentage: number }
    indexes: { total: number, pourcentage: number }
    controles: { total: number, pourcentage: number }
}

export type StatistiquesIndexation = {
    assignes: { total: number, pourcentage: number }
    aIndexer: { total: number, pourcentage: number }
    enCours: { total: number, pourcentage: number }
    indexes: { total: number, pourcentage: number }
}

export type StatistiquesControle = {
    assignes: { total: number, pourcentage: number }
    aControler: { total: number, pourcentage: number }
    enCours: { total: number, pourcentage: number }
    controles: { total: number, pourcentage: number }
}

export type StatistiquesSuiviJournalier = {
    dates: Date[]
    indexees: number[]
    signalees: number[]
    rejetees: number[]
    validees: number[]
}

export type StatistiquesQuotasParOperateur = {
    operateur: Utilisateur
    quota: number
    derniereActivite?: Date
}

export default class StatistiqueController {

    constructor() { }

    /**
     * Statistiques globales: nombre de documents injectés, nombre de documents assignés, nombre de documents indexés et nombre de documents contrôlés
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    static async getStatistiquesGlobales(req: Request, res: Response): Promise<any> {
        // console.log(req.query)

        // Filtres de l'utilisateur
        let fichierWhereOptions: WhereOptions<InferAttributes<Fichier>> = { indexable: true }
        let tacheIndexationDocumentsAssignesWhereOptions: WhereOptions<InferAttributes<TacheIndexation>> = {}
        let tacheIndexationDocumentsIndexesWhereOptions: WhereOptions<InferAttributes<TacheIndexation>> = { etatSaisie: EtatsSaisieIndexation.INDEXE }
        let tacheIndexationDocumentsControlesWhereOptions: WhereOptions<InferAttributes<TacheIndexation>> = { etatControle: EtatsControleIndexation.CONTROLE }

        // Application des filtres
        if (req.query.typeRegistre) fichierWhereOptions.typeRegistreId = req.query.typeRegistre as TypesRegistre;
        if (req.query.indexeur) {
            if (req.query.indexeur == 'null') {
                tacheIndexationDocumentsAssignesWhereOptions.indexeurUtilisateurId = { [Op.is]: null }
                tacheIndexationDocumentsIndexesWhereOptions.indexeurUtilisateurId = { [Op.is]: null }
                tacheIndexationDocumentsControlesWhereOptions.indexeurUtilisateurId = { [Op.is]: null }
            }
            else {
                tacheIndexationDocumentsAssignesWhereOptions.indexeurUtilisateurId = req.query.indexeur as string
                tacheIndexationDocumentsIndexesWhereOptions.indexeurUtilisateurId = req.query.indexeur as string
                tacheIndexationDocumentsControlesWhereOptions.indexeurUtilisateurId = req.query.indexeur as string
            }
        }
        if (req.query.controleur) {
            if (req.query.controleur == 'null') {
                tacheIndexationDocumentsAssignesWhereOptions.controleurUtilisateurId = { [Op.is]: null }
                tacheIndexationDocumentsIndexesWhereOptions.controleurUtilisateurId = { [Op.is]: null }
                tacheIndexationDocumentsControlesWhereOptions.controleurUtilisateurId = { [Op.is]: null }
            }
            else {
                tacheIndexationDocumentsAssignesWhereOptions.controleurUtilisateurId = req.query.controleur as string
                tacheIndexationDocumentsIndexesWhereOptions.controleurUtilisateurId = req.query.controleur as string
                tacheIndexationDocumentsControlesWhereOptions.controleurUtilisateurId = req.query.controleur as string
            }
        }

        const nombreDocumentsInjectesOptions: CountOptions<InferAttributes<Fichier>> = {
            where: fichierWhereOptions
        }
        const nombreDocumentsAssignesOptions: CountOptions<InferAttributes<Fichier>> = {
            where: fichierWhereOptions,
            include: [
                { association: Fichier.associations.tacheIndexation, attributes: [], required: true, where: tacheIndexationDocumentsAssignesWhereOptions }
            ]
        }
        const nombreDocumentsIndexesOptions: CountOptions<InferAttributes<Fichier>> = {
            where: fichierWhereOptions,
            include: [
                { association: Fichier.associations.tacheIndexation, attributes: [], required: true, where: tacheIndexationDocumentsIndexesWhereOptions }
            ]
        }
        const nombreDocumentsControlesOptions: CountOptions<InferAttributes<Fichier>> = {
            where: fichierWhereOptions,
            include: [
                { association: Fichier.associations.tacheIndexation, attributes: [], required: true, where: tacheIndexationDocumentsControlesWhereOptions }
            ]
        }

        const nombreDocumentsInjectes: number = await Fichier.count(nombreDocumentsInjectesOptions);
        const nombreDocumentsAssignes: number = await Fichier.count(nombreDocumentsAssignesOptions);
        const nombreDocumentsIndexes: number = await Fichier.count(nombreDocumentsIndexesOptions);
        const nombreDocumentsControles: number = await Fichier.count(nombreDocumentsControlesOptions);

        const statistiquesGlobales: StatistiquesGlobales = {
            injectes: { total: nombreDocumentsInjectes, pourcentage: nombreDocumentsInjectes * 100 / nombreDocumentsInjectes },
            assignes: { total: nombreDocumentsAssignes, pourcentage: nombreDocumentsAssignes * 100 / nombreDocumentsInjectes },
            indexes: { total: nombreDocumentsIndexes, pourcentage: nombreDocumentsIndexes * 100 / nombreDocumentsInjectes },
            controles: { total: nombreDocumentsControles, pourcentage: nombreDocumentsControles * 100 / nombreDocumentsInjectes },
        }

        // console.log(statistiquesGlobales);

        return res.status(200).send(statistiquesGlobales)
    }

    /**
     * Statistiques d'indexation: nombre de documents assignés pour indexation, nombre de documents restants à indexer, nombre de documents en cours d'indexation et nombre de documents indexés
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    static async getStatistiquesIndexation(req: Request, res: Response): Promise<any> {

        // Filtres de l'utilisateur
        let fichierWhereOptions: WhereOptions<InferAttributes<Fichier>> = {}
        let nombreDocumentsAssignesWhereOptions: WhereOptions<InferAttributes<TacheIndexation>> = { indexeurUtilisateurId: { [Op.not]: null } }
        let nombreDocumentsAIndexerWhereOptions: WhereOptions<InferAttributes<TacheIndexation>> = { indexeurUtilisateurId: { [Op.not]: null }, etatSaisie: EtatsSaisieIndexation.A_INDEXER }
        let nombreDocumentsEnCoursWhereOptions: WhereOptions<InferAttributes<TacheIndexation>> = { indexeurUtilisateurId: { [Op.not]: null }, etatSaisie: EtatsSaisieIndexation.EN_COURS }
        let nombreDocumentsIndexesWhereOptions: WhereOptions<InferAttributes<TacheIndexation>> = { indexeurUtilisateurId: { [Op.not]: null }, etatSaisie: EtatsSaisieIndexation.INDEXE }

        // Application des filtres
        if (req.query.typeRegistre) fichierWhereOptions.typeRegistreId = req.query.typeRegistre as TypesRegistre;
        if (req.query.indexeur) {
            if (req.query.indexeur == 'null') {
                nombreDocumentsAssignesWhereOptions.indexeurUtilisateurId = { [Op.is]: null }
                nombreDocumentsAIndexerWhereOptions.indexeurUtilisateurId = { [Op.is]: null }
                nombreDocumentsEnCoursWhereOptions.indexeurUtilisateurId = { [Op.is]: null }
                nombreDocumentsIndexesWhereOptions.indexeurUtilisateurId = { [Op.is]: null }
            }
            else {
                nombreDocumentsAssignesWhereOptions.indexeurUtilisateurId = req.query.indexeur as string
                nombreDocumentsAIndexerWhereOptions.indexeurUtilisateurId = req.query.indexeur as string
                nombreDocumentsEnCoursWhereOptions.indexeurUtilisateurId = req.query.indexeur as string
                nombreDocumentsIndexesWhereOptions.indexeurUtilisateurId = req.query.indexeur as string
            }
        }
        if (req.query.controleur) {
            if (req.query.controleur == 'null') {
                nombreDocumentsAssignesWhereOptions.controleurUtilisateurId = { [Op.is]: null }
                nombreDocumentsAIndexerWhereOptions.controleurUtilisateurId = { [Op.is]: null }
                nombreDocumentsEnCoursWhereOptions.controleurUtilisateurId = { [Op.is]: null }
                nombreDocumentsIndexesWhereOptions.controleurUtilisateurId = { [Op.is]: null }
            }
            else {
                nombreDocumentsAssignesWhereOptions.controleurUtilisateurId = req.query.controleur as string
                nombreDocumentsAIndexerWhereOptions.controleurUtilisateurId = req.query.controleur as string
                nombreDocumentsEnCoursWhereOptions.controleurUtilisateurId = req.query.controleur as string
                nombreDocumentsIndexesWhereOptions.controleurUtilisateurId = req.query.controleur as string
            }
        }

        const fichierAssociationRequired: boolean = Object.keys(fichierWhereOptions).length > 0
        const nombreDocumentsInjectesOptions: CountOptions<InferAttributes<Fichier>> = {
            where: fichierWhereOptions
        }
        const nombreDocumentsAssignesOptions: CountOptions<InferAttributes<TacheIndexation>> = { where: nombreDocumentsAssignesWhereOptions, include: [{ association: TacheIndexation.associations.fichier, where: fichierWhereOptions, required: fichierAssociationRequired }] }
        const nombreDocumentsAIndexerOptions: CountOptions<InferAttributes<TacheIndexation>> = { where: nombreDocumentsAIndexerWhereOptions, include: [{ association: TacheIndexation.associations.fichier, where: fichierWhereOptions, required: fichierAssociationRequired }] }
        const nombreDocumentsEnCoursOptions: CountOptions<InferAttributes<TacheIndexation>> = { where: nombreDocumentsEnCoursWhereOptions, include: [{ association: TacheIndexation.associations.fichier, where: fichierWhereOptions, required: fichierAssociationRequired }] }
        const nombreDocumentsIndexesOptions: CountOptions<InferAttributes<TacheIndexation>> = { where: nombreDocumentsIndexesWhereOptions, include: [{ association: TacheIndexation.associations.fichier, where: fichierWhereOptions, required: fichierAssociationRequired }] }

        const nombreDocumentsInjectes: number = await Fichier.count(nombreDocumentsInjectesOptions);
        const nombreDocumentsAssignes: number = await TacheIndexation.count(nombreDocumentsAssignesOptions)
        const nombreDocumentsAIndexer: number = await TacheIndexation.count(nombreDocumentsAIndexerOptions)
        const nombreDocumentsEnCours: number = await TacheIndexation.count(nombreDocumentsEnCoursOptions)
        const nombreDocumentsIndexes: number = await TacheIndexation.count(nombreDocumentsIndexesOptions)

        const statistiquesIndexation: StatistiquesIndexation = {
            assignes: { total: nombreDocumentsAssignes, pourcentage: nombreDocumentsAssignes * 100 / nombreDocumentsInjectes },
            aIndexer: { total: nombreDocumentsAIndexer, pourcentage: nombreDocumentsAIndexer * 100 / nombreDocumentsAssignes },
            enCours: { total: nombreDocumentsEnCours, pourcentage: nombreDocumentsEnCours * 100 / nombreDocumentsAssignes },
            indexes: { total: nombreDocumentsIndexes, pourcentage: nombreDocumentsIndexes * 100 / nombreDocumentsAssignes },
        }

        // console.log(statistiquesIndexation);

        return res.status(200).send(statistiquesIndexation)
    }

    /**
     * Statistiques de contrôle: nombre de documents assignés pour contrôle, nombre de documents restants à contrôler, nombre de documents en cours de contrôle et nombre de documents contrôlés
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    static async getStatistiquesControle(req: Request, res: Response): Promise<any> {

        // Filtres de l'utilisateur
        let fichierWhereOptions: WhereOptions<InferAttributes<Fichier>> = {}
        let nombreDocumentsAssignesWhereOptions: WhereOptions<InferAttributes<TacheIndexation>> = { controleurUtilisateurId: { [Op.not]: null } }
        let nombreDocumentsAControlerWhereOptions: WhereOptions<InferAttributes<TacheIndexation>> = { controleurUtilisateurId: { [Op.not]: null }, etatControle: { [Op.or]: [EtatsControleIndexation.EN_ATTENTE, EtatsControleIndexation.A_CONTROLER] } }
        let nombreDocumentsEnCoursWhereOptions: WhereOptions<InferAttributes<TacheIndexation>> = { controleurUtilisateurId: { [Op.not]: null }, etatControle: EtatsControleIndexation.EN_COURS }
        let nombreDocumentsControlesWhereOptions: WhereOptions<InferAttributes<TacheIndexation>> = { controleurUtilisateurId: { [Op.not]: null }, etatControle: EtatsControleIndexation.CONTROLE }

        // Application des filtres
        if (req.query.typeRegistre) fichierWhereOptions.typeRegistreId = req.query.typeRegistre as TypesRegistre;
        if (req.query.indexeur) {
            if (req.query.indexeur == 'null') {
                nombreDocumentsAssignesWhereOptions.indexeurUtilisateurId = { [Op.is]: null }
                nombreDocumentsAControlerWhereOptions.indexeurUtilisateurId = { [Op.is]: null }
                nombreDocumentsEnCoursWhereOptions.indexeurUtilisateurId = { [Op.is]: null }
                nombreDocumentsControlesWhereOptions.indexeurUtilisateurId = { [Op.is]: null }
            }
            else {
                nombreDocumentsAssignesWhereOptions.indexeurUtilisateurId = req.query.indexeur as string
                nombreDocumentsAControlerWhereOptions.indexeurUtilisateurId = req.query.indexeur as string
                nombreDocumentsEnCoursWhereOptions.indexeurUtilisateurId = req.query.indexeur as string
                nombreDocumentsControlesWhereOptions.indexeurUtilisateurId = req.query.indexeur as string
            }
        }
        if (req.query.controleur) {
            if (req.query.controleur == 'null') {
                nombreDocumentsAssignesWhereOptions.controleurUtilisateurId = { [Op.is]: null }
                nombreDocumentsAControlerWhereOptions.controleurUtilisateurId = { [Op.is]: null }
                nombreDocumentsEnCoursWhereOptions.controleurUtilisateurId = { [Op.is]: null }
                nombreDocumentsControlesWhereOptions.controleurUtilisateurId = { [Op.is]: null }
            }
            else {
                nombreDocumentsAssignesWhereOptions.controleurUtilisateurId = req.query.controleur as string
                nombreDocumentsAControlerWhereOptions.controleurUtilisateurId = req.query.controleur as string
                nombreDocumentsEnCoursWhereOptions.controleurUtilisateurId = req.query.controleur as string
                nombreDocumentsControlesWhereOptions.controleurUtilisateurId = req.query.controleur as string
            }
        }

        const fichierAssociationRequired: boolean = Object.keys(fichierWhereOptions).length > 0
        const nombreDocumentsInjectesOptions: CountOptions<InferAttributes<Fichier>> = {
            where: fichierWhereOptions
        }
        const nombreDocumentsAssignesOptions: CountOptions<InferAttributes<TacheIndexation>> = { where: nombreDocumentsAssignesWhereOptions, include: [{ association: TacheIndexation.associations.fichier, where: fichierWhereOptions, required: fichierAssociationRequired }] }
        const nombreDocumentsAControlerOptions: CountOptions<InferAttributes<TacheIndexation>> = { where: nombreDocumentsAControlerWhereOptions, include: [{ association: TacheIndexation.associations.fichier, where: fichierWhereOptions, required: fichierAssociationRequired }] }
        const nombreDocumentsEnCoursOptions: CountOptions<InferAttributes<TacheIndexation>> = { where: nombreDocumentsEnCoursWhereOptions, include: [{ association: TacheIndexation.associations.fichier, where: fichierWhereOptions, required: fichierAssociationRequired }] }
        const nombreDocumentsControlesOptions: CountOptions<InferAttributes<TacheIndexation>> = { where: nombreDocumentsControlesWhereOptions, include: [{ association: TacheIndexation.associations.fichier, where: fichierWhereOptions, required: fichierAssociationRequired }] }

        const nombreDocumentsInjectes: number = await Fichier.count(nombreDocumentsInjectesOptions);
        const nombreDocumentsAssignes: number = await TacheIndexation.count(nombreDocumentsAssignesOptions)
        const nombreDocumentsAControler: number = await TacheIndexation.count(nombreDocumentsAControlerOptions)
        const nombreDocumentsEnCours: number = await TacheIndexation.count(nombreDocumentsEnCoursOptions)
        const nombreDocumentsControles: number = await TacheIndexation.count(nombreDocumentsControlesOptions)

        const statistiquesControle: StatistiquesControle = {
            assignes: { total: nombreDocumentsAssignes, pourcentage: nombreDocumentsAssignes * 100 / nombreDocumentsInjectes },
            aControler: { total: nombreDocumentsAControler, pourcentage: nombreDocumentsAControler * 100 / nombreDocumentsAssignes },
            enCours: { total: nombreDocumentsEnCours, pourcentage: nombreDocumentsEnCours * 100 / nombreDocumentsAssignes },
            controles: { total: nombreDocumentsControles, pourcentage: nombreDocumentsControles * 100 / nombreDocumentsAssignes },
        }

        // console.log(statistiquesControle);

        return res.status(200).send(statistiquesControle)
    }

    /**
     * Statistiques de suivi journalier: avoir suivant les jours le nombre de données indexées, signalées, rejetées et validées
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    static async getStatistiquesSuiviJournalier(req: Request, res: Response): Promise<any> {

        // Filtres de l'utilisateur
        let fichierWhereOptions: WhereOptions<InferAttributes<Fichier>> = {}
        let tacheIndexationWhereOptions: WhereOptions<InferAttributes<TacheIndexation>> = {}

        // Application des filtres
        if (req.query.typeRegistre) fichierWhereOptions.typeRegistreId = req.query.typeRegistre as TypesRegistre;
        if (req.query.indexeur) {
            if (req.query.indexeur == 'null') {
                tacheIndexationWhereOptions.indexeurUtilisateurId = { [Op.is]: null }
            }
            else {
                tacheIndexationWhereOptions.indexeurUtilisateurId = req.query.indexeur as string
            }
        }
        if (req.query.controleur) {
            if (req.query.controleur == 'null') {
                tacheIndexationWhereOptions.controleurUtilisateurId = { [Op.is]: null }
            }
            else {
                tacheIndexationWhereOptions.controleurUtilisateurId = req.query.controleur as string
            }
        }

        const fichierAssociationRequired: boolean = Object.keys(fichierWhereOptions).length > 0
        const tacheIndexationAssociationRequired: boolean = Object.keys(tacheIndexationWhereOptions).length > 0
        const progressionIncludeOptions: Includeable[] = [{
            association: ProgressionTacheIndexation.associations.tacheIndexation, where: tacheIndexationWhereOptions, required: fichierAssociationRequired || tacheIndexationAssociationRequired,
            include: [
                { association: TacheIndexation.associations.fichier, where: fichierWhereOptions, required: fichierAssociationRequired }
            ]
        }]

        // Récupération des dates comprises entre la date la plus récente et la date la plus ancienne
        let firstProgressionTacheIndexation: ProgressionTacheIndexation[] = await ProgressionTacheIndexation.findAll({ order: [['createdAt', 'ASC']], limit: 1, include: progressionIncludeOptions })
        let lastProgressionTacheIndexation: ProgressionTacheIndexation[] = await ProgressionTacheIndexation.findAll({ order: [['updatedAt', 'DESC']], limit: 1, include: progressionIncludeOptions })

        let dates: Date[] = []
        let nombreDonneesIndexees: number[] = []
        let nombreDonneesSignalees: number[] = []
        let nombreDonneesRejetees: number[] = []
        let nombreDonneesValidees: number[] = []

        if (firstProgressionTacheIndexation[0] && firstProgressionTacheIndexation[0].createdAt && lastProgressionTacheIndexation[0] && lastProgressionTacheIndexation[0].updatedAt) {
            const startDate: Date = firstProgressionTacheIndexation[0].createdAt
            const endDate: Date = lastProgressionTacheIndexation[0].updatedAt

            dates = DateUtils.getInstance().getDatesBetweenInterval(startDate, endDate)
            // console.log(startDate, endDate, dates.length)
        }

        // Calcul des statistiques par date
        for (let index = 0; index < dates.length; index++) {
            const date = dates[index];
            // console.log(date)
            const dateStart: Date = new Date(date.setHours(0, 0, 1))
            const dateEnd: Date = new Date(date.setHours(23, 59, 59))

            let nombreDonneesIndexeesParDate: number = await ProgressionTacheIndexation.count({ where: { etat: EtatsProgressionIndexation.INDEXE, dateSaisie: { [Op.between]: [dateStart, dateEnd] } }, include: progressionIncludeOptions })
            let nombreDonneesSignaleesParDate: number = await ProgressionTacheIndexation.count({ where: { etat: EtatsProgressionIndexation.SIGNALE, dateSaisie: { [Op.between]: [dateStart, dateEnd] } }, include: progressionIncludeOptions })
            let nombreDonneesRejeteesParDate: number = await ProgressionTacheIndexation.count({ where: { etat: EtatsProgressionIndexation.REJETE, dateSaisie: { [Op.between]: [dateStart, dateEnd] } }, include: progressionIncludeOptions })
            let nombreDonneesValideesParDate: number = await ProgressionTacheIndexation.count({ where: { etat: EtatsProgressionIndexation.VALIDE, dateSaisie: { [Op.between]: [dateStart, dateEnd] } }, include: progressionIncludeOptions })

            nombreDonneesIndexees.push(nombreDonneesIndexeesParDate)
            nombreDonneesSignalees.push(nombreDonneesSignaleesParDate)
            nombreDonneesRejetees.push(nombreDonneesRejeteesParDate)
            nombreDonneesValidees.push(nombreDonneesValideesParDate)
        }


        const statistiquesSuiviJournalier: StatistiquesSuiviJournalier = {
            dates: dates,
            indexees: nombreDonneesIndexees,
            signalees: nombreDonneesSignalees,
            rejetees: nombreDonneesRejetees,
            validees: nombreDonneesValidees,
        }

        // console.log(statistiquesSuiviJournalier);

        return res.status(200).send(statistiquesSuiviJournalier)
    }

    /**
     * Statistiques de quotas par indexeur: nombre de documents indexés par indexeur
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    static async getStatistiquesQuotasParIndexeur(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        // Filtres de l'utilisateur
        let fichierWhereOptions: WhereOptions<InferAttributes<Fichier>> = { indexable: true }

        // Application des filtres
        if (req.query.typeRegistre) fichierWhereOptions.typeRegistreId = req.query.typeRegistre as TypesRegistre;

        // Récupération de liste des indexeurs
        let options: FindOptions<InferAttributes<Utilisateur>> = {
            attributes: IndexeurController.ATTRIBUTES,
            include: [{
                association: Utilisateur.associations.profil,
                include: [
                    { association: Profil.associations.rolesProfil, where: { actif: true, roleId: RolesIDs.INDEXATION_INDEXEUR }, attributes: [] }
                ],
                required: true
            }],
        }
        let progressionIncludeOptions: Includeable[] = Object.keys(fichierWhereOptions).length == 0 ? [] : [
            { association: ProgressionTacheIndexation.associations.tacheIndexation, include: [{ association: TacheIndexation.associations.fichier, where: fichierWhereOptions, required: true }], required: true }
        ]
        // console.log(fichierWhereOptions, progressionIncludeOptions)

        let indexeurs: Utilisateur[];
        indexeurs = await Utilisateur.findAll(options);
        // console.log(indexeurs, indexeurs.length)

        let statistiquesQuotasParIndexeur: StatistiquesQuotasParOperateur[] = []
        for (let index = 0; index < indexeurs.length; index++) {
            const indexeur: Utilisateur = indexeurs[index];

            const donneesSaisies: ProgressionTacheIndexation[] = await ProgressionTacheIndexation.findAll({ where: { indexeurUtilisateurId: indexeur.id }, include: progressionIncludeOptions })
            const lastSaisieProgressionTacheIndexation: ProgressionTacheIndexation[] = await ProgressionTacheIndexation.findAll({ where: { indexeurUtilisateurId: indexeur.id }, order: [['dateSaisie', 'DESC']], limit: 1, include: progressionIncludeOptions })

            statistiquesQuotasParIndexeur.push({
                operateur: indexeur,
                quota: donneesSaisies.length,
                derniereActivite: lastSaisieProgressionTacheIndexation[0]?.dateSaisie,
            })
        }
        // console.log(statistiquesQuotasParIndexeur);

        statistiquesQuotasParIndexeur = statistiquesQuotasParIndexeur.sort((a, b) => {
            // Tri sur l'quota en ordre décroissant
            if (a.quota !== b.quota) {
                return b.quota - a.quota;
            }
            // Si les quotas sont identiques, tri par nom en ordre alphabétique
            const nomCompare = a.operateur.nom.localeCompare(b.operateur.nom);
            if (nomCompare !== 0) {
                return nomCompare;
            }
            // Enfin, tri par prénom en ordre alphabétique
            return a.operateur.prenoms.localeCompare(b.operateur.prenoms);
        })

        return res.status(200).send(statistiquesQuotasParIndexeur)
    }

    /**
     * Statistiques de quotas par contrôleur: nombre de documents contrôlés par contrôleur
     * 
     * @param req 
     * @param res 
     * @returns 
     */
    static async getStatistiquesQuotasParControleur(req: Request, res: Response): Promise<any> {

        // Filtres de l'utilisateur
        let fichierWhereOptions: WhereOptions<InferAttributes<Fichier>> = { indexable: true }

        // Application des filtres
        if (req.query.typeRegistre) fichierWhereOptions.typeRegistreId = req.query.typeRegistre as TypesRegistre;

        // Récupération de liste des indexeurs
        let options: FindOptions<InferAttributes<Utilisateur>> = {
            attributes: ControleurController.ATTRIBUTES,
            include: [{
                association: Utilisateur.associations.profil,
                include: [
                    { association: Profil.associations.rolesProfil, where: { actif: true, roleId: RolesIDs.INDEXATION_CONTROLEUR }, attributes: [] }
                ],
                required: true
            }],
        }
        let progressionIncludeOptions: Includeable[] = Object.keys(fichierWhereOptions).length == 0 ? [] : [
            { association: ProgressionTacheIndexation.associations.tacheIndexation, include: [{ association: TacheIndexation.associations.fichier, where: fichierWhereOptions, required: true }], required: true }
        ]

        let controleurs: Utilisateur[];
        controleurs = await Utilisateur.findAll(options);
        // console.log(controleurs, controleurs.length)

        let statistiquesQuotasParControleur: StatistiquesQuotasParOperateur[] = []
        for (let index = 0; index < controleurs.length; index++) {
            const controleur: Utilisateur = controleurs[index];

            const nombreDonneesControlees: number = await ProgressionTacheIndexation.count({ where: { controleurUtilisateurId: controleur.id }, include: progressionIncludeOptions })
            const lastControleProgressionTacheIndexation: ProgressionTacheIndexation[] = await ProgressionTacheIndexation.findAll({ where: { controleurUtilisateurId: controleur.id }, order: [['dateControle', 'DESC']], limit: 1, include: progressionIncludeOptions })

            statistiquesQuotasParControleur.push({
                operateur: controleur,
                quota: nombreDonneesControlees,
                derniereActivite: lastControleProgressionTacheIndexation[0]?.dateControle,
            })
        }
        // console.log(statistiquesQuotasParControleur);

        statistiquesQuotasParControleur = statistiquesQuotasParControleur.sort((a, b) => {
            // Tri sur l'quota en ordre décroissant
            if (a.quota !== b.quota) {
                return b.quota - a.quota;
            }
            // Si les quotas sont identiques, tri par nom en ordre alphabétique
            const nomCompare = a.operateur.nom.localeCompare(b.operateur.nom);
            if (nomCompare !== 0) {
                return nomCompare;
            }
            // Enfin, tri par prénom en ordre alphabétique
            return a.operateur.prenoms.localeCompare(b.operateur.prenoms);
        })

        return res.status(200).send(statistiquesQuotasParControleur)
    }
}
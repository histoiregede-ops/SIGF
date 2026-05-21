import type { Includeable } from 'sequelize';
import { Transaction } from "sequelize";
import { TitreFoncier } from "../models/TitreFoncier";
import TitreFoncierController from "../controllers/TitreFoncierController";

import { TypesRegistre } from "../../../core/enums/TypesRegistre";
import DossierRegistreController from "../controllers/DossierRegistreController";
import { Depot } from "../models/Depot";
import { FormalitePrealable } from "../models/FormalitePrealable";

const TITRE_FONCIER_INCLUDES: Includeable[] = [
  { model: TitreFoncier.associations.situationPropriete?.target, as: 'situationPropriete' },
  { model: TitreFoncier.associations.limitesTitreFoncier?.target, as: 'limitesTitreFoncier' },
  { model: TitreFoncier.associations.acteRegistre?.target, as: 'acteRegistre' },
];

export class TitreFoncierRepository {

    static async create(requestBody: any, transaction: Transaction): Promise<any> {

        let titreFoncier: TitreFoncier = new TitreFoncier();

        // ✔️ Copier les données proprement
        Object.assign(titreFoncier, requestBody);

        // 🔐 Vérifications importantes
        if (!titreFoncier.situationPropriete) {
            throw new Error("situationPropriete manquante");
        }

        if (!titreFoncier.acteRegistre) {
            throw new Error("acteRegistre manquant");
        }

        // 📌 Génération numéro TF
        const prochainNumeroTitreFoncier: any =
            await TitreFoncierController.getProchainNumeroTitreFoncier(
                titreFoncier.situationPropriete.regionId
            );

        titreFoncier.numeroPrefixe = prochainNumeroTitreFoncier.numeroPrefixe;
        titreFoncier.numero = prochainNumeroTitreFoncier.numero;
        titreFoncier.numeroSuffixe = prochainNumeroTitreFoncier.numeroSuffixe;

        // 📌 Folio
        if (titreFoncier.acteRegistre.folio == null) {
            titreFoncier.acteRegistre.folio = (await DossierRegistreController.getProchainFolioDossierRegistre(
                    titreFoncier.acteRegistre.dossierRegistreId,
                    TypesRegistre.TITRES_FONCIERS
            ))!;
        }

        // 📌 Numéro ordre
        if (titreFoncier.acteRegistre.numeroOrdre == null) {
            titreFoncier.acteRegistre.numeroOrdre = (await DossierRegistreController.getProchainNumeroOrdreDossierRegistre(
                    titreFoncier.acteRegistre.dossierRegistreId,
                    TypesRegistre.TITRES_FONCIERS
            ))!;
        }

        // 📌 Création en base
        return await TitreFoncier.create(titreFoncier, {
            transaction: transaction,
            include: TITRE_FONCIER_INCLUDES
        });
    }

    static async createFromDepot(
        depot: Depot,
        utilisateurId: string,
        transaction: Transaction
    ): Promise<any> {

        // 🔍 Chercher formalité
        const formalitePrealable: FormalitePrealable | null =
            await FormalitePrealable.findOne({
                where: { numeroRequisition: depot.numeroRequisition }
            });

        if (!formalitePrealable) {
            return null;
        }

        // 📌 Création TF
        let titreFoncier: TitreFoncier = new TitreFoncier();
        titreFoncier.utilisateurId = Number(utilisateurId);

        // ⚠️ Ici tu peux compléter les données depuis depot ou formalité si besoin

        return await TitreFoncier.create(titreFoncier, {
            transaction: transaction,
            include: TITRE_FONCIER_INCLUDES
        });
    }
}
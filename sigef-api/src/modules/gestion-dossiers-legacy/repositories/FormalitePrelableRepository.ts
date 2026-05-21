import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { FormalitePrealable } from "../models/FormalitePrealable";
import FormalitePrealableController from "../controllers/FormalitePrealableController";
import { InformationsProprieteRepository } from "./InformationsProprieteRepository";
import { BornageRepository } from "./BornageRepository";
import { ProcedureJudiciaireRepository } from "./ProcedureJudiciaireRepository";
import { PublicationDemandesRepository } from "./PublicationDemandesRepository";
import { SituationProprieteRepository } from "./SituationProprieteRepository";
import { PartiePrenanteRepository } from "./PartiePrenanteRepository";
import { PieceDeposeeRepository } from "./PieceDeposeeRepository";
import { TypesRegistre } from "../../../core/enums/TypesRegistre";
import DossierRegistreController from "../controllers/DossierRegistreController";

export class FormalitePrealableRepository {
    static async create(frequestBody: any, transaction: Transaction): Promise<any> {
        let formalitePrealable: FormalitePrealable = new FormalitePrealable();
        formalitePrealable = frequestBody

        if (formalitePrealable.acteRegistre.folio == null) {
            formalitePrealable.acteRegistre.folio = await DossierRegistreController.getProchainFolioDossierRegistre(formalitePrealable.acteRegistre.dossierRegistreId, TypesRegistre.FORMALITES_PREALABLES)
        }
        if (formalitePrealable.acteRegistre.numeroOrdre == null) {
            formalitePrealable.acteRegistre.numeroOrdre = await DossierRegistreController.getProchainNumeroOrdreDossierRegistre(formalitePrealable.acteRegistre.dossierRegistreId, TypesRegistre.FORMALITES_PREALABLES)
        }

        return FormalitePrealable.create(formalitePrealable, { transaction: transaction, include: FormalitePrealableController.INCLUDES })
    }

    static async update(formalitePrealableUpdateValue: FormalitePrealable, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: FormalitePrealable) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<FormalitePrealable>> = { where: { id: formalitePrealableUpdateValue.id } }
                let formalitePrealable: FormalitePrealable | null = await FormalitePrealable.findOne(options)

                if (formalitePrealable != null) {
                    await formalitePrealable.update(formalitePrealableUpdateValue, { transaction: transaction })

                    // Update informationsPropriete
                    if (formalitePrealableUpdateValue.informationsPropriete) {
                        if (formalitePrealableUpdateValue.informationsPropriete.id != null) {
                            await InformationsProprieteRepository.update(formalitePrealableUpdateValue.informationsPropriete, transaction)
                        }
                        else {
                            formalitePrealableUpdateValue.informationsPropriete.formalitePrealableId = formalitePrealable.id
                            await InformationsProprieteRepository.create(formalitePrealableUpdateValue.informationsPropriete, transaction)
                        }
                    }

                    // Update situationPropriete
                    if (formalitePrealableUpdateValue.situationPropriete) {
                        if (formalitePrealableUpdateValue.situationPropriete.id != null) {
                            await SituationProprieteRepository.update(formalitePrealableUpdateValue.situationPropriete, transaction)
                        }
                        else {
                            formalitePrealableUpdateValue.situationPropriete.formalitePrealableId = formalitePrealable.id
                            await SituationProprieteRepository.create(formalitePrealableUpdateValue.situationPropriete, transaction)
                        }
                    }

                    // Update publicationDemandes
                    if (formalitePrealableUpdateValue.publicationDemandes) {
                        if (formalitePrealableUpdateValue.publicationDemandes.id != null) {
                            await PublicationDemandesRepository.update(formalitePrealableUpdateValue.publicationDemandes, transaction)
                        }
                        else {
                            formalitePrealableUpdateValue.publicationDemandes.formalitePrealableId = formalitePrealable.id
                            await PublicationDemandesRepository.create(formalitePrealableUpdateValue.publicationDemandes, transaction)
                        }
                    }

                    // Update bornage
                    if (formalitePrealableUpdateValue.bornage) {
                        if (formalitePrealableUpdateValue.bornage.id != null) {
                            await BornageRepository.update(formalitePrealableUpdateValue.bornage, transaction)
                        }
                        else {
                            formalitePrealableUpdateValue.bornage.formalitePrealableId = formalitePrealable.id
                            await BornageRepository.create(formalitePrealableUpdateValue.bornage, transaction)
                        }
                    }

                    // Update procedureJudiciaire
                    if (formalitePrealableUpdateValue.procedureJudiciaire) {
                        if (formalitePrealableUpdateValue.procedureJudiciaire.id != null) {
                            await ProcedureJudiciaireRepository.update(formalitePrealableUpdateValue.procedureJudiciaire, transaction)
                        }
                        else {
                            formalitePrealableUpdateValue.procedureJudiciaire.formalitePrealableId = formalitePrealable.id
                            await ProcedureJudiciaireRepository.create(formalitePrealableUpdateValue.procedureJudiciaire, transaction)
                        }
                    }

                    // Update piecesDeposees
                    for (let index = 0; index < formalitePrealableUpdateValue.piecesDeposees.length; index++) {
                        const pieceDeposeeUpdateValue = formalitePrealableUpdateValue.piecesDeposees[index];

                        if (pieceDeposeeUpdateValue) {
                            if (pieceDeposeeUpdateValue.id != null) {
                                await PieceDeposeeRepository.update(pieceDeposeeUpdateValue, transaction)
                            }
                            else {
                                pieceDeposeeUpdateValue.formalitePrealableId = formalitePrealable.id
                                await PieceDeposeeRepository.create(pieceDeposeeUpdateValue, transaction)
                            }
                        }
                    }

                    // Update partiesPrenantes
                    for (let index = 0; index < formalitePrealableUpdateValue.partiesPrenantes.length; index++) {
                        const partiePrenanteUpdateValue = formalitePrealableUpdateValue.partiesPrenantes[index];

                        if (partiePrenanteUpdateValue) {
                            if (partiePrenanteUpdateValue.id != null) {
                                await PartiePrenanteRepository.update(partiePrenanteUpdateValue, transaction)
                            }
                            else {
                                partiePrenanteUpdateValue.formalitePrealableId = formalitePrealable.id
                                await PartiePrenanteRepository.create(partiePrenanteUpdateValue, transaction)
                            }
                        }
                    }

                    resolve()
                }
                else {
                    reject("Not found")
                }
            } catch (error) {
                reject(error)
            }
        })
    }
}
import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { PartiePrenante } from "../models/PartiePrenante";
import PartiePrenanteController from "../controllers/PartiePrenanteController";
import { PersonnePhysiqueRepository } from "./PersonnePhysiqueRepository";
import { PersonneMoraleRepository } from "./PersonneMoraleRepository";
import { PersonneRelationLegaleRepository } from "./PersonneRelationLegaleRepository";
import { GroupePersonnePhysiqueRepository } from "./GroupePersonnePhysiqueRepository";
import { GroupeConjointsRepository } from "./GroupeConjointsRepository";
import { GroupeHeritiersRepository } from "./GroupeHeritiersRepository";

/**
 *  - PartiePrenante.associations.personnePhysique
    - PartiePrenante.associations.personneMorale
    - PartiePrenante.associations.personneRelationLegale
    - PartiePrenante.associations.groupePersonnePhysique
    - PartiePrenante.associations.groupeConjoints
    - PartiePrenante.associations.groupeHeritiers
 */

export class PartiePrenanteRepository {
    static async create(partiePrenante: PartiePrenante, transaction: Transaction): Promise<any> {
        return PartiePrenante.create(partiePrenante, { transaction: transaction, include: PartiePrenanteController.INCLUDES })
    }

    static async update(partiePrenanteUpdateValue: PartiePrenante, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: PartiePrenante) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<PartiePrenante>> = { where: { id: partiePrenanteUpdateValue.id } }
                let partiePrenante: PartiePrenante | null = await PartiePrenante.findOne(options);

                if (partiePrenante != null) {
                    await partiePrenante.update(partiePrenanteUpdateValue, { transaction: transaction })

                    // Update PersonnePhysique
                    if (partiePrenanteUpdateValue.personnePhysique) {
                        if (partiePrenanteUpdateValue.personnePhysique.id != null) {
                            await PersonnePhysiqueRepository.update(partiePrenanteUpdateValue.personnePhysique, transaction)
                        }
                        else {
                            partiePrenanteUpdateValue.personnePhysique.partiePrenanteId = partiePrenante.id
                            await PersonnePhysiqueRepository.create(partiePrenanteUpdateValue.personnePhysique, transaction)
                        }
                    }

                    // Update PersonneMorale
                    if (partiePrenanteUpdateValue.personneMorale) {
                        if (partiePrenanteUpdateValue.personneMorale.id != null) {
                            await PersonneMoraleRepository.update(partiePrenanteUpdateValue.personneMorale, transaction)
                        }
                        else {
                            partiePrenanteUpdateValue.personneMorale.partiePrenanteId = partiePrenante.id
                            await PersonneMoraleRepository.create(partiePrenanteUpdateValue.personneMorale, transaction)
                        }
                    }

                    // Update PersonneRelationLegale
                    if (partiePrenanteUpdateValue.personneRelationLegale) {
                        if (partiePrenanteUpdateValue.personneRelationLegale.id != null) {
                            await PersonneRelationLegaleRepository.update(partiePrenanteUpdateValue.personneRelationLegale, transaction)
                        }
                        else {
                            partiePrenanteUpdateValue.personneRelationLegale.partiePrenanteId = partiePrenante.id
                            await PersonneRelationLegaleRepository.create(partiePrenanteUpdateValue.personneRelationLegale, transaction)
                        }
                    }

                    // Update GroupePersonnePhysique
                    if (partiePrenanteUpdateValue.groupePersonnePhysique) {
                        if (partiePrenanteUpdateValue.groupePersonnePhysique.id != null) {
                            await GroupePersonnePhysiqueRepository.update(partiePrenanteUpdateValue.groupePersonnePhysique, transaction)
                        }
                        else {
                            partiePrenanteUpdateValue.groupePersonnePhysique.partiePrenanteId = partiePrenante.id
                            await GroupePersonnePhysiqueRepository.create(partiePrenanteUpdateValue.groupePersonnePhysique, transaction)
                        }
                    }

                    // Update GroupeConjoints
                    if (partiePrenanteUpdateValue.groupeConjoints) {
                        if (partiePrenanteUpdateValue.groupeConjoints.id != null) {
                            await GroupeConjointsRepository.update(partiePrenanteUpdateValue.groupeConjoints, transaction)
                        }
                        else {
                            partiePrenanteUpdateValue.groupeConjoints.partiePrenanteId = partiePrenante.id
                            await GroupeConjointsRepository.create(partiePrenanteUpdateValue.groupeConjoints, transaction)
                        }
                    }

                    // Update GroupeHeritiers
                    if (partiePrenanteUpdateValue.groupeHeritiers) {
                        if (partiePrenanteUpdateValue.groupeHeritiers.id != null) {
                            await GroupeHeritiersRepository.update(partiePrenanteUpdateValue.groupeHeritiers, transaction)
                        }
                        else {
                            partiePrenanteUpdateValue.groupeHeritiers.partiePrenanteId = partiePrenante.id
                            await GroupeHeritiersRepository.create(partiePrenanteUpdateValue.groupeHeritiers, transaction)
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
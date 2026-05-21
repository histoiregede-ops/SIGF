import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { Opposition } from "../models/Opposition";
import OppositionController from "../controllers/OppositionController";
import { PartiePrenanteRepository } from "./PartiePrenanteRepository";
import { PieceDeposeeRepository } from "./PieceDeposeeRepository";
import { OppositionRequisitionRepository } from "./OppositionRequisitionRepository";
import { TypesRegistre } from "../../../core/enums/TypesRegistre";
import DossierRegistreController from "../controllers/DossierRegistreController";

export class OppositionRepository {
    static async create(requestBody: any, transaction: Transaction): Promise<any> {
        let opposition: Opposition = new Opposition();
        opposition = requestBody

        if(opposition.acteRegistre.folio == null) {
            opposition.acteRegistre.folio = await DossierRegistreController.getProchainFolioDossierRegistre(opposition.acteRegistre.dossierRegistreId, TypesRegistre.OPPOSITIONS)
        }
        if(opposition.acteRegistre.numeroOrdre == null) {
            opposition.acteRegistre.numeroOrdre = await DossierRegistreController.getProchainNumeroOrdreDossierRegistre(opposition.acteRegistre.dossierRegistreId, TypesRegistre.OPPOSITIONS)
        }

        return Opposition.create(opposition, { transaction: transaction, include: OppositionController.INCLUDES })
    }

    static async update(oppositionUpdateValue: Opposition, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: Opposition) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<Opposition>> = { where: { id: oppositionUpdateValue.id } }
                let opposition: Opposition | null = await Opposition.findOne(options)

                if (opposition != null) {
                    await opposition.update(oppositionUpdateValue, { transaction: transaction })

                    // Update piecesDeposees
                    for (let index = 0; index < oppositionUpdateValue.piecesDeposees.length; index++) {
                        const pieceDeposeeUpdateValue = oppositionUpdateValue.piecesDeposees[index];

                        if (pieceDeposeeUpdateValue) {
                            if (pieceDeposeeUpdateValue.id != null) {
                                await PieceDeposeeRepository.update(pieceDeposeeUpdateValue, transaction)
                            }
                            else {
                                pieceDeposeeUpdateValue.oppositionId = opposition.id
                                await PieceDeposeeRepository.create(pieceDeposeeUpdateValue, transaction)
                            }
                        }
                    }

                    // Update partiesPrenantes
                    for (let index = 0; index < oppositionUpdateValue.partiesPrenantes.length; index++) {
                        const partiePrenanteUpdateValue = oppositionUpdateValue.partiesPrenantes[index];

                        if (partiePrenanteUpdateValue) {
                            if (partiePrenanteUpdateValue.id != null) {
                                await PartiePrenanteRepository.update(partiePrenanteUpdateValue, transaction)
                            }
                            else {
                                partiePrenanteUpdateValue.oppositionId = opposition.id
                                await PartiePrenanteRepository.create(partiePrenanteUpdateValue, transaction)
                            }
                        }
                    }

                    // Update oppositionsRequisitions
                    for (let index = 0; index < oppositionUpdateValue.oppositionsRequisitions.length; index++) {
                        const oppositionRequisitionUpdateValue = oppositionUpdateValue.oppositionsRequisitions[index];

                        if (oppositionRequisitionUpdateValue) {
                            if (oppositionRequisitionUpdateValue.id != null) {
                                await OppositionRequisitionRepository.update(oppositionRequisitionUpdateValue, transaction)
                            }
                            else {
                                oppositionRequisitionUpdateValue.oppositionId = opposition.id
                                await OppositionRequisitionRepository.create(oppositionRequisitionUpdateValue, transaction)
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
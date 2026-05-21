import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { Depot } from "../models/Depot";
import DepotController from "../controllers/DepotController";
import { PartiePrenanteRepository } from "./PartiePrenanteRepository";
import { PieceDeposeeRepository } from "./PieceDeposeeRepository";
import { DepotTitreFoncierRepository } from "./DepotTitreFoncierRepository";
import { TypesRegistre } from "../../../core/enums/TypesRegistre";
import DossierRegistreController from "../controllers/DossierRegistreController";

export class DepotRepository {
    static async create(requestBody: any, transaction: Transaction): Promise<any> {
        let depot: Depot = new Depot();
        depot = requestBody

        if(depot.acteRegistre.folio == null) {
            depot.acteRegistre.folio = await DossierRegistreController.getProchainFolioDossierRegistre(depot.acteRegistre.dossierRegistreId, TypesRegistre.DEPOTS)
        }
        if(depot.acteRegistre.numeroOrdre == null) {
            depot.acteRegistre.numeroOrdre = await DossierRegistreController.getProchainNumeroOrdreDossierRegistre(depot.acteRegistre.dossierRegistreId, TypesRegistre.DEPOTS)
        }

        return Depot.create(depot, { transaction: transaction, include: DepotController.INCLUDES })
    }

    static async update(depotUpdateValue: Depot, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: Depot) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<Depot>> = { where: { id: depotUpdateValue.id } }
                let depot: Depot | null = await Depot.findOne(options)

                if (depot != null) {
                    await depot.update(depotUpdateValue, { transaction: transaction })

                    // Update piecesDeposees
                    for (let index = 0; index < depotUpdateValue.piecesDeposees.length; index++) {
                        const pieceDeposeeUpdateValue = depotUpdateValue.piecesDeposees[index];

                        if (pieceDeposeeUpdateValue) {
                            if (pieceDeposeeUpdateValue.id != null) {
                                await PieceDeposeeRepository.update(pieceDeposeeUpdateValue, transaction)
                            }
                            else {
                                pieceDeposeeUpdateValue.depotId = depot.id
                                await PieceDeposeeRepository.create(pieceDeposeeUpdateValue, transaction)
                            }
                        }
                    }

                    // Update partiesPrenantes
                    for (let index = 0; index < depotUpdateValue.partiesPrenantes.length; index++) {
                        const partiePrenanteUpdateValue = depotUpdateValue.partiesPrenantes[index];

                        if (partiePrenanteUpdateValue) {
                            if (partiePrenanteUpdateValue.id != null) {
                                await PartiePrenanteRepository.update(partiePrenanteUpdateValue, transaction)
                            }
                            else {
                                partiePrenanteUpdateValue.depotId = depot.id
                                await PartiePrenanteRepository.create(partiePrenanteUpdateValue, transaction)
                            }
                        }
                    }

                    // Update depotsTitresFonciers
                    for (let index = 0; index < depotUpdateValue.depotsTitresFonciers.length; index++) {
                        const depotTitreFoncierUpdateValue = depotUpdateValue.depotsTitresFonciers[index];

                        if (depotTitreFoncierUpdateValue) {
                            if (depotTitreFoncierUpdateValue.id != null) {
                                await DepotTitreFoncierRepository.update(depotTitreFoncierUpdateValue, transaction)
                            }
                            else {
                                depotTitreFoncierUpdateValue.depotId = depot.id
                                await DepotTitreFoncierRepository.create(depotTitreFoncierUpdateValue, transaction)
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
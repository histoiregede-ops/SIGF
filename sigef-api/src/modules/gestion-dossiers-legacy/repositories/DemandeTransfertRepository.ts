import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { DemandeTransfert } from "../models/DemandeTransfert";
import DemandeTransfertController from "../controllers/DemandeTransfertController";
import { DemandeTransfertActeRegistreRepository } from "./DemandeTransfertActeRegistreRepository";

export class DemandeTransfertRepository {
    static async create(demandeTransfert: DemandeTransfert, transaction: Transaction): Promise<any> {
        return DemandeTransfert.create(demandeTransfert, { transaction: transaction, include: DemandeTransfertController.INCLUDES })
    }

    static async update(demandeTransfertUpdateValue: DemandeTransfert, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: DemandeTransfert) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<DemandeTransfert>> = { where: { id: demandeTransfertUpdateValue.id } }
                let demandeTransfert: DemandeTransfert | null = await DemandeTransfert.findOne(options)

                if (demandeTransfert != null) {
                    await demandeTransfert.update(demandeTransfertUpdateValue, { transaction: transaction })

                    // Update demandeTransfertActesRegistres
                    for (let index = 0; index < demandeTransfertUpdateValue.demandeTransfertActesRegistres.length; index++) {
                        const demandeTransfertActeRegistreUpdateValue = demandeTransfertUpdateValue.demandeTransfertActesRegistres[index];

                        if (demandeTransfertActeRegistreUpdateValue) {
                            if (demandeTransfertActeRegistreUpdateValue.id != null) {
                                await DemandeTransfertActeRegistreRepository.update(demandeTransfertActeRegistreUpdateValue, transaction)
                            }
                            else {
                                demandeTransfertActeRegistreUpdateValue.demandeTransfertId = demandeTransfert.id
                                await DemandeTransfertActeRegistreRepository.create(demandeTransfertActeRegistreUpdateValue, transaction)
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
import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { DemandeTransfertActeRegistre } from "../models/DemandeTransfertActeRegistre";

export class DemandeTransfertActeRegistreRepository {
    static async create(demandeTransfertActeRegistre: DemandeTransfertActeRegistre, transaction: Transaction): Promise<any> {
        return DemandeTransfertActeRegistre.create(demandeTransfertActeRegistre, { transaction: transaction })
    }

    static async update(demandeTransfertActeRegistreUpdateValue: DemandeTransfertActeRegistre, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: DemandeTransfertActeRegistre) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<DemandeTransfertActeRegistre>> = { where: { id: demandeTransfertActeRegistreUpdateValue.id } }
                let demandeTransfertActeRegistre: DemandeTransfertActeRegistre | null = await DemandeTransfertActeRegistre.findOne(options);

                if (demandeTransfertActeRegistre != null) {
                    await demandeTransfertActeRegistre.update(demandeTransfertActeRegistreUpdateValue, { transaction: transaction })

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
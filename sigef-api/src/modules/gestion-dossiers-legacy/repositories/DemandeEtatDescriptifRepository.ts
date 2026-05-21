import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { DemandeEtatDescriptif } from "../models/DemandeEtatDescriptif";
import DemandeEtatDescriptifController from "../controllers/DemandeEtatDescriptifController";

export class DemandeEtatDescriptifRepository {
    static async create(demandeEtatDescriptif: DemandeEtatDescriptif, transaction: Transaction): Promise<any> {
        return DemandeEtatDescriptif.create(demandeEtatDescriptif, { transaction: transaction, include: DemandeEtatDescriptifController.INCLUDES })
    }

    static async update(demandeEtatDescriptifUpdateValue: DemandeEtatDescriptif, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: DemandeEtatDescriptif) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<DemandeEtatDescriptif>> = { where: { id: demandeEtatDescriptifUpdateValue.id } }
                let demandeEtatDescriptif: DemandeEtatDescriptif | null = await DemandeEtatDescriptif.findOne(options)

                if (demandeEtatDescriptif != null) {
                    await demandeEtatDescriptif.update(demandeEtatDescriptifUpdateValue, { transaction: transaction })

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
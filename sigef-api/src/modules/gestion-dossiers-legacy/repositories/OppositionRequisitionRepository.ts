import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { OppositionRequisition } from "../models/OppositionRequisition";

export class OppositionRequisitionRepository {
    static async create(oppositionRequisition: OppositionRequisition, transaction: Transaction): Promise<any> {
        return OppositionRequisition.create(oppositionRequisition, { transaction: transaction })
    }

    static async update(oppositionRequisitionUpdateValue: OppositionRequisition, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: OppositionRequisition) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<OppositionRequisition>> = { where: { id: oppositionRequisitionUpdateValue.id } }
                let oppositionRequisition: OppositionRequisition | null = await OppositionRequisition.findOne(options);

                if (oppositionRequisition != null) {
                    await oppositionRequisition.update(oppositionRequisitionUpdateValue, { transaction: transaction })

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
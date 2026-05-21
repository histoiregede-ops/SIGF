import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { SituationPropriete } from "../models/SituationPropriete";
import SituationProprieteController from "../controllers/SituationProprieteController";

export class SituationProprieteRepository {
    static async create(situationPropriete: SituationPropriete, transaction: Transaction): Promise<any> {
        return SituationPropriete.create(situationPropriete, { transaction: transaction })
    }

    static async update(situationProprieteUpdateValue: SituationPropriete, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: SituationPropriete) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<SituationPropriete>> = { where: { id: situationProprieteUpdateValue.id } }
                let situationPropriete: SituationPropriete | null = await SituationPropriete.findOne(options);

                if (situationPropriete != null) {
                    await situationPropriete.update(situationProprieteUpdateValue, { transaction: transaction })

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
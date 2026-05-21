import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { InformationsPropriete } from "../models/InformationsPropriete";
import InformationsProprieteController from "../controllers/InformationsProprieteController";

export class InformationsProprieteRepository {
    static async create(informationsPropriete: InformationsPropriete, transaction: Transaction): Promise<any> {
        return InformationsPropriete.create(informationsPropriete, { transaction: transaction })
    }

    static async update(informationsProprieteUpdateValue: InformationsPropriete, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: InformationsPropriete) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<InformationsPropriete>> = { where: { id: informationsProprieteUpdateValue.id } }
                let informationsPropriete: InformationsPropriete | null = await InformationsPropriete.findOne(options);

                if (informationsPropriete != null) {
                    await informationsPropriete.update(informationsProprieteUpdateValue, { transaction: transaction })

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
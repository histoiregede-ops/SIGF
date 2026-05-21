import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { Bornage } from "../models/Bornage";
import BornageController from "../controllers/BornageController";

export class BornageRepository {
    static async create(bornage: Bornage, transaction: Transaction): Promise<any> {
        return Bornage.create(bornage, { transaction: transaction })
    }

    static async update(bornageUpdateValue: Bornage, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: Bornage) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<Bornage>> = { where: { id: bornageUpdateValue.id } }
                let bornage: Bornage | null = await Bornage.findOne(options);

                if (bornage != null) {
                    await bornage.update(bornageUpdateValue, { transaction: transaction })

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
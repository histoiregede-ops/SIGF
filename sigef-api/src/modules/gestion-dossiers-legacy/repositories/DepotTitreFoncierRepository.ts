import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { DepotTitreFoncier } from "../models/DepotTitreFoncier";

export class DepotTitreFoncierRepository {
    static async create(depotTitreFoncier: DepotTitreFoncier, transaction: Transaction): Promise<any> {
        return DepotTitreFoncier.create(depotTitreFoncier, { transaction: transaction })
    }

    static async update(depotTitreFoncierUpdateValue: DepotTitreFoncier, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: DepotTitreFoncier) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<DepotTitreFoncier>> = { where: { id: depotTitreFoncierUpdateValue.id } }
                let depotTitreFoncier: DepotTitreFoncier | null = await DepotTitreFoncier.findOne(options);

                if (depotTitreFoncier != null) {
                    await depotTitreFoncier.update(depotTitreFoncierUpdateValue, { transaction: transaction })

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
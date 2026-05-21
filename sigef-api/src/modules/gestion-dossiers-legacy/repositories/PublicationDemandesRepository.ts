import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { PublicationDemandes } from "../models/PublicationDemandes";
import PublicationDemandesController from "../controllers/PublicationDemandesController";

export class PublicationDemandesRepository {
    static async create(publicationDemandes: PublicationDemandes, transaction: Transaction): Promise<any> {
        return PublicationDemandes.create(publicationDemandes, { transaction: transaction })
    }

    static async update(publicationDemandesUpdateValue: PublicationDemandes, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: PublicationDemandes) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<PublicationDemandes>> = { where: { id: publicationDemandesUpdateValue.id } }
                let publicationDemandes: PublicationDemandes | null = await PublicationDemandes.findOne(options);

                if (publicationDemandes != null) {
                    await publicationDemandes.update(publicationDemandesUpdateValue, { transaction: transaction })

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
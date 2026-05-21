import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { GroupeConjoints } from "../models/GroupeConjoints";
import GroupeConjointsController from "../controllers/GroupeConjointsController";
import { PersonneConjointeRepository } from "./PersonneConjointeRepository";

export class GroupeConjointsRepository {
    static async create(groupeConjoints: GroupeConjoints, transaction: Transaction): Promise<any> {
        return GroupeConjoints.create(groupeConjoints, { transaction: transaction, include: GroupeConjointsController.INCLUDES })
    }

    static async update(groupeConjointsUpdateValue: GroupeConjoints, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: GroupeConjoints) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<GroupeConjoints>> = { where: { id: groupeConjointsUpdateValue.id } }
                let groupeConjoints: GroupeConjoints | null = await GroupeConjoints.findOne(options)

                if (groupeConjoints != null) {
                    await groupeConjoints.update(groupeConjointsUpdateValue, { transaction: transaction })

                    // Update personnesConjointes
                    for (let index = 0; index < groupeConjointsUpdateValue.personnesConjointes.length; index++) {
                        const personneConjointeUpdateValue = groupeConjointsUpdateValue.personnesConjointes[index];

                        if (personneConjointeUpdateValue) {
                            if (personneConjointeUpdateValue.id != null) {
                                await PersonneConjointeRepository.update(personneConjointeUpdateValue, transaction)
                            }
                            else {
                                personneConjointeUpdateValue.groupeConjointsId = groupeConjoints.id
                                await PersonneConjointeRepository.create(personneConjointeUpdateValue, transaction)
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
import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { PersonneCible } from "../models/PersonneCible";
import PersonneCibleController from "../controllers/PersonneCibleController";
import { PersonnePhysiqueRepository } from "./PersonnePhysiqueRepository";

export class PersonneCibleRepository {
    static async create(personneCible: PersonneCible, transaction: Transaction): Promise<any> {
        return PersonneCible.create(personneCible, { transaction: transaction, include: PersonneCibleController.INCLUDES })
    }

    static async update(personneCibleUpdateValue: PersonneCible, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: PersonneCible) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<PersonneCible>> = { where: { id: personneCibleUpdateValue.id } }
                let personneCible: PersonneCible | null = await PersonneCible.findOne(options)

                if (personneCible != null) {
                    await personneCible.update(personneCibleUpdateValue, { transaction: transaction })

                    // Update personnePhysique
                    if (personneCibleUpdateValue.personnePhysique) {
                        if (personneCibleUpdateValue.personnePhysique.id != null) {
                            await PersonnePhysiqueRepository.update(personneCibleUpdateValue.personnePhysique, transaction)
                        }
                        // else {
                        //     await PersonnePhysiqueRepository.create(personneCibleUpdateValue.personnePhysique, transaction)
                        // }
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
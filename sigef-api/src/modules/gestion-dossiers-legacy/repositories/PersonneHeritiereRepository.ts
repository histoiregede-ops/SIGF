import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { PersonneHeritiere } from "../models/PersonneHeritiere";
import PersonneHeritiereController from "../controllers/PersonneHeritiereController";
import { PersonnePhysiqueRepository } from "./PersonnePhysiqueRepository";

export class PersonneHeritiereRepository {
    static async create(personneHeritiere: PersonneHeritiere, transaction: Transaction): Promise<any> {
        return PersonneHeritiere.create(personneHeritiere, { transaction: transaction, include: PersonneHeritiereController.INCLUDES })
    }

    static async update(personneHeritiereUpdateValue: PersonneHeritiere, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: PersonneHeritiere) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<PersonneHeritiere>> = { where: { id: personneHeritiereUpdateValue.id } }
                let personneHeritiere: PersonneHeritiere | null = await PersonneHeritiere.findOne(options)

                if (personneHeritiere != null) {
                    await personneHeritiere.update(personneHeritiereUpdateValue, { transaction: transaction })

                    // Update personnePhysique
                    if (personneHeritiereUpdateValue.personnePhysique) {
                        if (personneHeritiereUpdateValue.personnePhysique.id != null) {
                            await PersonnePhysiqueRepository.update(personneHeritiereUpdateValue.personnePhysique, transaction)
                        }
                        // else {
                        //     await PersonnePhysiqueRepository.create(personneHeritiereUpdateValue.personnePhysique, transaction)
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
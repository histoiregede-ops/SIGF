import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { PersonneDisposant } from "../models/PersonneDisposant";
import PersonneDisposantController from "../controllers/PersonneDisposantController";
import { PersonnePhysiqueRepository } from "./PersonnePhysiqueRepository";

export class PersonneDisposantRepository {
    static async create(personneDisposant: PersonneDisposant, transaction: Transaction): Promise<any> {
        return PersonneDisposant.create(personneDisposant, { transaction: transaction, include: PersonneDisposantController.INCLUDES })
    }

    static async update(personneDisposantUpdateValue: PersonneDisposant, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: PersonneDisposant) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<PersonneDisposant>> = { where: { id: personneDisposantUpdateValue.id } }
                let personneDisposant: PersonneDisposant | null = await PersonneDisposant.findOne(options)

                if (personneDisposant != null) {
                    await personneDisposant.update(personneDisposantUpdateValue, { transaction: transaction })

                    // Update personnePhysique
                    if (personneDisposantUpdateValue.personnePhysique) {
                        if (personneDisposantUpdateValue.personnePhysique.id != null) {
                            await PersonnePhysiqueRepository.update(personneDisposantUpdateValue.personnePhysique, transaction)
                        }
                        // else {
                        //     await PersonnePhysiqueRepository.create(personneDisposantUpdateValue.personnePhysique, transaction)
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
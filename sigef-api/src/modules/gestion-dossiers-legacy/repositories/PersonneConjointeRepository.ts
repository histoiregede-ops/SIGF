import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { PersonneConjointe } from "../models/PersonneConjointe";
import PersonneConjointeController from "../controllers/PersonneConjointeController";
import { PersonnePhysiqueRepository } from "./PersonnePhysiqueRepository";

export class PersonneConjointeRepository {
    static async create(personneConjointe: PersonneConjointe, transaction: Transaction): Promise<any> {
        return PersonneConjointe.create(personneConjointe, { transaction: transaction, include: PersonneConjointeController.INCLUDES })
    }

    static async update(personneConjointeUpdateValue: PersonneConjointe, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: PersonneConjointe) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<PersonneConjointe>> = { where: { id: personneConjointeUpdateValue.id } }
                let personneConjointe: PersonneConjointe | null = await PersonneConjointe.findOne(options)

                if (personneConjointe != null) {
                    await personneConjointe.update(personneConjointeUpdateValue, { transaction: transaction })

                    // Update personnePhysique
                    if (personneConjointeUpdateValue.personnePhysique) {
                        if (personneConjointeUpdateValue.personnePhysique.id != null) {
                            await PersonnePhysiqueRepository.update(personneConjointeUpdateValue.personnePhysique, transaction)
                        }
                        // else {
                        //     await PersonnePhysiqueRepository.create(personneConjointeUpdateValue.personnePhysique, transaction)
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
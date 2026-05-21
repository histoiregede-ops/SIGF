import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { PersonneRelationLegale } from "../models/PersonneRelationLegale";
import PersonneRelationLegaleController from "../controllers/PersonneRelationLegaleController";
import { PersonneCibleRepository } from "./PersonneCibleRepository";

export class PersonneRelationLegaleRepository {
    static async create(personneRelationLegale: PersonneRelationLegale, transaction: Transaction): Promise<any> {
        return PersonneRelationLegale.create(personneRelationLegale, { transaction: transaction, include: PersonneRelationLegaleController.INCLUDES })
    }

    static async update(personneRelationLegaleUpdateValue: PersonneRelationLegale, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: PersonneRelationLegale) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<PersonneRelationLegale>> = { where: { id: personneRelationLegaleUpdateValue.id } }
                let personneRelationLegale: PersonneRelationLegale | null = await PersonneRelationLegale.findOne(options)

                if (personneRelationLegale != null) {
                    await personneRelationLegale.update(personneRelationLegaleUpdateValue, { transaction: transaction })

                    // Update personneCible
                    if (personneRelationLegaleUpdateValue.personneCible) {
                        if (personneRelationLegaleUpdateValue.personneCible.id != null) {
                            await PersonneCibleRepository.update(personneRelationLegaleUpdateValue.personneCible, transaction)
                        }
                        else {
                            personneRelationLegaleUpdateValue.personneCible.personneRelationLegaleId = personneRelationLegale.id
                            await PersonneCibleRepository.create(personneRelationLegaleUpdateValue.personneCible, transaction)
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
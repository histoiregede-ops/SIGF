import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { PersonneMembre } from "../models/PersonneMembre";
import PersonneMembreController from "../controllers/PersonneMembreController";
import { PersonnePhysiqueRepository } from "./PersonnePhysiqueRepository";

export class PersonneMembreRepository {
    static async create(personneMembre: PersonneMembre, transaction: Transaction): Promise<any> {
        return PersonneMembre.create(personneMembre, { transaction: transaction, include: PersonneMembreController.INCLUDES })
    }

    static async update(personneMembreUpdateValue: PersonneMembre, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: PersonneMembre) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<PersonneMembre>> = { where: { id: personneMembreUpdateValue.id } }
                let personneMembre: PersonneMembre | null = await PersonneMembre.findOne(options)

                if (personneMembre != null) {
                    await personneMembre.update(personneMembreUpdateValue, { transaction: transaction })

                    // Update personnePhysique
                    if (personneMembreUpdateValue.personnePhysique) {
                        if (personneMembreUpdateValue.personnePhysique.id != null) {
                            await PersonnePhysiqueRepository.update(personneMembreUpdateValue.personnePhysique, transaction)
                        }
                        // else {
                        //     await PersonnePhysiqueRepository.create(personneMembreUpdateValue.personnePhysique, transaction)
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
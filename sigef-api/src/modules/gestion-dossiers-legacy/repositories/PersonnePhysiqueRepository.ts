import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { PersonnePhysique } from "../models/PersonnePhysique";
import PersonnePhysiqueController from "../controllers/PersonnePhysiqueController";
import { RepresentantPersonnePhysiqueRepository } from "./RepresentantPersonnePhysiqueRepository";

export class PersonnePhysiqueRepository {
    static async create(personnePhysique: PersonnePhysique, transaction: Transaction): Promise<any> {
        return PersonnePhysique.create(personnePhysique, { transaction: transaction, include: PersonnePhysiqueController.INCLUDES })
    }

    static async update(personnePhysiqueUpdateValue: PersonnePhysique, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: PersonnePhysique) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<PersonnePhysique>> = { where: { id: personnePhysiqueUpdateValue.id } }
                let personnePhysique: PersonnePhysique | null = await PersonnePhysique.findOne(options)

                if (personnePhysique != null) {
                    await personnePhysique.update(personnePhysiqueUpdateValue, { transaction: transaction })

                    // Update representants
                    for (let index = 0; index < personnePhysiqueUpdateValue.representants.length; index++) {
                        const representantPersonnePhysiqueUpdateValue = personnePhysiqueUpdateValue.representants[index];

                        if (representantPersonnePhysiqueUpdateValue) {
                            if (representantPersonnePhysiqueUpdateValue.id != null) {
                                await RepresentantPersonnePhysiqueRepository.update(representantPersonnePhysiqueUpdateValue, transaction)
                            }
                            else {
                                representantPersonnePhysiqueUpdateValue.personnePhysiqueId = personnePhysique.id
                                await RepresentantPersonnePhysiqueRepository.create(representantPersonnePhysiqueUpdateValue, transaction)
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
import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { ConjointPersonneDisposant } from "../models/ConjointPersonneDisposant";
import ConjointPersonneDisposantController from "../controllers/ConjointPersonneDisposantController";
import { PersonneHeritiereRepository } from "./PersonneHeritiereRepository";
import { PersonnePhysiqueRepository } from "./PersonnePhysiqueRepository";

export class ConjointPersonneDisposantRepository {
    static async create(conjointPersonneDisposant: ConjointPersonneDisposant, transaction: Transaction): Promise<any> {
        return ConjointPersonneDisposant.create(conjointPersonneDisposant, { transaction: transaction, include: ConjointPersonneDisposantController.INCLUDES })
    }

    static async update(conjointPersonneDisposantUpdateValue: ConjointPersonneDisposant, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: ConjointPersonneDisposant) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<ConjointPersonneDisposant>> = { where: { id: conjointPersonneDisposantUpdateValue.id } }
                let conjointPersonneDisposant: ConjointPersonneDisposant | null = await ConjointPersonneDisposant.findOne(options)

                if (conjointPersonneDisposant != null) {
                    await conjointPersonneDisposant.update(conjointPersonneDisposantUpdateValue, { transaction: transaction })

                    // Update personnePhysique
                    if (conjointPersonneDisposantUpdateValue.personnePhysique) {
                        if (conjointPersonneDisposantUpdateValue.personnePhysique.id != null) {
                            await PersonnePhysiqueRepository.update(conjointPersonneDisposantUpdateValue.personnePhysique, transaction)
                        }
                        // else {
                        //     await PersonnePhysiqueRepository.create(conjointPersonneDisposantUpdateValue.personnePhysique, transaction)
                        // }
                    }

                    // Update personnesHeritieres
                    for (let index = 0; index < conjointPersonneDisposantUpdateValue.personnesHeritieres.length; index++) {
                        const personneHeritiereUpdateValue = conjointPersonneDisposantUpdateValue.personnesHeritieres[index];

                        if (personneHeritiereUpdateValue) {
                            if (personneHeritiereUpdateValue.id != null) {
                                await PersonneHeritiereRepository.update(personneHeritiereUpdateValue, transaction)
                            }
                            else {
                                personneHeritiereUpdateValue.conjointPersonneDisposantId = conjointPersonneDisposant.id
                                await PersonneHeritiereRepository.create(personneHeritiereUpdateValue, transaction)
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
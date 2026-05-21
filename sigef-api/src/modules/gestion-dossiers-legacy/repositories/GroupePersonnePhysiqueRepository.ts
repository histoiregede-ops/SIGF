import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { GroupePersonnePhysique } from "../models/GroupePersonnePhysique";
import GroupePersonnePhysiqueController from "../controllers/GroupePersonnePhysiqueController";
import { PersonneMembreRepository } from "./PersonneMembreRepository";

export class GroupePersonnePhysiqueRepository {
    static async create(groupePersonnePhysique: GroupePersonnePhysique, transaction: Transaction): Promise<any> {
        return GroupePersonnePhysique.create(groupePersonnePhysique, { transaction: transaction, include: GroupePersonnePhysiqueController.INCLUDES })
    }

    static async update(groupePersonnePhysiqueUpdateValue: GroupePersonnePhysique, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: GroupePersonnePhysique) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<GroupePersonnePhysique>> = { where: { id: groupePersonnePhysiqueUpdateValue.id } }
                let groupePersonnePhysique: GroupePersonnePhysique | null = await GroupePersonnePhysique.findOne(options)

                if (groupePersonnePhysique != null) {
                    await groupePersonnePhysique.update(groupePersonnePhysiqueUpdateValue, { transaction: transaction })

                    // Update personnesMembres
                    for (let index = 0; index < groupePersonnePhysiqueUpdateValue.personnesMembres.length; index++) {
                        const personneMembreUpdateValue = groupePersonnePhysiqueUpdateValue.personnesMembres[index];

                        if (personneMembreUpdateValue) {
                            if (personneMembreUpdateValue.id != null) {
                                await PersonneMembreRepository.update(personneMembreUpdateValue, transaction)
                            }
                            else {
                                personneMembreUpdateValue.groupePersonnePhysiqueId = groupePersonnePhysique.id
                                await PersonneMembreRepository.create(personneMembreUpdateValue, transaction)
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
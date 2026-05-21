import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { GroupeHeritiers } from "../models/GroupeHeritiers";
import GroupeHeritiersController from "../controllers/GroupeHeritiersController";
import { ConjointPersonneDisposantRepository } from "./ConjointPersonneDisposantRepository";
import { PersonneDisposantRepository } from "./PersonneDisposantRepository";

export class GroupeHeritiersRepository {
    static async create(groupeHeritiers: GroupeHeritiers, transaction: Transaction): Promise<any> {
        return GroupeHeritiers.create(groupeHeritiers, { transaction: transaction, include: GroupeHeritiersController.INCLUDES })
    }

    static async update(groupeHeritiersUpdateValue: GroupeHeritiers, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: GroupeHeritiers) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<GroupeHeritiers>> = { where: { id: groupeHeritiersUpdateValue.id } }
                let groupeHeritiers: GroupeHeritiers | null = await GroupeHeritiers.findOne(options)

                if (groupeHeritiers != null) {
                    await groupeHeritiers.update(groupeHeritiersUpdateValue, { transaction: transaction })

                    // Update personneDisposant
                    if (groupeHeritiersUpdateValue.personneDisposant) {
                        if (groupeHeritiersUpdateValue.personneDisposant.id != null) {
                            await PersonneDisposantRepository.update(groupeHeritiersUpdateValue.personneDisposant, transaction)
                        }
                        else {
                            groupeHeritiersUpdateValue.personneDisposant.groupeHeritiersId = groupeHeritiers.id
                            await PersonneDisposantRepository.create(groupeHeritiersUpdateValue.personneDisposant, transaction)
                        }
                    }

                    // Update conjointsPersonneDisposant
                    for (let index = 0; index < groupeHeritiersUpdateValue.conjointsPersonneDisposant.length; index++) {
                        const conjointPersonneDisposantUpdateValue = groupeHeritiersUpdateValue.conjointsPersonneDisposant[index];

                        if (conjointPersonneDisposantUpdateValue) {
                            if (conjointPersonneDisposantUpdateValue.id != null) {
                                await ConjointPersonneDisposantRepository.update(conjointPersonneDisposantUpdateValue, transaction)
                            }
                            else {
                                conjointPersonneDisposantUpdateValue.groupeHeritiersId = groupeHeritiers.id
                                await ConjointPersonneDisposantRepository.create(conjointPersonneDisposantUpdateValue, transaction)
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
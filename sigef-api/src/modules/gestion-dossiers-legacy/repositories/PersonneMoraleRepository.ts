import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { PersonneMorale } from "../models/PersonneMorale";
import PersonneMoraleController from "../controllers/PersonneMoraleController";
import { RepresentantPersonneMoraleRepository } from "./RepresentantPersonneMoraleRepository";

export class PersonneMoraleRepository {
    static async create(personneMorale: PersonneMorale, transaction: Transaction): Promise<any> {
        return PersonneMorale.create(personneMorale, { transaction: transaction, include: PersonneMoraleController.INCLUDES })
    }

    static async update(personneMoraleUpdateValue: PersonneMorale, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: PersonneMorale) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<PersonneMorale>> = { where: { id: personneMoraleUpdateValue.id } }
                let personneMorale: PersonneMorale | null = await PersonneMorale.findOne(options)

                if (personneMorale != null) {
                    await personneMorale.update(personneMoraleUpdateValue, { transaction: transaction })

                    // Update representants
                    for (let index = 0; index < personneMoraleUpdateValue.representants.length; index++) {
                        const representantPersonneMoraleUpdateValue = personneMoraleUpdateValue.representants[index];

                        if (representantPersonneMoraleUpdateValue) {
                            if (representantPersonneMoraleUpdateValue.id != null) {
                                await RepresentantPersonneMoraleRepository.update(representantPersonneMoraleUpdateValue, transaction)
                            }
                            else {
                                representantPersonneMoraleUpdateValue.personneMoraleId = personneMorale.id
                                await RepresentantPersonneMoraleRepository.create(representantPersonneMoraleUpdateValue, transaction)
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
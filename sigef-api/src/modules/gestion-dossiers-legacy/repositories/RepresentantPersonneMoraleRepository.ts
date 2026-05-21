import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { RepresentantPersonneMorale } from "../models/RepresentantPersonneMorale";
import RepresentantPersonneMoraleController from "../controllers/RepresentantPersonneMoraleController";
import { PersonnePhysiqueRepository } from "./PersonnePhysiqueRepository";

export class RepresentantPersonneMoraleRepository {
    static async create(representantPersonneMorale: RepresentantPersonneMorale, transaction: Transaction): Promise<any> {
        return RepresentantPersonneMorale.create(representantPersonneMorale, { transaction: transaction, include: RepresentantPersonneMoraleController.INCLUDES })
    }

    static async update(representantPersonneMoraleUpdateValue: RepresentantPersonneMorale, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: RepresentantPersonneMorale) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<RepresentantPersonneMorale>> = { where: { id: representantPersonneMoraleUpdateValue.id } }
                let representantPersonneMorale: RepresentantPersonneMorale | null = await RepresentantPersonneMorale.findOne(options)

                if (representantPersonneMorale != null) {
                    await representantPersonneMorale.update(representantPersonneMoraleUpdateValue, { transaction: transaction })

                    // Update representant
                    if (representantPersonneMoraleUpdateValue.representant) {
                        if (representantPersonneMoraleUpdateValue.representant.id != null) {
                            await PersonnePhysiqueRepository.update(representantPersonneMoraleUpdateValue.representant, transaction)
                        }
                        // else {
                        //     await PersonnePhysiqueRepository.create(representantPersonneMoraleUpdateValue.representant, transaction)
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
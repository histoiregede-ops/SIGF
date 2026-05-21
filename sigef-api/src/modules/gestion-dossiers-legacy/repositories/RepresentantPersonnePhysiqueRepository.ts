import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { RepresentantPersonnePhysique } from "../models/RepresentantPersonnePhysique";
import RepresentantPersonnePhysiqueController from "../controllers/RepresentantPersonnePhysiqueController";
import { PersonnePhysiqueRepository } from "./PersonnePhysiqueRepository";

export class RepresentantPersonnePhysiqueRepository {
    static async create(representantPersonnePhysique: RepresentantPersonnePhysique, transaction: Transaction): Promise<any> {
        return RepresentantPersonnePhysique.create(representantPersonnePhysique, { transaction: transaction, include: RepresentantPersonnePhysiqueController.INCLUDES })
    }

    static async update(representantPersonnePhysiqueUpdateValue: RepresentantPersonnePhysique, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: RepresentantPersonnePhysique) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<RepresentantPersonnePhysique>> = { where: { id: representantPersonnePhysiqueUpdateValue.id } }
                let representantPersonnePhysique: RepresentantPersonnePhysique | null = await RepresentantPersonnePhysique.findOne(options)

                if (representantPersonnePhysique != null) {
                    await representantPersonnePhysique.update(representantPersonnePhysiqueUpdateValue, { transaction: transaction })

                    // Update representant
                    if (representantPersonnePhysiqueUpdateValue.representant) {
                        if (representantPersonnePhysiqueUpdateValue.representant.id != null) {
                            await PersonnePhysiqueRepository.update(representantPersonnePhysiqueUpdateValue.representant, transaction)
                        }
                        // else {
                        //     await PersonnePhysiqueRepository.create(representantPersonnePhysiqueUpdateValue.representant, transaction)
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
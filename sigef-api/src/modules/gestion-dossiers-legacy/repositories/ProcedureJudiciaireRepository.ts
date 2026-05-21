import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { ProcedureJudiciaire } from "../models/ProcedureJudiciaire";
import ProcedureJudiciaireController from "../controllers/ProcedureJudiciaireController";

export class ProcedureJudiciaireRepository {
    static async create(procedureJudiciaire: ProcedureJudiciaire, transaction: Transaction): Promise<any> {
        return ProcedureJudiciaire.create(procedureJudiciaire, { transaction: transaction })
    }

    static async update(procedureJudiciaireUpdateValue: ProcedureJudiciaire, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: ProcedureJudiciaire) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<ProcedureJudiciaire>> = { where: { id: procedureJudiciaireUpdateValue.id } }
                let procedureJudiciaire: ProcedureJudiciaire | null = await ProcedureJudiciaire.findOne(options);

                if (procedureJudiciaire != null) {
                    await procedureJudiciaire.update(procedureJudiciaireUpdateValue, { transaction: transaction })

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
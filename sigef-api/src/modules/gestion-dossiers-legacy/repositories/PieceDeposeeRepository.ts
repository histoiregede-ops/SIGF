import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { PieceDeposee } from "../models/PieceDeposee";
import PieceDeposeeController from "../controllers/PieceDeposeeController";

export class PieceDeposeeRepository {
    static async create(pieceDeposee: PieceDeposee, transaction: Transaction): Promise<any> {
        return PieceDeposee.create(pieceDeposee, { transaction: transaction })
    }

    static async update(pieceDeposeeUpdateValue: PieceDeposee, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value?: PieceDeposee) => void, reject: (reason?: any) => void) => {
            try {
                let options: FindOptions<InferAttributes<PieceDeposee>> = { where: { id: pieceDeposeeUpdateValue.id } }
                let pieceDeposee: PieceDeposee | null = await PieceDeposee.findOne(options);

                if (pieceDeposee != null) {
                    await pieceDeposee.update(pieceDeposeeUpdateValue, { transaction: transaction })

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
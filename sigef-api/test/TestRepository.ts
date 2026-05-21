import { Request, Response } from "express";
import { FindOptions, InferAttributes, Transaction } from "sequelize";
import { Test } from "./Test";
import { resolve } from "path";

export class TestRepository {
    static async create(testObject: Test, transaction: Transaction): Promise<any> {
        return Test.create(testObject, { transaction: transaction })
    }

    static async update(testObject: Test, transaction: Transaction): Promise<any> {
        return new Promise(async (resolve: (value: Test) => void, reject: (reason?: any) => void) => {
            // try {
                // if (testObject.id == null) {
                //     console.log("Update error")
                //     reject({})
                // }
                // else {
                    // try {
                    let options: FindOptions<InferAttributes<Test>> = { where: { id: testObject.id } }
                    let test: Test | null = await Test.findOne(options);

                    if (test != null) {
                        await test.update(testObject, { transaction: transaction })
                        .then((value) => {
                            resolve(value)
                        })
                        .catch(error => {
                            reject(error)
                        })
                    }
                    else {
                        console.log("Update error")
                        reject("Not found")
                    }
                // }
            // }
            // catch (error) {
            //     console.log("Update error")
            //     reject(error)
            // }
        })
    }
}
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { DatabaseConnection } from "../src/core/helpers/DatabaseConnection";
import { TestRepository } from "./TestRepository";
import { Test } from "./Test";

export default class TestController {

    constructor() { }

    static getEmailConfirmationToken(id: string, email: string): string {
        return jwt.sign(
            {
                // Will expire in 60 * 60 seconds (1 hour)
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: {
                    id: id,
                    email: email
                }
            },
            //TODO change and move in config file
            'secret'
        );
    }

    static async test(req: Request, res: Response): Promise<any> {
        // await DatabaseConnection.getInstance().sequelize.transaction(async (t) => {
        const t = await DatabaseConnection.getInstance().sequelize.transaction();
        
        try {
            await TestRepository.create({ data: 'data 1' } as Test, t)//.catch((error) => console.log(error))
            await TestRepository.update({ id: '14', data: 'data 2' } as Test, t)//.catch((error) => console.log(error))
            await TestRepository.create({ data: 'data 1' } as Test, t)//.catch((error) => console.log(error))
            // await TestRepository.update({ id: '15', data: 'data 2' } as Test, t)//.catch((error) => console.log(error))
            // await TestRepository.create({ data: 'data 1' } as Test, t)//.catch((error) => console.log(error))
            // await TestRepository.update({ id: '17', data: 'data 2' } as Test, t)//.catch((error) => console.log(error))

            await t.commit()
        }
        catch (error) {
            // Rollback
            console.log("Transac error", error)
            await t.rollback()
            // return res.status(500).json({ success: false, error: error });
        }
        // })

        return res.send("Hello world")

        // try {
        //     const utilisateur = await Utilisateur.findOne({ where: { [Op.or]: [{ email: req.body.email ?? null }, { identifiant: req.body.identifiant ?? null }] } });

        //     if (!utilisateur) {
        //         return res.status(404).json({ message: 'Utilisateur non trouvé' });
        //     }

        //     if (bcrypt.compareSync(req.body.motDePasse, utilisateur.motDePasse)) {
        //         const token = jwt.sign(
        //             {
        //                 id: utilisateur.id,
        //                 // nom: utilisateur.nom,
        //                 // prenoms: utilisateur.prenoms,
        //                 email: utilisateur.email,
        //                 identifiant: utilisateur.identifiant,
        //                 profil: utilisateur.profil,
        //             },
        //             'secret'
        //         );

        //         return res.status(200).json({ identifiant: utilisateur.identifiant, token: token });
        //     }
        //     else {
        //         return res.status(400).json({ message: 'Erreur' });
        //     }
        // } catch (error) {
        //     return res.status(500).json({ error: error });
        // }
    }

}
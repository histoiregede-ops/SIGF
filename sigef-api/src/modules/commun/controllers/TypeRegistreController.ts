import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { TypeRegistre } from "../models/TypeRegistre";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class TypeRegistreController {

    constructor() { }

    static async getAllTypesRegistre(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let typeRegistreWhereOptions: WhereOptions<InferAttributes<TypeRegistre>> = {}

            // Application des filtres
            if (req.query.search) {
                typeRegistreWhereOptions[Op.or] = [
                    { libelle: { [Op.like]: `%${req.query.search}%` } },
                    { abbreviation: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<TypeRegistre>> = {
                where: typeRegistreWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<TypeRegistre>> = {
                where: typeRegistreWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const typesRegistreCount: number = await TypeRegistre.count(countOptions)
                let typesRegistre: TypeRegistre[] = await TypeRegistre.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<TypeRegistre>(typesRegistre, typesRegistreCount, page, limit)
                );
            }
            else {
                let typesRegistre: TypeRegistre[];
                typesRegistre = await TypeRegistre.findAll(options);

                return res.status(200).send(typesRegistre);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getTypeRegistre(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<TypeRegistre>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const typeregistre: TypeRegistre | null = await TypeRegistre.findOne(options);

            if (typeregistre == null)
                return res.status(404).json({ success: false, message: "TypeRegistre non trouvée" });

            return res.status(200).send(typeregistre);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<TypeRegistre>> = {}

        await TypeRegistre.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
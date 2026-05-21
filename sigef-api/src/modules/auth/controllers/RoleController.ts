import { Request, Response } from "express";
import { CountOptions, FindOptions, InferAttributes, Op, WhereOptions } from "sequelize";
import { Role } from "../models/Role";
import { DataPaginator } from "../../../core/helpers/DataPaginator";

export default class RoleController {

    constructor() { }

    static async getAllRoles(req: Request, res: Response): Promise<any> {

        // console.log(req.query)

        try {
            // Filtres de l'utilisateur
            let roleWhereOptions: WhereOptions<InferAttributes<Role>> = {}

            // Application des filtres
            if (req.query.search) {
                roleWhereOptions[Op.or] = [
                    { id: { [Op.like]: `%${req.query.search}%` } },
                    { description: { [Op.like]: `%${req.query.search}%` } },
                ]
            }

            let options: FindOptions<InferAttributes<Role>> = {
                where: roleWhereOptions,
                order: [['createdAt', 'DESC']],
            }

            let countOptions: CountOptions<InferAttributes<Role>> = {
                where: roleWhereOptions,
            }

            if (req.query.page != undefined && req.query.size != undefined) {
                const page = Number(req.query.page)
                const size = Number(req.query.size)
                const { limit, offset } = DataPaginator.getInstance().getPagination(page, size)

                options.limit = limit
                options.offset = offset

                const rolesCount: number = await Role.count(countOptions)
                let roles: Role[] = await Role.findAll(options);

                return res.status(200).send(
                    DataPaginator.getInstance().getPagingData<Role>(roles, rolesCount, page, limit)
                );
            }
            else {
                let roles: Role[];
                roles = await Role.findAll(options);

                return res.status(200).send(roles);
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getRole(req: Request, res: Response): Promise<any> {
        let options: FindOptions<InferAttributes<Role>> = {}
        options = {
            where: { id: req.params.id },
            include: []
        }

        try {
            const role: Role | null = await Role.findOne(options);

            if (role == null)
                return res.status(404).json({ success: false, message: "Role non trouvée" });

            return res.status(200).send(role);
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    }

    static async getCount(req: Request, res: Response): Promise<any> {
        let options: CountOptions<InferAttributes<Role>> = {}

        await Role.count(options)
            .then((value) => {
                return res.status(200).json({ success: true, count: value });
            })
            .catch((error) => {
                return res.status(500).json({ success: false, error: error });
            });

        return null
    }
}
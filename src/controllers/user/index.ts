import generateJwtToken from "../../middlewares/auth"
import { RoleModel } from "../../models/role/RoleModel"
import { CompanyModel } from "../../models/user/companyDetailModel"
import { UserModel } from "../../models/user/userModel"

export const UserController = {
    async getUser(req, res) {
        const user = await UserModel.findAll({
            include: [
                {
                    model: CompanyModel,
                    required: false,
                    as: "as_company_detail",
                    attributes: ["id", "company_name", "company_address", "company_city", "company_country", "company_zip"]
                },
                {
                    model: RoleModel,
                    required: false,
                    as: "as_role",
                    attributes: ["id", "role"]
                }
            ]
        })

        res.send(user)
    },
    async getUserByToken(req, res) {
        const id = req.sqlUID
        const user = await UserModel.findOne({
            where : {
                id
            },
            include: [
                {
                    model: CompanyModel,
                    required: false,
                    as: "as_company_detail",
                    attributes: ["id","company_logo", "company_name", "company_address", "company_city", "company_country", "company_zip"]
                },
                {
                    model: RoleModel,
                    required: false,
                    as: "as_role",
                    attributes: ["id", "role"]
                }
            ]
        })
        if (!user) {
            res.status(404).send({
                message: "User not found"
            })
            return
        }

        res.send(user)
    },

    async addCompanyDetail(req, res) {
        const { company_name,
            company_address,
            company_city,
            company_country,
            company_zip,
            company_logo
        } = req.body


        const company = await CompanyModel.create({
            company_name,
            company_address,
            company_city,
            company_country,
            company_zip,
            company_logo,
            created_by : req.sqlUID
        })

        await UserModel.update({
            company_id : company?.get("id")
        },{
            where : {
                id : req.sqlUID
            }
        })

        res.send(company)
    },

    async getUserToken(req, res) {
        const email = req.params.email
        const exist = await UserModel.findOne({
            where: {
                email
            },
            include: [
                {
                    model: RoleModel,
                    required: false,
                    as: "as_role",
                    attributes: ["id", "role"]
                },
                {
                    model: CompanyModel,
                    required: false,
                    as: "as_company_detail",
                    attributes: ["id", "company_name", "company_address", "company_city", "company_country", "company_zip"]
                }
            ]
        })
        if (!exist) {
            res.status(404).send({
                message: "User not found"
            })
            return
        }

        const token = generateJwtToken(exist?.get("id"), exist?.get("email"))

        res.send({
            user: exist,
            token: token
        })
    },

    async createUser(req, res) {
        const { role, email, company_id, name } = req.body
        const sqlUID = req.sqlUID

        const exists = await UserModel.findOne({
            where: { email }
        })
        if (exists) {
            res.status(400).send({
                message: "email already used"
            })
            return
        }

        const user = await UserModel.create({
            role,
            email,
            name,
            company_id,
            created_by: sqlUID
        })

        res.send(user)
    }
}
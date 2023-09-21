import generateJwtToken from "../../middlewares/auth"
import { UserModel } from "../../models/user/userModel"

export const UserController = {
    async getUser(req, res) {
        const user = await UserModel.findAll({})

        res.send(user)
    },

    async getUserToken(req, res) {
        const email = req.params.email
        const exist = await UserModel.findOne({
            where: {
                email
            }
        })
        if (!exist) {
            res.status(404).send({
                message: "User not found"
            })
            return
        }

        const token = generateJwtToken(exist?.get("id"), exist?.get("email"))

        res.send({
            user : exist,
            token : token
        })
    },

    async createUser(req, res) {
        const { role, email } = req.body
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
            created_by: sqlUID
        })

        res.send(user)
    }
}
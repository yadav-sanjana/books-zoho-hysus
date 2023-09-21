import { UserModel } from "../../models/user/userModel"

export const UserController = {
    async getUser(req,res) {
        const user = await UserModel.findAll({})

        res.send(user)
    }
}
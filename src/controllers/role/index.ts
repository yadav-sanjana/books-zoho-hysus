import { RoleModel } from "../../models/role/RoleModel"

export const RoleController = {
    async createRole(req, res) {
        const { name } = req.body

        const exists = await RoleModel.findOne({
            where: {
                name
            }
        })

        if (exists) {
            return res.status(400).send({
                message: "Role is already listed"
            })
        }

        const newRole = await RoleModel.create({
            name
        })
        res.send(newRole)
    },

    async fetchRoles(req, res) {
        const roleList = await RoleModel.findAll({})

        res.send(roleList)
    },
    async roleById(req, res) {
        const role = await RoleModel.findOne({
            where: {
                id: req.params.id
            }
        })

        res.send(role)
    }

}
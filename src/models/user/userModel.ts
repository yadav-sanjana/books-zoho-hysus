import { DataTypes } from "sequelize";
import { db } from "../../config/db";
import { CompanyModel } from "./companyDetailModel";
import { RoleModel } from "../role/RoleModel";

export const UserModel = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: true
})

UserModel.hasOne(CompanyModel, { sourceKey: "company_id", foreignKey: "id", as: "as_company_detail" })
UserModel.hasOne(RoleModel, { sourceKey: 'role', foreignKey: 'id', as: "as_role" })
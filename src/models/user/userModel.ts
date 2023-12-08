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
        allowNull: true
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

UserModel.belongsTo(CompanyModel, {
    foreignKey: 'company_id',
    as: 'as_company_detail'
});
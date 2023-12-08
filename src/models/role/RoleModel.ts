import { DataTypes } from "sequelize";
import { db } from "../../config/db";
import { SalesPersonModel } from "../salesperson/salesPersonModel";
import { UserModel } from "../user/userModel";

export const RoleModel = db.define('role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
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

UserModel.belongsTo(RoleModel, {
    foreignKey: 'role',
    as: 'as_role',
    onDelete: 'CASCADE',
    onUpdate: 'SET NULL'
});

SalesPersonModel.belongsTo(RoleModel, {
    foreignKey: 'role',
    as: 'as_role',
    onDelete: 'CASCADE',
    onUpdate: 'SET NULL'
});

RoleModel.hasMany(UserModel, {
    foreignKey: 'role',
    as: 'as_user',
    onDelete: 'CASCADE',
    onUpdate: 'SET NULL'
});

RoleModel.hasMany(SalesPersonModel, {
    foreignKey: 'role',
    as: 'as_sales_person',
    onDelete: 'CASCADE',
    onUpdate: 'SET NULL'
});
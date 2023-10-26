import { DataTypes } from "sequelize";
import { db } from "../../config/db";

export const RoleModel = db.define('role', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: true
})
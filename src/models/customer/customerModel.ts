import { DataTypes } from "sequelize";
import { db } from "../../config/db";

export const CustomerModel = db.define('customer', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customerType: {
        type: DataTypes.ENUM,
        values: ["business", "individual"],
        defaultValue: "business"
    },
    contactPerson: {
        type: DataTypes.STRING,
        allowNull: true
    },
    company: {
        type: DataTypes.STRING,
        allowNull: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customer_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    work_phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile_phone: {
        type: DataTypes.STRING,
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
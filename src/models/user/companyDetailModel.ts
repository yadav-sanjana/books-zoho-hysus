import { DataTypes } from "sequelize";
import { db } from "../../config/db";

export const CompanyModel = db.define('company_detail', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    company_address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    company_city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    company_country: {
        type: DataTypes.STRING,
        allowNull: true
    },
    company_zip: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    company_logo: {
        type: DataTypes.TEXT('long'),
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


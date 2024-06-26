import { DataTypes } from "sequelize";
import { db } from "../../config/db";
import { CompanyModel } from "../user/companyDetailModel";

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
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    customer_email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    skype_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    work_phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mobile_phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    razorpay_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    stripe_id: {
        type: DataTypes.STRING,
        allowNull: true
    },
    website: {
        type: DataTypes.STRING,
        allowNull: true
    },
    company_detail: {
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

export const CartModel = db.define('customer_cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tax: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    total_amount: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    payableAmount: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    timestamps: true
})


 
CartModel.belongsTo(CustomerModel, { foreignKey: 'customer_id' })
CustomerModel.belongsTo(CompanyModel, { foreignKey: 'id', as: 'as_company' })
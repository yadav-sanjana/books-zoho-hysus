import { DataTypes } from "sequelize";
import { db } from "../../config/db";
import { CartModel, CustomerModel } from "../customer/customerModel";
import { SalesPersonModel } from "../salesperson/salesPersonModel";

export const InvoiceModel = db.define('invoice', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    customer: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    invoice_no: {
        type: DataTypes.STRING,
        allowNull: true
    },
    order_no: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    invoice_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    terms: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    due_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    sales_person: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    subject: {
        type: DataTypes.STRING,
        allowNull: true
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tax: {
        type: DataTypes.STRING,
        allowNull: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    balance: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    customer_notes: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ATC: {
        type: DataTypes.STRING,
        allowNull: true
    },
    file: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM,
        values: ["draft", "due", "paid"],
        defaultValue: "draft"
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

export const TermModel = db.define('term', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    term: {
        type: DataTypes.STRING,
        allowNull: false
    },
    days: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    timestamps: true
})

export const ItemModel = db.define('item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    invoice_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    item: {
        type: DataTypes.STRING,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    rate: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    discount: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tax: {
        type: DataTypes.STRING,
        allowNull: true
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
}, {
    timestamps: true
})


InvoiceModel.belongsTo(CustomerModel, { foreignKey: 'customer', as: "as_customer" })

InvoiceModel.belongsTo(SalesPersonModel, { foreignKey: 'sales_person', as: "as_sales_person" })

InvoiceModel.belongsTo(TermModel, { foreignKey: 'terms', as: "as_terms" })
InvoiceModel.hasMany(ItemModel, { foreignKey: 'invoice_id', as: "as_items" })
ItemModel.belongsTo(InvoiceModel, { foreignKey: 'invoice_id', as: "as_invoice" })
ItemModel.hasOne(CartModel, { foreignKey: "id", sourceKey: "cart_id", as: "as_cart" })

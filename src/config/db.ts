import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';

dotenv.config();

const dbHost = process.env.MYSQLHOST;
const isProduction = process.env.NODE_ENV === 'production';

const productionDbUrl = process.env.PRODUCTION_DB_URL;
const developmentDbUrl = process.env.DEVELOPMENT_DB_URL;

//checking modes
const dbUrl = isProduction ? productionDbUrl : developmentDbUrl;

export const db = new Sequelize("mysql://hysus-admin:8jcfbtt_rh)x@68.178.145.199:3306/zoho-dev", {
  host: dbHost,
  dialect: 'mysql',
  dialectModule: require('mysql2'),
  dialectOptions: {
    connectTimeout: 60000, // Adjust the timeout value as needed
  },
  logging: true
});








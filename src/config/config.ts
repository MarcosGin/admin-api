const dotenv = require('dotenv').config();

export const development = {
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: "localhost",
  port: 3306,
  dialect: "mysql"
}
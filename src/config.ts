import dotenv from "dotenv";

dotenv.config();

export const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306,
};

export const serverConfig = {
  port: Number(process.env.PORT) || 3000,
};

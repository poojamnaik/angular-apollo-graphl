import dotenv from 'dotenv';

dotenv.config();

export const CONFIG = {
  port: process.env.PORT || 4000,
  host: process.env.HOST || 'localhost',
  db: {
    client: process.env.DB_CLIENT,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
}

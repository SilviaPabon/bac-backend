import dotenv from 'dotenv';
dotenv.config();
import Pg from 'pg';

export const Pool = new Pg.Pool({
	user: process.env.PG_USER || 'admin',
	password: process.env.PG_PASSWORD || 'admin',
	host: process.env.PG_HOST || 'localhost',
	database: process.env.PG_DATABASE || 'bac_database',
	port: Number(process.env.PG_PORT) || 5432,
});
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const pgConfig = {
	host: process.env.PG_HOST,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
	user: process.env.PG_USER,
	database: process.env.PG_DATABASE,
};

export default pgConfig;

import { Pool, QueryResultRow } from "pg";
import "dotenv/config";

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_NAME,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
});

export const query = <T extends QueryResultRow>(
  text: string,
  params?: any
): Promise<{ rows: T[] }> => pool.query<T>(text, params);

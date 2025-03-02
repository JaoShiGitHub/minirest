import * as pg from "pg";
const { Pool } = pg.default;

const pool = new Pool({
  connectionString: "postgresql://postgres:081400@localhost:5432/mini_rest",
});

export { pool };

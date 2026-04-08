import pkg from "pg";
const { Pool } = pkg;

const config = process.env.DATABASE_URL
  ? { 
      connectionString: process.env.DATABASE_URL,
      // Render usually requires SSL for external connections
      ssl: { rejectUnauthorized: false } 
    }
  : {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    };

const pool = new Pool(config);

export default pool;
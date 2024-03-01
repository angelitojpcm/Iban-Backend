import { Sequelize } from "sequelize";

const conn = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

conn
  .authenticate()
  .then(() => {
    console.log("Conexión establecida con éxito.");
  })
  .catch((err) => {
    console.error("No se pudo conectar a la base de datos:", err);
  });

export function query(sql: string, replacements: any[]): Promise<any[]> {
  return conn.query(sql, { replacements });
}

export { conn };

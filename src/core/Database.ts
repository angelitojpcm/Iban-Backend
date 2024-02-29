import mysql from "mysql";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export function query(sql: string, params: any[]): Promise<any[]> {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return; // Detiene la ejecución de la función si hay un error
      }

      connection.query(sql, params, (error, results) => {
        connection.release();

        if (error) reject(error);
        resolve(results);
      });
    });
  });
}

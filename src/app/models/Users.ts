import { query } from "../../core/Database";
import Model from "../../core/Model";
import { IUser } from "../../interfaces/User";

class Users extends Model {
  protected table = "users";
  protected filiable = [
    "name",
    "email",
    "photo",
    "rol_id",
    "password",
    "created_at",
    "updated_at",
  ];

  /**
   * Select all users or by email
   * @param email
   * @returns
   */
  all(email: string | null = null): Promise<IUser[]> {
    return new Promise((resolve, reject) => {
      let queryStr = `SELECT * FROM ${this.table}`;
      let params = [];

      if (email) {
        queryStr += " WHERE email = ?";
        params.push(email);
      }

      query(queryStr, params)
        .then((rows) => {
          resolve(rows);
        })
        .catch((err) => reject(err));
    });
  }

  /**
   * Select user by id
   * @param id
   * @returns
   */
  find(id: number) {
    return new Promise((resolve, reject) => {
      query(`SELECT * FROM ${this.table} WHERE id = ?`, [id])
        .then((rows) => resolve(rows[0]))
        .catch((err) => reject(err));
    });
  }

  create(data: any) {
    return new Promise((resolve, reject) => {
      query(`INSERT INTO ${this.table} SET ?`, data)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  update(id: number, data: any) {
    return new Promise((resolve, reject) => {
      query(`UPDATE ${this.table} SET ? WHERE id = ?`, [data, id])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }
}

export default Users;
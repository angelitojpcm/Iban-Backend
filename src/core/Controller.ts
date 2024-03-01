import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class Controller {
  constructor() {}

  /**
   * Instancia los métodos de la clase en el contexto de la instancia
   * @param instance
   */
  bindMethods(instance: any) {
    for (const key of Object.getOwnPropertyNames(
      instance.constructor.prototype
    )) {
      if (typeof instance[key] === "function") {
        instance[key] = instance[key].bind(instance);
      }
    }
  }

  /**
   * Compara una contraseña con un hash
   * @param password
   * @param hash
   * @returns
   */
  async comparePassword(password: string, hash: string) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, (err, same) => {
        if (err) {
          reject(err);
        }
        resolve(same);
      });
    });
  }

  /**
   * Encripta una contraseña
   * @param password
   * @returns
   */
  async encryptPassword(password: string) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }

  /**
   * Genera un token usando la información del usuario y JWT
   * @param user
   */
  async generateToken(user: any) {
    const key = process.env.JWT_KEY || "default-key";
    const payload = { ...user };
    const token = jwt.sign(payload, key, { expiresIn: "1h" });

    //Decodificar token

    const decoded: any = jwt.verify(token, key);
    const time = decoded.exp - decoded.iat;

    return {
      access_token: token,
      token_type: "bearer",
      expires_in: time,
    };
  }

  /**
   * Retorna una respuesta con un token
   * @param res -> Response
   * @param token -> Token a enviar
   * @param time -> Tiempo de expiración del token
   * @param data -> Datos a enviar
   * @param code -> Código de respuesta
   */
  async respondWhitToken(
    res: Response,
    token: object,
    data: object,
    code: number = 200
  ) {
    res.status(code).json({
      ...token,
      ...data,
    });
  }
}

export default Controller;

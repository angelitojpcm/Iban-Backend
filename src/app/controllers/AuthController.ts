import { Request, Response } from "express";
import Controller from "../../core/Controller";
import UserCollection from "../resources/User/UserC";
import { Rol, Users } from "../models";

class AuthController extends Controller {
  constructor() {
    super();
    this.bindMethods(this);
  }

  async login(req: Request, res: Response) {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Faltan campos obligatorios",
        fields: ["email", "password"],
      });
    }

    let user = await Users.findOne({
      where: { email },
      include: [Rol],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    let data = user.dataValues;
    console.log(data);
    // Validate password
    let valid = await this.comparePassword(password, data.password);

    if (!valid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    let token = await this.generateToken(data);

    let resp = UserCollection.toArray([data]);

    return this.respondWhitToken(res, token, resp);
  }
}
export default new AuthController();

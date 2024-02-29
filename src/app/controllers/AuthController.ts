// En AuthController.ts
import { Request, Response } from "express";
import { IUser } from "../../interfaces/User";
import Controller from "../../core/Controller";

class AuthController extends Controller {
  constructor() {
    super();
    this.bindMethods(this);
    this.init();
  }

  private async init() {
    try {
      this.model = await this.loadModel("Users");
    } catch (error) {
      console.error(error);
    }
  }

  async login(req: Request, res: Response) {
    let { email, password } = req.body;

    let user: IUser[] = await this.model.all(email);

    if (user.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    this.filter(res, user[0], { structure: { user: true } }, 200);
  }
}
export default new AuthController();

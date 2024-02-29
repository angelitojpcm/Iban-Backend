import { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";

class Controller {
  protected model: any;
  protected fileable: string[] = [];
  [key: string]: any; // Agrega una firma de índice

  constructor() {}

  /**
   * Retorna un objeto con las llaves especificadas
   * @param res -> Response
   * @param data -> Datos a filtrar
   * @param options -> Opciones de filtrado
   * @param code -> Código de respuesta
   */
  async filter(
    res: Response,
    data: any,
    options: { structure: any },
    code: number = 200
  ) {
    try {
      let filteredData: any = Array.isArray(data)
        ? data.map((item) => {
            let filteredItem: any = {};
            for (const key of this.fileable) {
              // Usa this.fileable
              filteredItem[key] = item[key];
            }
            return filteredItem;
          })
        : this.filterObject(data);

      // Aplica la estructura a los datos filtrados
      let structuredData: any = {};
      for (const key in options.structure) {
        structuredData[key] =
          options.structure[key] === true
            ? filteredData
            : options.structure[key];
      }

      res.status(code).json(structuredData);
    } catch (error) {
      // Handle errors appropriately
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  }

  filterObject(data: any) {
    let filteredItem: any = {};
    for (const key of this.fileable) {
      filteredItem[key] = data[key];
    }
    return filteredItem;
  }

  bindMethods(instance: any) {
    for (const key of Object.getOwnPropertyNames(
      instance.constructor.prototype
    )) {
      if (typeof instance[key] === "function") {
        instance[key] = instance[key].bind(instance);
      }
    }
  }

  loadModel(name?: string) {
    return new Promise((resolve, reject) => {
      const modelName = name ? name : this.constructor.name;
      const modelPath = path.join(
        __dirname,
        "../app/models",
        modelName + ".ts"
      ); // Añade la extensión .ts

      if (fs.existsSync(modelPath)) {
        const Model = require(modelPath).default;
        this.model = new Model();
        this.fileable = this.model.getFiliable();
        resolve(this.model);
      } else {
        reject(new Error("Model not found: " + modelName));
      }
    });
  }
}

export default Controller;

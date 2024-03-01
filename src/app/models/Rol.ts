import { Sequelize, DataTypes, Model } from "sequelize";
import { conn } from "../../core/Database";

class Rol extends Model {
  public id!: number;
  public name!: string;
  public created_at!: Date;
}

Rol.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "roles",
    sequelize: conn,
    timestamps: false,
  }
);

export default Rol;

import { Sequelize, DataTypes, Model } from "sequelize";
import { conn } from "../../core/Database";

class Users extends Model {
  public id!: number;
  public full_name!: string;
  public email!: string;
  public photo!: string;
  public phone!: string;
  public password!: string;
  public rol_id!: number;
  public created_at!: Date;
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: new DataTypes.STRING(200),
      allowNull: false,
    },
    email: {
      type: new DataTypes.STRING(100),
      allowNull: false,
    },
    photo: {
      type: new DataTypes.STRING(150),
      allowNull: false,
    },
    phone: {
      type: new DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
    rol_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "users",
    sequelize: conn,
    timestamps: false,
  }
);

export default Users;

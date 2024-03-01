import Rol from "./Rol";
import Users from "./Users";

// Define las relaciones
Users.belongsTo(Rol, { foreignKey: "rol_id" });

export { Users, Rol };

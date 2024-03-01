import { IUser } from "../../../interfaces/User";

export default class UserGResource {
  public static toArray(resource: IUser) {
    return {
      id: resource.id,
      full_name: resource.full_name,
      email: resource.email,
      photo: resource.photo ? resource.photo : "default.png",
      phone: resource.phone,
      rol: resource.Rol ? {
        id: resource.Rol.id,
        name: resource.Rol.name,
      } : null,
    };
  }
}

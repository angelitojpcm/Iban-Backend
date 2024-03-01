import { IUser } from "../../../interfaces/User";
import UserGResource from "./UserR";

export default class UserCollection {
  public static toArray(resources: IUser[]) {
    return {
      users: resources.map(UserGResource.toArray),
    };
  }
}

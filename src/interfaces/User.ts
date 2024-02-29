import { Rol } from "./Rol";

interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
    rol: Rol,
    created_at: string;
}

export { IUser, Rol };
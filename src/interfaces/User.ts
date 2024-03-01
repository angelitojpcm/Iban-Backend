import { Rol } from "./Rol";

interface IUser {
    id: number;
    full_name: string;
    email: string;
    photo: string;
    phone: string;
    password: string;
    Rol: Rol,
    created_at: string;
}

export { IUser, Rol };
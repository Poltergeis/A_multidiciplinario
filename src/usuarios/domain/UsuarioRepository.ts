import { IUsuario } from "./IUsuario";

export interface UsuarioRepository{
    register(
        username: string,
        email: string,
        password: string
    ): Promise<IUsuario | null>
    getUserByEmail(
        email: string
    ): Promise<IUsuario | null>
    modify(
        username?: string,
        email?: string,
        password?: string
    ): Promise<IUsuario | null>
    delete(
        email: string,
        password: string
    ): Promise<boolean>
}
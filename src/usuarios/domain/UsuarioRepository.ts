import { IUsuario } from "./IUsuario";

export interface UsuarioRepository{
    register(
        gmail: string,
        password: string
    ): Promise<IUsuario | null>
    getUserByEmail(
        gmail: string
    ): Promise<IUsuario | null>
    modify(
        usuarioOld: IUsuario,
        username?: string,
        email?: string,
        password?: string
    ): Promise<IUsuario | null>
    delete(
        email: string,
        password: string
    ): Promise<IUsuario | null>
}
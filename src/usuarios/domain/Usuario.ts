import { IUsuario } from "./IUsuario.js";

export class Usuario implements IUsuario{
    constructor(
        readonly username: string,
        readonly email: string,
        readonly password: string,
        readonly mascotas?: string[]
    ){}
}
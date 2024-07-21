import { IUsuario } from "./IUsuario";

export class Usuario implements IUsuario{
    constructor(
        readonly gmail: string,
        readonly password: string,
        readonly mascotas?: string[]
    ){}
}
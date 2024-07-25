import { IRegistro } from "./IRegistro";

export interface RegistroRepository {
    saveData(
        temperatura: number,
        pulsaciones: number
    ): Promise<IRegistro | null>;

    getData(
        idPerro: string
    ): Promise<IRegistro[] | null>;
}
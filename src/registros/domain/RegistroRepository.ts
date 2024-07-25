import { IRegistro } from "./IRegistro";

export interface RegistroRepository {
    saveData(
        temperatura: number,
        ritmoCardiaco: number,
        idPerro: string,
    ): Promise<IRegistro | null>;

    getData(
        idPerro: string
    ): Promise<IRegistro[] | null>;
}
import { IPerro } from "./IPerro.js";

export interface PerroRepository {
    createPerro(
        nombre: string,
        edad: number,
        estadoDeSalud: string,
        idDueño: string
    ): Promise<IPerro | null>;

    mapPerros(
        idDueño: string
    ): Promise<IPerro[] | null>;

    modifyPerro(
        idPerro: string,
        newNombre?: string,
        newEdad?: number,
        newEstadoDeSalud?: string
    ): Promise<IPerro | null>;

    deletePerro(
        idPerro: string
    ): Promise<IPerro | null>;
}
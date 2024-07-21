import { IPerro } from "./IPerro";

export interface PerroRepository {
    createPerro(
        nombre: string,
        fechaNacimiento: string,
        peso: string,
        tamaño: string,
        idDueño: string
    ): Promise<IPerro | null>;

    mapPerros(
        idDueño: string
    ): Promise<IPerro[] | null>;

    modifyPerro(
        idPerro: string,
        newNombre?: string,
        newFechaNacimiento?: string,
        newPeso?: string,
        newTamaño?: string,
    ): Promise<IPerro | null>;

    deletePerro(
        idPerro: string
    ): Promise<IPerro | null>;
}
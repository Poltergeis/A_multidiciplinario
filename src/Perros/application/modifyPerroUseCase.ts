import { IPerro } from "../domain/IPerro.js";
import { PerroRepository } from "../domain/PerroRepository.js";

export class ModifyPerroUseCase {
    constructor(readonly perroRepository: PerroRepository) { }
    
    async run(
        idPerro: string,
        newNombre?: string,
        newEdad?: number,
        newEstadoDeSalud?: string
    ): Promise<IPerro | null>{
        try {
            const perro = await this.perroRepository.modifyPerro(idPerro, newNombre, newEdad, newEstadoDeSalud);
            if (!perro) return null;
            return perro;
        } catch (error) {
            console.log(`error en el caso de uso de modify perro. ERROR: ${error}`);
            return null;
        }
    }
}
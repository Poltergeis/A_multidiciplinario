import { IPerro } from "../domain/IPerro.js";
import { PerroRepository } from "../domain/PerroRepository.js";

export class CreatePerroUseCase{
    constructor(readonly perroRepository: PerroRepository) { }
    
    async run(
        nombre: string,
        edad: number,
        estadoDeSalud: string,
        idDueño: string
    ): Promise<IPerro | null>{
        try {
            const perro = await this.perroRepository.createPerro(nombre, edad, estadoDeSalud, idDueño);
            if (!perro) {
                return null;
            } else return perro;
        } catch (error) {
            console.log(`error en el caso de uso de create perro. ERROR: ${error}`);
            return null;
        }
    }
}
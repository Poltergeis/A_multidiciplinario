import { IPerro } from "../domain/IPerro";
import { PerroRepository } from "../domain/PerroRepository";

export class CreatePerroUseCase{
    constructor(readonly perroRepository: PerroRepository) { }
    
    async run(
        nombre: string,
        fechaNacimiento: string,
        peso: string,
        tamaño: string,
        idDueño: string
    ): Promise<IPerro | null>{
        try {
            const perro = await this.perroRepository.createPerro(nombre, fechaNacimiento, peso, tamaño, idDueño);
            if (!perro) {
                return null;
            } else return perro;
        } catch (error) {
            console.log(`error en el caso de uso de create perro. ERROR: ${error}`);
            return null;
        }
    }
}
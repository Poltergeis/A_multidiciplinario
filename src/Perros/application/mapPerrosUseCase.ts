import { IPerro } from "../domain/IPerro.js";
import { PerroRepository } from "../domain/PerroRepository.js";

export class MapPerrosUseCase{
    constructor(readonly perroRepository: PerroRepository) { }
    
    async run(idDueño: string): Promise<IPerro[] | null>{
        try {
            const perros = await this.perroRepository.mapPerros(idDueño);
            if (!perros) return null;
            return perros;
        } catch (error) {
            console.log(`error en el caso de uso de MapPerros. ERROR: ${error}`);
            return null;
        }
    }
}
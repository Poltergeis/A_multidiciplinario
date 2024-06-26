import { IPerro } from "../domain/IPerro";
import { PerroRepository } from "../domain/PerroRepository";

export class DeletePerroUseCase {
    constructor(readonly perroRepository: PerroRepository) { }
    
    async run(idPerro: string): Promise<IPerro | null>{
        try {
            const perro = await this.perroRepository.deletePerro(idPerro);
            if (!perro) return null;
            return perro;
        } catch (error) {
            console.log(`error en el caso de uso de deletePerro. ERROR: ${error}`);
            return null;
        }
    }
}
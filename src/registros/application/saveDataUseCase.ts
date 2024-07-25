import { IRegistro } from "../domain/IRegistro";
import { RegistroRepository } from "../domain/RegistroRepository";

export class SaveDataUseCase {
    constructor(readonly registroRepository: RegistroRepository) { }
    
    async run(
        temperatura: number,
        ritmoCardiaco: number,
        idPerro: string,
    ): Promise<IRegistro | null>{
        try {
            return await this.registroRepository.saveData(temperatura, ritmoCardiaco, idPerro);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
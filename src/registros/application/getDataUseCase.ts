import { IRegistro } from "../domain/IRegistro";
import { RegistroRepository } from "../domain/RegistroRepository";

export class GetDataUseCase {
    constructor(readonly registroRepository: RegistroRepository) { }
    
    async run(
        idPerro: string
    ): Promise<IRegistro[] | null>{
        try {
            return await this.registroRepository.getData(idPerro);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
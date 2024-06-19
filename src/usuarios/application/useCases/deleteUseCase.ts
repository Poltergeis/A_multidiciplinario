import { UsuarioRepository } from "../../domain/UsuarioRepository";
import { EncryperRepository } from "../../domain/encrypterRepository";
import { IUsuario } from "../../domain/IUsuario";

export class DeleteUseCase {
    constructor(
        readonly encrypterRepository: EncryperRepository,
        readonly usuarioRepository: UsuarioRepository
    ) { }
    
    async run(
        email: string,
        password: string
    ): Promise<IUsuario | null> {
        try {
            const usuario = await this.usuarioRepository.getUserByEmail(email);
            if (!usuario) {
                return null;
            }
            if (!await this.encrypterRepository.check(password, usuario.password)) {
                return null;
            }
            return await this.usuarioRepository.delete(email, password);
        } catch (error) {
            console.log(`error en el caso de uso de delete. ERROR:${error}`);
            return null;
        }
    }
}
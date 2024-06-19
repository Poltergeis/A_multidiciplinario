import { IUsuario } from "../../domain/IUsuario";
import { UsuarioRepository } from "../../domain/UsuarioRepository";
import { EncryperRepository } from "../../domain/encrypterRepository";

export class RegisterUseCase {
    constructor(
        readonly usuarioRepository: UsuarioRepository,
        readonly encrypter: EncryperRepository
    ) { }
    
    async run(
        username: string,
        email: string,
        password: string
    ):Promise<IUsuario | null> {
        try {
            password = await this.encrypter.encrypt(password);
            return await this.usuarioRepository.register(username, password, email);
        }catch(error){
            console.log(`error en el caso de uso de registro. ERROR:${error}`);
            return null;
        }
    }
}
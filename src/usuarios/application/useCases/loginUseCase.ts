import { IUsuario } from "../../domain/IUsuario";
import { UsuarioRepository } from "../../domain/UsuarioRepository";
import { EncryperRepository } from "../../domain/encrypterRepository";

export class LoginUseCase{
    constructor(
        readonly usuarioRepository: UsuarioRepository,
        readonly encrypterRepository: EncryperRepository
    ) { }
    
    async run(
        email: string,
        password: string
    ): Promise<IUsuario | null>{
        try {
            const usuario: IUsuario | null = await this.usuarioRepository.getUserByEmail(email);
            if (!usuario) {
                return null;
            }
            if (await this.encrypterRepository.check(password, usuario.password)) {
                return usuario;
            }
            return null;
        } catch (error) {
            console.log(`error en el caso de uso de login. ERROR:${error}`);
            return null;
        }
    }
}
import { UsuarioRepository } from "../../domain/UsuarioRepository.js";
import { EncryperRepository } from "../../domain/encrypterRepository.js";
import { IUsuario } from "../../domain/IUsuario.js";

export class ModifyUseCase{
    constructor(
        readonly usuarioRepository: UsuarioRepository,
        readonly encrypterRepository: EncryperRepository
    ) { }
    
    async run(
        email:string,
        checkingPassword: string,
        newUsername?: string,
        newEmail?: string,
        newPassword?: string
    ): Promise<IUsuario | null>{
        try {
            const usuario = await this.usuarioRepository.getUserByEmail(email);
            if (!usuario) {
                return null;
            }
            if (!await this.encrypterRepository.check(checkingPassword, usuario.password)) {
                return null;
            }
            if (!newUsername && (!newEmail && !newPassword)) {
                return null;
            }
            return await this.usuarioRepository.modify(usuario,newUsername,newEmail,newPassword);
        } catch (error) {
            console.log(`error en el caso de uso de modify. ERROR:${error}`);
            return null;
        }
    }
}
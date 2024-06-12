export class ModifyUseCase {
    usuarioRepository;
    encrypterRepository;
    constructor(usuarioRepository, encrypterRepository) {
        this.usuarioRepository = usuarioRepository;
        this.encrypterRepository = encrypterRepository;
    }
    async run(email, checkingPassword, newUsername, newEmail, newPassword) {
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
            return await this.usuarioRepository.modify(usuario, newUsername, newEmail, newPassword);
        }
        catch (error) {
            console.log(`error en el caso de uso de modify. ERROR:${error}`);
            return null;
        }
    }
}

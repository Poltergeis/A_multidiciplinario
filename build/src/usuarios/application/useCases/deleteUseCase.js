export class DeleteUseCase {
    encrypterRepository;
    usuarioRepository;
    constructor(encrypterRepository, usuarioRepository) {
        this.encrypterRepository = encrypterRepository;
        this.usuarioRepository = usuarioRepository;
    }
    async run(email, password) {
        try {
            const usuario = await this.usuarioRepository.getUserByEmail(email);
            if (!usuario) {
                return null;
            }
            if (!await this.encrypterRepository.check(password, usuario.password)) {
                return null;
            }
            return await this.usuarioRepository.delete(email, password);
        }
        catch (error) {
            console.log(`error en el caso de uso de delete. ERROR:${error}`);
            return null;
        }
    }
}

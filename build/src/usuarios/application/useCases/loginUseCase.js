export class LoginUseCase {
    usuarioRepository;
    encrypterRepository;
    constructor(usuarioRepository, encrypterRepository) {
        this.usuarioRepository = usuarioRepository;
        this.encrypterRepository = encrypterRepository;
    }
    async run(email, password) {
        try {
            const usuario = await this.usuarioRepository.getUserByEmail(email);
            if (!usuario) {
                return null;
            }
            if (await this.encrypterRepository.check(password, usuario.password)) {
                return usuario;
            }
            return null;
        }
        catch (error) {
            console.log(`error en el caso de uso de login. ERROR:${error}`);
            return null;
        }
    }
}

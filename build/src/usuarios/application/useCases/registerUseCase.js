export class RegisterUseCase {
    usuarioRepository;
    encrypter;
    constructor(usuarioRepository, encrypter) {
        this.usuarioRepository = usuarioRepository;
        this.encrypter = encrypter;
    }
    async run(username, email, password) {
        try {
            password = await this.encrypter.encrypt(password);
            return await this.usuarioRepository.register(username, password, email);
        }
        catch (error) {
            console.log(`error en el caso de uso de registro. ERROR:${error}`);
            return null;
        }
    }
}

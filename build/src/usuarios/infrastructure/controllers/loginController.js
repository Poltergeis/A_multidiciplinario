export class LoginController {
    loginUseCase;
    constructor(loginUseCase) {
        this.loginUseCase = loginUseCase;
    }
    async run(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).send({
                    success: false,
                    message: "peticion dañada o imcompleta"
                });
            }
            const usuario = await this.loginUseCase.run(email, password);
            if (!usuario) {
                return res.status(404).send({
                    success: false,
                    message: "el usuario no existe"
                });
            }
            return res.status(200).send({
                success: true,
                data: usuario,
                message: "usuario recuperado con exito"
            });
        }
        catch (error) {
            console.log(`error en el controlador de login. ERROR: ${error}`);
            res.status(500).send({
                success: false,
                message: `error general en el controlador de login. ERROR: ${error}`
            });
        }
    }
}

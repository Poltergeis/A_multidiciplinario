import { LoginUseCase } from "src/usuarios/application/useCases/loginUseCase";
import { Request, Response } from "express";

export class LoginController {
    constructor(readonly loginUseCase: LoginUseCase) { }
    
    async run(req: Request, res: Response) {
        try {
            const { gmail, password } = req.body;
            if (!gmail || !password) {
                return res.status(400).send({
                    success: false,
                    message: "peticion dañada o imcompleta"
                });
            }
            const usuario = await this.loginUseCase.run(gmail, password);
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
        } catch (error) {
            console.log(`error en el controlador de login. ERROR: ${error}`);
            res.status(500).send({
                success: false,
                message: `error general en el controlador de login. ERROR: ${error}`
            });
        }
    }
}
import { RegisterUseCase } from "../../application/useCases/registerUseCase";
import { Request, Response } from "express";

export class RegisterController {
    constructor(readonly registerUseCase: RegisterUseCase) { }
    
    async run(req: Request, res: Response) {
        try {
            const { gmail, password }: { gmail: string, password: string } = req.body;
            if (!gmail || !password) {
                return res.status(400).send({
                    success: false,
                    message: "los datos del registro estaban incompletos o dañados"
                });
            }
            const usuario = await this.registerUseCase.run(gmail, password);
            if (!usuario) {
                return res.status(400).send({
                    success: true,
                    message: "no se ha podido crear al nuevo usuario"
                });
            }
            return res.status(201).send({
                success: true,
                message: "usuario creado exitosamente",
                usuario
            });
        } catch (error) {
            console.log(`error en el controlador de register. ERROR:${error}`);
            return res.status(500).send({
                success: false,
                message: `error en el controlador de register. ERROR:${error}`
            });
        }
    }
}
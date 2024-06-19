import { Request, Response } from "express";
import { ModifyUseCase } from "src/usuarios/application/useCases/modifyUseCase";

export class ModifyController {
    constructor(readonly modifyUseCase: ModifyUseCase) { }
    
    async run(req: Request, res: Response) {
        try {
            const { email, password, newUsername, newPassword, newEmail }: {
                email: string, password: string, newUsername?: string, newPassword?: string, newEmail?: string
            } = req.body;
            const usuarioNew = await this.modifyUseCase.run(email, password, newUsername, newEmail, newPassword);
            if (!usuarioNew) {
                return res.status(404).send({
                    success: false,
                    message: "no se ha podido modificar el usuario"
                });
            }
            return res.status(200).send({
                success: true,
                data: usuarioNew,
                message: "usuario modificado con exito"
            });
        } catch (error) {
            console.log(`error en el controlador de modify. ERROR${error}`);
            return res.status(500).send({
                success: false,
                message: `error en el controlador de modify. ERROR: ${error}`
            });
        }
    }
}
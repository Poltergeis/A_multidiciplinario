import { DeleteUseCase } from "src/usuarios/application/useCases/deleteUseCase.js";
import { Request, Response } from "express";
import { Document } from "mongoose";

interface RespuestaCustom extends Response {
    status: (code: number) => (this & {
        send: (body: { success: boolean, message?: string, data?: Document }) => RespuestaCustom;
    }) | (this & {
        json: (body: { success: boolean, message?: string, data?: Document }) => RespuestaCustom;
    });
}

export class DeleteController {
    constructor(readonly deleteUseCase: DeleteUseCase) { }
    
    async run(req: Request, res: RespuestaCustom) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).send({
                    success: false,
                    message: "peticion dañada o incompleta"
                });
            }
            const usuario = await this.deleteUseCase.run(email, password);
            if (!usuario) {
                return res.status(404).send({
                    success: false,
                    message: "no se ha encontrado el usuario a eliminar"
                });
            }
            return res.status(200).send({
                success: true,
                data: usuario,
                message: "usuario eliminado con exito"
            });
        } catch (error) {
            console.log(`error en el controlador de delete. ERROR: ${error}`);
            return res.status(500).send({
                success: false,
                message: `error en el controlador de delete. ERROR: ${error}`
            })
        }
    }
}
import { IUsuario } from "../../domain/IUsuario";
import { RegisterUseCase } from "../../application/useCases/registerUseCase";
import { Request, Response } from "express";
import usuarioModel from "../models/usuarioModel";

export class RegisterController {
    constructor(readonly registerUseCase: RegisterUseCase) { }
    
    async run(req: Request, res: Response) {
        try {
            const { username, email, password }: { username: string, email: string, password: string } = req.body;
            if (!username || (!email || !password)) {
                return res.status(400).send({
                    success: false,
                    message: "los datos del registro estaban incompletos o dañados"
                });
            }
            const usuario: IUsuario = new usuarioModel({
                username: username,
                email: email,
                password: password
            });
            if (!usuario) {
                return res.status(400).send({
                    success: true,
                    message: "no se ha podido crear al nuevo usuario"
                });
            }
            await usuarioModel.insertMany(usuario)
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
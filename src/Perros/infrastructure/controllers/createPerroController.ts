import { Request, Response } from "express";
import { CreatePerroUseCase } from "../../application/createPerroUseCase";

export class CreatePerroController{
    constructor(readonly createPerroUseCase: CreatePerroUseCase) { }
    
    async run(req: Request, res: Response) {
        try {
            const { nombre, edad, estadoDeSalud, idDueño } = req.body;
            if ((!nombre || !edad) || (!estadoDeSalud || !idDueño)) {
                return res.status(400).send({
                    success: false,
                    message: "peticion dañada o imcompleta"
                });
            }
            const perro = await this.createPerroUseCase.run(nombre, edad, estadoDeSalud, idDueño);
            if (!perro) {
                return res.status(500).send({
                    success: false,
                    message: "no fue posible guardar el nuevo perro"
                });
            }
            res.status(201).send({
                success: true,
                message: "nuevo perro guardado exitosamente",
                data: perro
            });
        } catch (error) {
            console.log(`èrror en el controlador de createPerro. ERROR: ${error}`);
            return res.status(500).send({
                success: false,
                message: `èrror en el controlador de createPerro. ERROR: ${error}`
            });
        }
    }
}
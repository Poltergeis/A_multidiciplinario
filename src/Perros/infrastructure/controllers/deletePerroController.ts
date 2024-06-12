import { DeletePerroUseCase } from "../../application/deletePerroUseCase.js";
import { Request, Response } from "express";

export class DeletePerroController {
    constructor(readonly deletePerroUseCase: DeletePerroUseCase) { }
    
    async run(req: Request, res: Response) {
        try {
            const { idDueño } = req.body;
            if (!idDueño) return res.status(400).send({
                success: false,
                message: "peticion dañada o incompleta"
            });
            const perro = await this.deletePerroUseCase.run(idDueño);
            if (!perro) return res.status(404).send({
                success: false,
                message: "no fue posible borrar al perro, o no se ha encontrado uno"
            });
            res.status(200).send({
                success: true,
                message: "perro borrado exitosamente"
            });
        } catch (error) {
            console.log(`error en el controlador de delete perro. ERROR: ${error}`);
            return res.status(500).send({
                success: false,
                message: `error en el controlador de delete perro. ERROR: ${error}`
            });
        }
    }
}
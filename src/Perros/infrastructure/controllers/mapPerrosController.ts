import ValidatedRequest from "src/types/ValidatedRequest";
import { MapPerrosUseCase } from "../../application/mapPerrosUseCase";
import { Request, Response } from "express";

export class MapPerrosController {
    constructor(readonly mapPerrosUseCase: MapPerrosUseCase) { }
    
    async run(req: Request, res: Response) {
        try {
            const idDueño = (req as ValidatedRequest).user._id;
            if (!idDueño) return res.status(400).send({
                success: false,
                message: "peticion dañada o incompleta"
            });
            const perros = await this.mapPerrosUseCase.run(idDueño);
            if (!perros) return res.status(404).send({
                success: false,
                message: "no se han encontrado perros asociados a este usuario"
            });
            res.status(200).send({
                success: true,
                message: "perros recuperados con exito",
                data: perros
            });
        } catch (error) {
            console.log(`error en el controlador de mapPerros. ERROR: ${error}`);
            return res.status(500).send({
                success: false,
                message: `error en el controlador de mapPerros. ERROR: ${error}`
            });
        }
    }
}
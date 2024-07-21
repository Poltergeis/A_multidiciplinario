import { ModifyPerroUseCase } from "../../application/modifyPerroUseCase";
import { Request, Response } from "express";

export class ModifyPerroController {
    constructor(readonly modifyPerroUseCase: ModifyPerroUseCase) { }
    
    async run(req: Request, res: Response) {
        try {
            const { idPerro, newNombre, newFechaNacimiento, newPeso, newTamaño } = req.body;
            if (!idPerro || ((!newFechaNacimiento && !newNombre) && (!newPeso && !newTamaño))) return res.status(400).send({
                success: false,
                message: "peticion dañada o incompleta"
            });
            const perro = await this.modifyPerroUseCase.run(idPerro, newNombre, newFechaNacimiento, newPeso, newTamaño);
            if (!perro) return res.status(404).send({
                success: false,
                message: "no se ha podido encontrar el perro a modificar"
            });
            res.status(200).send({
                success: true,
                message: "perro modificado con exito",
                data: perro
            });
        } catch (error) {
            console.log(`error en el controlador de modifyPerro. ERROR: ${error}`);
            return res.status(500).send({
                success: false,
                message: `error en el controlador de modifyPerro. ERROR: ${error}`
            });
        }
    }
}
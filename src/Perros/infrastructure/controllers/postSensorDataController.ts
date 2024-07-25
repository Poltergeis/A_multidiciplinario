import { ISensorData } from "../../domain/ISensorData";
import { PostSensorDataUseCase } from "../../application/postSensorDataUseCase";
import { Request, Response } from "express";

export class PostSensorDataController {
    constructor(readonly postSensorDataUseCase: PostSensorDataUseCase) { }
    
    async run(req: Request, res: Response): Promise<void> {
        try {
            const { latitud, longitud, sp32_id, latidosPorMinuto, temperatura } = req.body;
            if (((!latitud || !longitud) || (!sp32_id || !latidosPorMinuto)) || !temperatura) {
                res.status(400).send('peticion dañada o erronea con datos incompletos');
                return;
            }
            const result = await this.postSensorDataUseCase.run(
                Number(latitud), Number(longitud), String(sp32_id),
                Number(latidosPorMinuto), Number(temperatura)
            );
            if (!result) {
                res.status(400).send('no se pudieron enviar los datos al cliente');
                return;
            }
            res.status(200).send('datos enviados al cliente');
            return;
        } catch (error) {
            console.log(`error en el controlador de PostSensorData. ERROR:${error}`);
        }
    }
}


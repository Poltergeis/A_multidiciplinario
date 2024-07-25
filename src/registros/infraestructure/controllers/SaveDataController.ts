import { Request, Response } from "express";
import { SaveDataUseCase } from "../../application/saveDataUseCase";

export class SaveDataController {
    constructor(readonly saveDataUseCase: SaveDataUseCase){}

    async run(req:Request, res:Response) {
        try {
            return await this.saveDataUseCase.run(
                req.body.temperatura, req.body.ritmoCardiaco, req.body.idPerro
            );
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
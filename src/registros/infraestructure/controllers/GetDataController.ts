import { Request, Response } from "express";
import { GetDataUseCase } from "../../application/getDataUseCase";

export class GetDataController {
    constructor(readonly getDataUseCase: GetDataUseCase) { }
    
    async run(req:Request, res:Response) {
        try {
            return await this.getDataUseCase.run(req.body.idPerro);
        } catch (error) {
            res.send('error' + error);
            return null;
        }
    }
}
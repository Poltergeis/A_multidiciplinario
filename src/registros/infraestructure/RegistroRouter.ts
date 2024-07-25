import { Router } from "express";
import getDependencies from "./dependencies";
import TokenManager from "src/TokenManager";

const dependencies = getDependencies();

export default class RegistroRouter {
    private router = Router();
    private tokenManager: TokenManager;

    constructor(tokenManager: TokenManager) {
        this.tokenManager = tokenManager;
        this.router.get('', tokenManager.validateToken.bind(this.tokenManager), async(req, res) => {
            const result = await dependencies.getDataController.run(req, res); 
            res.send(result);
        });

        this.router.post('', tokenManager.validateToken.bind(this.tokenManager), async (req, res) => {
            const result = await dependencies.saveDataController.run(req, res);
            res.send(result);
        });
    }

    public getRouter() {
        return this.router;
    }
}
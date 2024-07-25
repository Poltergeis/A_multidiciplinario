import TokenManager from "src/TokenManager";
import getDependencies from "./dependencies";
import { Router } from "express";
import GPSService from "./services/GPSService";

const dependencies = getDependencies();

export class PerroRouter {
    private tokenManager: TokenManager;
    private router = Router();

    constructor(tokenManager: TokenManager) {
        this.tokenManager = tokenManager;

        this.router.post("", this.tokenManager.validateToken.bind(this.tokenManager), async function (req, res) {
            await dependencies.createPerroController.run(req, res);
        });
        this.router.delete("", this.tokenManager.validateToken.bind(this.tokenManager), async function (req, res) {
            await dependencies.deletePerroController.run(req, res); 
        });
        this.router.get("/map", this.tokenManager.validateToken.bind(this.tokenManager), async function (req, res) {
            await dependencies.mapPerrosController.run(req, res); 
        });
        this.router.put("", this.tokenManager.validateToken.bind(this.tokenManager), async function (req, res) {
            await dependencies.modifyPerroController.run(req, res);
        });

        this.router.post("/sensor/data", async(req, res) => {
            await dependencies.postSensorDataController.run(req, res);
        });
    }

    public getRouter() {
        return this.router;
    }
}
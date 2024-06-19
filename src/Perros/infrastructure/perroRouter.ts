import getDependencies from "./dependencies";
import { Router } from "express";

const dependencies = getDependencies();

export const perroRouter = Router();

perroRouter.post("", async function (req, res) {
    await dependencies.createPerroController.run(req, res);
});

perroRouter.delete("", async function (req, res) {
    await dependencies.deletePerroController.run(req, res); 
});

perroRouter.get("/map", async function (req, res) {
    await dependencies.mapPerrosController.run(req, res); 
});

perroRouter.put("", async function (req, res) {
    await dependencies.modifyPerroController.run(req, res); 
});
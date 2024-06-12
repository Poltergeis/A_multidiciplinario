import { Router } from "express";
import getDependencies from "./dependencies.js";

const dependencies = getDependencies();

export const usuarioRouter = Router();

usuarioRouter.post("/login", async (req, res) => await dependencies.loginController.run(req, res));
usuarioRouter.post("", async (req, res) => await dependencies.registerController.run(req, res));
usuarioRouter.put("", async (req, res) => await dependencies.modifyController.run(req, res));
usuarioRouter.delete("", async (req, res) => await dependencies.deleteController.run(req, res));
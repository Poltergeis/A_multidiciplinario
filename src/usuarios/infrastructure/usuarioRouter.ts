import { Router } from "express";
import getDependencies from "./dependencies";
import TokenManager from "../../TokenManager";
import { Document } from "mongoose";
import ValidatedRequest from "src/types/ValidatedRequest";

const dependencies = getDependencies();

export class UsuarioRouter {
  private router: Router;
  private tokenManager: TokenManager;
  constructor(tokenManager: TokenManager) {
    this.tokenManager = tokenManager;
    this.router = Router();

    this.router.post("/login", async (req, res) => {
      const usuarioRecuperado = await dependencies.loginController.run(
        req,
        res
      );
      if (!usuarioRecuperado) return;
      const accessToken = this.tokenManager.generateAccessToken({
        _id: (usuarioRecuperado as unknown as Document)._id,
        gmail: usuarioRecuperado.gmail,
        password: usuarioRecuperado.password
      });
      return res.header("authorization", accessToken).status(200).json({
        success: true,
        message: "usuario recuperado con exito",
        token: accessToken,
      });
    });
    this.router.post(
      "/register",
      async (req, res) => await dependencies.registerController.run(req, res)
    );
    this.router.put(
      "",
      this.tokenManager.validateToken.bind(this.tokenManager),
      async (req, res) => await dependencies.modifyController.run(req, res)
    );
    this.router.delete(
      "",
      this.tokenManager.validateToken.bind(this.tokenManager),
      async (req, res) => await dependencies.deleteController.run(req, res)
    );
    this.router.get(
      "/accessToken/values",
      this.tokenManager.validateToken.bind(this.tokenManager),
        async (req, res) => {
            return res.status(200).send((req as ValidatedRequest).user);
      }
    );
  }

  public getRouter() {
    return this.router;
  }
}

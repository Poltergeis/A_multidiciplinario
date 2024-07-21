import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Request, Response } from "express";
import ValidatedRequest from "./types/ValidatedRequest";
import { Usuario } from "./usuarios/domain/Usuario";

export default class TokenManager {
    private jwtSecretKey: string;
    constructor() {
        this.jwtSecretKey = crypto.randomBytes(64).toString("hex");
    }

    public generateAccessToken(data:any) {
        return jwt.sign(data, this.jwtSecretKey, { expiresIn: "1h" });
    }

    public validateToken(req:Request, res: Response, next: () => unknown) {
        const accessToken = req.headers['authorization'];
        if (!accessToken) return res.status(401).json({
            success: false,
            message: 'acceso no autorizado'
        });

        jwt.verify(accessToken, this.jwtSecretKey, (err, user) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: 'acceso no autorizado, token incorrecto o expirado'
                });
            } else {
                (req as ValidatedRequest).user = (user as Usuario);
                next();
            }
        });
    }
}
import express from "express";
import cors, {CorsOptions} from "cors";
import signale from "signale";
import helmet from "helmet";
import http from "http";
import dotenv from "dotenv";

import connectToDatabase from "./src/database/database";

import { UsuarioRouter } from "./src/usuarios/infrastructure/usuarioRouter";
import { PerroRouter } from "./src/Perros/infrastructure/perroRouter";

import TokenManager from "./src/TokenManager";

const tokenManager = new TokenManager();

dotenv.config();

const corsOptions:CorsOptions = {
    origin: [process.env.DOMAIN_ALLOWED as string],
    allowedHeaders: ["Content-Type", "authorization"],
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'HEAD'],
    credentials: true
}

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

app.use("/usuarios", new UsuarioRouter(tokenManager).getRouter());
app.use("/perros", new PerroRouter(tokenManager).getRouter());

const server = http.createServer(app);

const PORT = process.env.PORT;

(async function () {
    await connectToDatabase().then(() => {
        server.listen(PORT, () => {
            signale.success(`servidor escuchando en el puerto: ${PORT}`);
        });
    });
})();
import express from "express";
import cors, {CorsOptions} from "cors";
import signale from "signale";
import helmet from "helmet";
import http from "http";
import dotenv from "dotenv";

import connectToDatabase from "./src/database/database";

import { usuarioRouter } from "./src/usuarios/infrastructure/usuarioRouter";
import { perroRouter } from "./src/Perros/infrastructure/perroRouter";

dotenv.config();

const corsOptions:CorsOptions = {
    origin: function(origin:string | undefined,callback){
        const allowedOrigins: Array<string> = [process.env.DOMAIN_ALLOWED ? process.env.DOMAIN_ALLOWED : 'none at all'];
        if (allowedOrigins.indexOf(origin ? origin : 'nil') !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Cors no admite peticiones de este dominio'));
        }
    },
    allowedHeaders: ["Content-Type"],
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'HEAD'],
    credentials: true
}

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

app.use("/usuarios", usuarioRouter);
app.use("/perros", perroRouter);

const server = http.createServer(app);

const PORT = process.env.PORT;

(async function () {
    await connectToDatabase().then(() => {
        server.listen(PORT, () => {
            signale.success(`servidor escuchando en el puerto: ${PORT}`);
        });
    });
})();
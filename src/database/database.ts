import mongoose from "mongoose";
import signale from "signale";
import dotenv from "dotenv";

dotenv.config();

const MONGO_ROUTE: string = process.env.MONGO_ROUTE ? process.env.MONGO_ROUTE : "not route";

export default async function connectToDatabase() {
    try {
        await mongoose.connect(MONGO_ROUTE);
    } catch (error) {
        signale.info('error al iniciar la conexion a la base de datos', error);
    }
}

const conn = mongoose.connection;

conn.once('open', function () {
    signale.info('conexion a mongo exitosa'); 
});

conn.on('error', function () {
    signale.error('la conexion a la base de datos ha sufrido un fallo'); 
});
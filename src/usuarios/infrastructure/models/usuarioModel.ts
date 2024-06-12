import mongoose, { Schema, model, Document } from "mongoose";
import { IUsuario } from "../../domain/IUsuario.js";

export const usuarioSchema = new Schema<IUsuario & Document>({
    username: {
        required: true,
        type: Schema.Types.String
    },
    email: {
        required: true,
        type: Schema.Types.String
    },
    password: {
        required: true,
        type: Schema.Types.String
    },
    mascotas: {
        required: true,
        type: [Schema.Types.String]
    }
});

const usuarioModel = model('usuario', usuarioSchema, 'usuarios');
export default usuarioModel;
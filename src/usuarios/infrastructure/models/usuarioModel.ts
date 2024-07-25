import mongoose, { Schema, model, Document } from "mongoose";
import { IUsuario } from "../../domain/IUsuario.js";
import { gmailValidator, stringValidator } from "./validate";

export const usuarioSchema = new Schema<IUsuario & Document>({
    gmail: {
        required: true,
        type: Schema.Types.String,
        unique: true,
        validate: {
            validator: (value: string) => gmailValidator(value),
            message: 'formato de gmail erróneo'
        }
    },
    password: {
        required: true,
        type: Schema.Types.String,
        validate: {
            validator: (value: string) => stringValidator(value),
            message: 'contraseña invalida y potencialmente dañina'
        }
    }
});

const usuarioModel = model('usuario', usuarioSchema, 'usuarios');
export default usuarioModel;
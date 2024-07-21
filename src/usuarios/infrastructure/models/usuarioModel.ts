import mongoose, { Schema, model, Document } from "mongoose";
import { IUsuario } from "../../domain/IUsuario.js";
import { gmailValidator, stringValidator } from "./validate.js";

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
    },
    mascotas: {
        required: false,
        type: [Schema.Types.String],
        validate: {
            validator: (values: string[]) => values.every((value) => stringValidator(value)),
            message: 'id de mascota invalido y potencialmente dañino'
        }
    }
});

const usuarioModel = model('usuario', usuarioSchema, 'usuarios');
export default usuarioModel;
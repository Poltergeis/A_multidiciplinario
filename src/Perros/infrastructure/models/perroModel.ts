import mongoose, { Schema, model } from "mongoose";
import { IPerro } from "../../domain/IPerro";
import { stringValidator } from "./validate";

const perroSchema = new Schema<IPerro>({
    nombre: {
        type: Schema.Types.String,
        required: true,
        validate: {
            validator: (value: string) => stringValidator(value),
            message: 'nombre de mascota invalido y potencialmente dañino'
        }
    },
    fechaNacimiento: {
        type: Schema.Types.String,
        required: true
    },
    peso: {
        type: Schema.Types.String,
        required: true
    },
    tamaño: {
        type: Schema.Types.String,
        required: true
    },
    idDueño: {
        type: Schema.Types.String,
        required: true,
        validate: {
            validator: (value: string) => stringValidator(value),
            message: 'id de dueño invalido y potencialmente dañino'
        }
    }
}, { versionKey: false });

const perroModel = model('perros', perroSchema, 'perros');
export default perroModel;
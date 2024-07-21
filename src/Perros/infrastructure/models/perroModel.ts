import mongoose, { Schema, model } from "mongoose";
import { IPerro } from "../../domain/IPerro";
import { edadValidator, stringValidator } from "./validate";

const perroSchema = new Schema<IPerro>({
    nombre: {
        type: Schema.Types.String,
        required: true,
        validate: {
            validator: (value: string) => stringValidator(value),
            message: 'nombre de mascota invalido y potencialmente dañino'
        }
    },
    edad: {
        type: Schema.Types.Number,
        required: true,
        validate: {
            validator: (edad: number) => edadValidator(edad),
            message: 'valor de edad erroneo o imposible'
        }
    },
    estadoDeSalud: {
        type: Schema.Types.String,
        required: true,
        validate: {
            validator: (value: string) => stringValidator(value),
            message: 'estado de salud invalido y potencialmente dañino'
        }
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
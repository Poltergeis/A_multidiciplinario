import mongoose, { Schema, model } from "mongoose";
import { IPerro } from "../../domain/IPerro";

const perroSchema = new Schema<IPerro>({
    nombre: {
        type: Schema.Types.String,
        required: true
    },
    edad: {
        type: Schema.Types.Number,
        required: true
    },
    estadoDeSalud: {
        type: Schema.Types.String,
        required: true
    },
    idDueño: {
        type: Schema.Types.String,
        required: true
    }
}, { versionKey: false });

const perroModel = model('perros', perroSchema, 'perros');
export default perroModel;
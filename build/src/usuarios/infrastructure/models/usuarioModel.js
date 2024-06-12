import { Schema, model } from "mongoose";
export const usuarioSchema = new Schema({
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

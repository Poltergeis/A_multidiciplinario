import { model, Schema } from "mongoose";
import { IRegistro } from "../../domain/IRegistro";

const registroSchema = new Schema<IRegistro>({
    idPerro: {
        type: Schema.Types.String,
        required: true
    },
    temperatura:{
        type: Schema.Types.String,
        required: true
    },
    ritmoCardiaco: {
        type: Schema.Types.String,
        required: true
    }
});

const RegistroModel = model('registro', registroSchema, 'registros');
export default RegistroModel;
import { IRegistro } from "../domain/IRegistro";
import { RegistroRepository } from "../domain/RegistroRepository";
import RegistroModel from "./models/RegistroModel";

export default class MongoRepository implements RegistroRepository{
    async saveData(temperatura: number, ritmoCardiaco: number, idPerro: string): Promise<IRegistro | null> {
        try {
            const registro = new RegistroModel({
                temperatura, ritmoCardiaco, idPerro,
                fecha: new Date().toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "2-digit",
                  })
            });
            await registro.save();
            return registro;
        } catch (error) {
            throw error;
        }
    }
    async getData(idPerro: string): Promise<IRegistro[] | null> {
        try {
            const registros = await RegistroModel.find({ idPerro: idPerro });
            return registros;
        } catch (error) {
            throw error;
        }
    }

}
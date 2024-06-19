import { IPerro } from "../domain/IPerro";
import { PerroRepository } from "../domain/PerroRepository";
import perroModel from "./models/perroModel";

export class PerroMongoRepository implements PerroRepository {
    async createPerro(nombre: string, edad: number, estadoDeSalud: string, idDueño: string): Promise<IPerro | null> {
        try {
            const nuevoPerro = new perroModel({
                nombre, edad, estadoDeSalud, idDueño
            });  
            if (!nuevoPerro) {
                return null;
            }
            await nuevoPerro.save();
            return nuevoPerro;
        } catch (error) {
            return null;
        }
    }
    async mapPerros(idDueño: string): Promise<IPerro[] | null> {
        try {
            const perros = await perroModel.find({ idDueño: idDueño });
            if (!perros) return null;
            return perros;
        } catch (error) {
            return null;
        }
    }
    async modifyPerro(idPerro: string, newNombre?: string | undefined, newEdad?: number | undefined, newEstadoDeSalud?: string | undefined): Promise<IPerro | null> {
        try {
            const perro = await perroModel.findById(idPerro);
            if (!perro) return null;
            perro.nombre = newNombre ?? perro.nombre;
            perro.edad = newEdad ?? perro.edad;
            perro.estadoDeSalud = newEstadoDeSalud ?? perro.estadoDeSalud;
            await perro.save();
            return perro;
        } catch (error) {
            return null;
        }
    }
    async deletePerro(idPerro: string): Promise<IPerro | null> {
        try {
            const perro = await perroModel.findById(idPerro);
            if (!perro) return null;
            await perro.deleteOne();
            return perro;
        } catch (error) {
            return null;
        }
    }
    
}
import { IPerro } from "../domain/IPerro";
import { PerroRepository } from "../domain/PerroRepository";
import perroModel from "./models/perroModel";

export class PerroMongoRepository implements PerroRepository {
    async createPerro(nombre: string, fechaNacimiento: string, peso: string, tamaño: string, idDueño: string): Promise<IPerro | null> {
        try {
            const nuevoPerro = new perroModel({
                nombre: nombre,
                fechaNacimiento: fechaNacimiento,
                peso: peso,
                tamaño: tamaño,
                idDueño: idDueño
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
    async modifyPerro(idPerro: string, newNombre?: string,
        newFechaNacimiento?: string, newPeso?: string, newTamaño?: string): Promise<IPerro | null> {
        try {
            const perro = await perroModel.findById(idPerro);
            if (!perro) return null;
            perro.nombre = newNombre ?? perro.nombre;
            perro.fechaNacimiento = newFechaNacimiento ?? perro.fechaNacimiento;
            perro.peso = newPeso ?? perro.peso;
            perro.tamaño = newTamaño ?? perro.tamaño;
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
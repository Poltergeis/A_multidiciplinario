import { ISensorData } from "../domain/ISensorData";
import { SensorRepository } from "../domain/SensorRepository";

export class PostSensorDataUseCase {
    constructor(readonly sensorRepository: SensorRepository) { }
    
    async run(
        latitud: number,
        longitud: number,
        sp32_id: string,
        latidosPorMinuto: number,
        temperatura: number,
        idDueño: string
    ): Promise<ISensorData | null> {
        try {
            return await this.sensorRepository.postData(latitud,longitud,sp32_id,latidosPorMinuto,temperatura,idDueño);
        } catch (error) {
            console.log(`error en el caso de uso de postSensorData. ERROR:${error}`);
            return null;
        }
    }
}
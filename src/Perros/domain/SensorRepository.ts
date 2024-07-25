import { ISensorData } from "./ISensorData";

export interface SensorRepository {
    postData(
        latitud: number,
        longitud: number,
        sp32_id: string,
        latidosPorMinuto: number,
        temperatura: number
    ): Promise<ISensorData | null>;
}
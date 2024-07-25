import { WebSocket } from "ws";
import { ISensorData } from "../domain/ISensorData";
import { SensorRepository } from "../domain/SensorRepository";

export class WebSocketsRepository implements SensorRepository {
  private ws?: WebSocket;

  constructor() {
    this.connect();
  }

  async postData(
    latitud: number,
    longitud: number,
    sp32_id: string,
    latidosPorMinuto: number,
      temperatura: number,
    idUsuario: string
  ): Promise<ISensorData | null> {
    try {
      if (!this.ws || !this.ws.readyState) {
        return null;
      }
      this.ws?.send(
        JSON.stringify({
          latitud,
          longitud,
          sp32_id,
          latidosPorMinuto,
          temperatura,
            eventName: "SensorData",
          idUsuario
        })
      );
      return { latitud, longitud, sp32_id, latidosPorMinuto, temperatura };
    } catch (error) {
      throw error;
    }
  }

  private connect() {
    this.ws = new WebSocket(process.env.WS_API as string);

    this.ws.onopen = () => {
      console.log("Conexión al servidor WebSockets establecida");
    };

    this.ws.onclose = () => {
      console.log(
        "Cerrando la conexión. Intentando reconectar en 5 segundos..."
      );
      setTimeout(() => this.connect(), 5000);
    };

    this.ws.onerror = (event) => {
      console.error(`Error en el servidor WebSockets: ${event.message}`);
    };
  }
}

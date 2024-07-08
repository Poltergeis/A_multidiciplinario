import { WebSocket } from "ws"

export interface WSS{
    set(): void;
    getSocket(idClient: string): ClientSocket;
}

export interface ClientSocket extends WebSocket{
    id: string
}
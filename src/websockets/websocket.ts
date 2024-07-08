import { WebSocketServer } from "ws";
import http from "http";
import { ClientSocket, WSS } from "./wsTypes";

export default class WSServer implements WSS {
    private wss: WebSocketServer;
    private sockets: ClientSocket[];

    constructor(server:http.Server) {
        this.wss = new WebSocketServer({ server });
        this.sockets = [];
    }

    public set() {
        this.wss.on('connection', (socket: ClientSocket) => {
            console.log('nueva conexion ws:', socket);
            this.sockets.push(socket);

            socket.on('close', () => {
                this.sockets = this.sockets.filter(storedSocket => storedSocket !== socket);
            });

            socket.on('error', (err:Error) => {
                console.log('error de websockets',err.message);
                this.sockets = this.sockets.filter(storedSocket => storedSocket !== socket);
            })
        });
    }

    public getSocket(idClient:string) {
        return this.sockets[
            this.sockets.findIndex((socket) => socket.id === idClient)
        ];
    }
}
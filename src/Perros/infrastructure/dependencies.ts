import { PerroMongoRepository } from "./mongoRepository";
import { WebSocketsRepository } from "./websocketsRepository";

import { CreatePerroUseCase } from "../application/createPerroUseCase";
import { DeletePerroUseCase } from "../application/deletePerroUseCase";
import { MapPerrosUseCase } from "../application/mapPerrosUseCase";
import { ModifyPerroUseCase } from "../application/modifyPerroUseCase";

import { PostSensorDataUseCase } from "../application/postSensorDataUseCase";

import { CreatePerroController } from "./controllers/createPerroController";
import { DeletePerroController } from "./controllers/deletePerroController";
import { MapPerrosController } from "./controllers/mapPerrosController";
import { ModifyPerroController } from "./controllers/modifyPerroController";

import { PostSensorDataController } from "./controllers/postSensorDataController";

class Dependencies {
    createPerroController: CreatePerroController;
    deletePerroController: DeletePerroController;
    mapPerrosController: MapPerrosController;
    modifyPerroController: ModifyPerroController;
    postSensorDataController: PostSensorDataController;
    constructor() {
        const perroMongoRepository = new PerroMongoRepository();
        const webSocketsRepository = new WebSocketsRepository();

        const deletePerroUseCase = new DeletePerroUseCase(perroMongoRepository);
        const mapPerrosUseCase = new MapPerrosUseCase(perroMongoRepository);
        const createPerroUseCase = new CreatePerroUseCase(perroMongoRepository);
        const modifyPerroUseCase = new ModifyPerroUseCase(perroMongoRepository);
        const postSensorDataUseCase = new PostSensorDataUseCase(webSocketsRepository);

        this.createPerroController = new CreatePerroController(createPerroUseCase);
        this.deletePerroController = new DeletePerroController(deletePerroUseCase);
        this.mapPerrosController = new MapPerrosController(mapPerrosUseCase);
        this.modifyPerroController = new ModifyPerroController(modifyPerroUseCase);
        this.postSensorDataController = new PostSensorDataController(postSensorDataUseCase);
    }
}

export default function getDependencies() {
    return new Dependencies();
}
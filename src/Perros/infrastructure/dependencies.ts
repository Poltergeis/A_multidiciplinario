import { PerroMongoRepository } from "./mongoRepository";

import { CreatePerroUseCase } from "../application/createPerroUseCase";
import { DeletePerroUseCase } from "../application/deletePerroUseCase";
import { MapPerrosUseCase } from "../application/mapPerrosUseCase";
import { ModifyPerroUseCase } from "../application/modifyPerroUseCase";

import { CreatePerroController } from "./controllers/createPerroController";
import { DeletePerroController } from "./controllers/deletePerroController";
import { MapPerrosController } from "./controllers/mapPerrosController";
import { ModifyPerroController } from "./controllers/modifyPerroController";

class Dependencies {
    createPerroController: CreatePerroController;
    deletePerroController: DeletePerroController;
    mapPerrosController: MapPerrosController;
    modifyPerroController: ModifyPerroController;
    constructor() {
        const perroMongoRepository = new PerroMongoRepository();

        const deletePerroUseCase = new DeletePerroUseCase(perroMongoRepository);
        const mapPerrosUseCase = new MapPerrosUseCase(perroMongoRepository);
        const createPerroUseCase = new CreatePerroUseCase(perroMongoRepository);
        const modifyPerroUseCase = new ModifyPerroUseCase(perroMongoRepository);

        this.createPerroController = new CreatePerroController(createPerroUseCase);
        this.deletePerroController = new DeletePerroController(deletePerroUseCase);
        this.mapPerrosController = new MapPerrosController(mapPerrosUseCase);
        this.modifyPerroController = new ModifyPerroController(modifyPerroUseCase);
    }
}

export default function getDependencies() {
    return new Dependencies();
}
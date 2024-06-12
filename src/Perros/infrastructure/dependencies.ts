import { PerroMongoRepository } from "./mongoRepository.js";

import { CreatePerroUseCase } from "../application/createPerroUseCase.js";
import { DeletePerroUseCase } from "../application/deletePerroUseCase.js";
import { MapPerrosUseCase } from "../application/mapPerrosUseCase.js";
import { ModifyPerroUseCase } from "../application/modifyPerroUseCase.js";

import { CreatePerroController } from "./controllers/createPerroController.js";
import { DeletePerroController } from "./controllers/deletePerroController.js";
import { MapPerrosController } from "./controllers/mapPerrosController.js";
import { ModifyPerroController } from "./controllers/modifyPerroController.js";

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
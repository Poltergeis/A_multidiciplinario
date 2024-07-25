import MongoRepository from "./MongoRepository";

import { GetDataUseCase } from "../application/getDataUseCase";
import { SaveDataUseCase } from "../application/saveDataUseCase";

import { GetDataController } from "./controllers/GetDataController";
import { SaveDataController } from "./controllers/SaveDataController";

export class Dependencies {
    getDataController: GetDataController;
    saveDataController: SaveDataController;

    constructor() {
        const mongoRepository = new MongoRepository();

        const getDataUseCase = new GetDataUseCase(mongoRepository);
        const saveDataUseCase = new SaveDataUseCase(mongoRepository);

        this.getDataController = new GetDataController(getDataUseCase);
        this.saveDataController = new SaveDataController(saveDataUseCase);
    }
}

export default function getDependencies(){
    return new Dependencies();
}
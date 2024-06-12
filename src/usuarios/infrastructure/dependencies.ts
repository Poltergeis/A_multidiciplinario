import { MongoRepository } from "./MongoRepository.js";
import { DeleteUseCase } from "../application/useCases/deleteUseCase.js";
import { LoginUseCase } from "../application/useCases/loginUseCase.js";
import { ModifyUseCase } from "../application/useCases/modifyUseCase.js";
import { RegisterUseCase } from "../application/useCases/registerUseCase.js";

import { DeleteController } from "./controllers/deleteController.js";
import { LoginController } from "./controllers/loginController.js";
import { ModifyController } from "./controllers/modifyController.js";
import { RegisterController } from "./controllers/registerController.js";

import { BcryptRepository } from "./bcryptRepository.js";

/*const mongoRepository = new MongoRepository();
const bcryptRepository = new BcryptRepository();

const deleteUseCase = new DeleteUseCase(bcryptRepository, mongoRepository);
const loginUseCase = new LoginUseCase(mongoRepository, bcryptRepository);
const modifyUseCase = new ModifyUseCase(mongoRepository, bcryptRepository);
const registerUseCase = new RegisterUseCase(mongoRepository, bcryptRepository);*/

class Dependencies {
    deleteController: DeleteController;
    loginController: LoginController;
    modifyController: ModifyController;
    registerController: RegisterController;
    constructor() {
        const mongoRepository = new MongoRepository();
        const encrypterRepository = new BcryptRepository();

        const deleteUseCase = new DeleteUseCase(encrypterRepository, mongoRepository);
        const loginUseCase = new LoginUseCase(mongoRepository, encrypterRepository);
        const modifyUseCase = new ModifyUseCase(mongoRepository, encrypterRepository);
        const registerUseCase = new RegisterUseCase(mongoRepository, encrypterRepository);

        this.deleteController = new DeleteController(deleteUseCase);
        this.loginController = new LoginController(loginUseCase);
        this.modifyController = new ModifyController(modifyUseCase);
        this.registerController = new RegisterController(registerUseCase);

    }
}

export default function getDependencies() {
    return new Dependencies();
}

/*export const deleteController = new DeleteController(deleteUseCase);
export const loginController = new LoginController(loginUseCase);
export const registerController = new RegisterController(registerUseCase);
export const modifyController = new ModifyController(modifyUseCase);*/
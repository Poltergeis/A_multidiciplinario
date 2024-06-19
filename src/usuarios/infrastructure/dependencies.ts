import { MongoRepository } from "./MongoRepository";
import { DeleteUseCase } from "../application/useCases/deleteUseCase";
import { LoginUseCase } from "../application/useCases/loginUseCase";
import { ModifyUseCase } from "../application/useCases/modifyUseCase";
import { RegisterUseCase } from "../application/useCases/registerUseCase";

import { DeleteController } from "./controllers/deleteController";
import { LoginController } from "./controllers/loginController";
import { ModifyController } from "./controllers/modifyController";
import { RegisterController } from "./controllers/registerController";

import { BcryptRepository } from "./bcryptRepository";

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
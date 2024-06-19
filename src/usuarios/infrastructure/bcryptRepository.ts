import bcrypt from "bcrypt";
import { EncryperRepository } from "../domain/encrypterRepository";

export class BcryptRepository implements EncryperRepository{
    encrypt(value: string) {
        return bcrypt.hash(value, 10);
    }

    check(value: string, storedValue: string) {
        return bcrypt.compare(value, storedValue);
    }
}
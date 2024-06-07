import bcrypt from "bcrypt";
export class Encryper {
    encrypt(value) {
        return bcrypt.hash(value, 10);
    }
    check(value, storedValue) {
        return bcrypt.compare(value, storedValue);
    }
}

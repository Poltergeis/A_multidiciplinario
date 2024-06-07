export interface EncryperRepository{
    encrypt(value: string): Promise<string>;
    check(value: string, storedValue: string): Promise<boolean>;
}
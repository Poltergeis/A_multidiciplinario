import { Request } from "express";

export default interface ValidatedRequest extends Request {
    user: {
        gmail: string;
        password: string;
        mascotas?: string[];
    };
}
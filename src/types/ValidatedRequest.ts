import { Request } from "express";

export default interface ValidatedRequest extends Request {
    user: {
        _id: string;
        gmail: string;
        password: string;
        mascotas?: string[];
    };
}
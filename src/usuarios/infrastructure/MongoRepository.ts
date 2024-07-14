import {Document} from "mongoose";
import usuarioModel from "./models/usuarioModel";
import { UsuarioRepository } from "../domain/UsuarioRepository";
import { IUsuario } from "../domain/IUsuario";

interface UsuarioDocument extends IUsuario,Document{}

export class MongoRepository implements UsuarioRepository{
    async register(gmail: string, password: string): Promise<IUsuario | null> {
        try {
            const nuevoUsuario = new usuarioModel({
                gmail,
                password
            });
            await nuevoUsuario.save();
            return nuevoUsuario;
        } catch (error) {
            return null;
        }
    }
    async getUserByEmail(gmail: string): Promise<IUsuario | null> {
        try {
            const usuario = await usuarioModel.findOne({ gmail });
            return usuario;
        } catch (error) {
            return null;
        }
    }
    async modify(usuarioOld: UsuarioDocument,username?: string | undefined, email?: string | undefined, password?: string | undefined): Promise<IUsuario | null> {
        try {
            usuarioOld.gmail = email ?? usuarioOld.gmail;
            usuarioOld.password = password ?? usuarioOld.password;
            await usuarioOld.save();
            return usuarioOld;
        } catch (error) {
            return null;
        }
    }
    async delete(email: string, password: string): Promise<IUsuario | null> {
        try {
            const usuario = await this.getUserByEmail(email) as UsuarioDocument;
            if (!usuario) {
                return null;
            } else await usuario.deleteOne();
            return usuario;
        } catch (error) {
            return null;
        }
    }
}
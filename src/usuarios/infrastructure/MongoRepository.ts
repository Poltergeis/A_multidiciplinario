import {Document} from "mongoose";
import usuarioModel from "./models/usuarioModel.js";
import { UsuarioRepository } from "../domain/UsuarioRepository.js";
import { IUsuario } from "../domain/IUsuario.js";

interface UsuarioDocument extends IUsuario,Document{}

export class MongoRepository implements UsuarioRepository{
    async register(username: string, email: string, password: string): Promise<IUsuario | null> {
        try {
            const nuevoUsuario = new usuarioModel({
                username,
                email,
                password
            });
            await nuevoUsuario.save();
            return nuevoUsuario;
        } catch (error) {
            return null;
        }
    }
    async getUserByEmail(email: string): Promise<IUsuario | null> {
        try {
            const usuario = await usuarioModel.findOne({ email });
            return usuario;
        } catch (error) {
            return null;
        }
    }
    async modify(usuarioOld: UsuarioDocument,username?: string | undefined, email?: string | undefined, password?: string | undefined): Promise<IUsuario | null> {
        try {
            usuarioOld.email = email ?? usuarioOld.email;
            usuarioOld.password = password ?? usuarioOld.password;
            usuarioOld.username = username ?? usuarioOld.username;
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
export class Usuario {
    username;
    email;
    password;
    mascotas;
    constructor(username, email, password, mascotas) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.mascotas = mascotas;
    }
}

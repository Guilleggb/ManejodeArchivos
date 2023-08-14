const { promises: fsPromises } = require("fs");

class ManagerUsuarios {
    constructor() {
        this.usuarios = [];
        this.path = "users.json";
        this.loadUsuariosFromFile();
    }

    async loadUsuariosFromFile() {
        try {
            const dataStr = await fsPromises.readFile(this.path, "utf-8");
            this.usuarios = JSON.parse(dataStr);
        } catch (err) {
            console.error(err);
            this.usuarios = [];
        }
    }

    async saveToFile() {
        try {
            const usuariosStr = JSON.stringify(this.usuarios);
            await fsPromises.writeFile(this.path, usuariosStr);
        } catch (err) {
            console.error(err);
        }
    }

    async agregarUsuario(usuario) {
        this.loadUsuariosFromFile();

        if (this.usuarios.some((usr) => usr.codigo === usuario.codigo)) {
            console.log(`El código ${usuario.codigo} está repetido`);
            return;
        }

        usuario.id = this.generateId();
        this.usuarios.push(usuario);

        await this.saveToFile();
    }

    generateId() {
        let idGenerated = 0;
        for (const usuario of this.usuarios) {
            if (usuario.id > idGenerated) {
                idGenerated = usuario.id;
            }
        }
        return ++idGenerated;
    }

    obtenerUsuarios() {
        this.loadUsuariosFromFile();
        return this.usuarios;
    }

    obtenerUsuarioPorId(id) {
        this.loadUsuariosFromFile();
        const usuario = this.usuarios.find((usr) => usr.id === id);
        if (!usuario) {
            console.log("No encontrado");
        } else {
            return usuario;
        }
    }
}

module.exports = ManagerUsuarios;
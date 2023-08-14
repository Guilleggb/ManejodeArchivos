const ManagerUsuarios = require("./ManagerUsuarios");

const managerUsuarios = new ManagerUsuarios();

managerUsuarios.agregarUsuario({
    nombre: "Alice",
    edad: 25,
    codigo: "A11",
});

managerUsuarios.agregarUsuario({
    nombre: "Bob",
    edad: 30,
    codigo: "A12",
});

console.log(managerUsuarios.obtenerUsuarios());
console.log(managerUsuarios.obtenerUsuarioPorId(1));
console.log(managerUsuarios.obtenerUsuarioPorId(3));
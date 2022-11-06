"use strict";
// uniones de tipos
let fechaNacimiento;
let pruebaTresTipos;
pruebaTresTipos = "string";
pruebaTresTipos = 123;
pruebaTresTipos = true;
// en la firma de funciones
function calcularPromedio(valores, total) {
    if (typeof valores === 'number' && total) {
        return valores / total;
    }
    if (Array.isArray(valores) && valores.length > 0) {
        return valores.reduce((acumulador, valorActual) => acumulador + valorActual, 0) / valores.length;
    }
    throw Error('parametros no validos');
}
console.log(calcularPromedio([10, 20, 30, 50]));
console.log(calcularPromedio(156, 21));
console.log(calcularPromedio(0, 3));
console.log(calcularPromedio([]));

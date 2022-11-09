import { type } from "os";

// uniones de tipos
let fechaNacimiento : string | Date;

let pruebaTresTipos: string | number | boolean;
pruebaTresTipos = "string";
pruebaTresTipos = 123
pruebaTresTipos = true

// en la firma de funciones

function calcularPromedio(valores: number | number[], total?:number) :number | never {
    if (typeof valores === 'number' && total) {
        return valores / total
    }
    if(Array.isArray(valores) && valores.length > 0) {
        return valores.reduce((acumulador,valorActual) => acumulador + valorActual, 0) / valores.length
    }

    throw Error('parametros no validos')
}

console.log(calcularPromedio([10,20,30,50]))
console.log(calcularPromedio(156,21))
console.log(calcularPromedio(0,3))
// console.log(calcularPromedio([])) 

// definicion de tipos
type Perro = 'perro'
type Gato = 'gato'

type Mascota = Perro | Gato
let mascota : Mascota;
mascota = "gato"
mascota = "perro"
mascota = "pajaro"
mascota = "pepa"
console.log(mascota)

// Interfaces y objetos

interface Huesped {
    id: number,
    nombre: string,
    apellido: string,
    correo: string,
    direccion?: string,
    telefono?:string
}

// type Piso = 'Primer piso' | 'Segundo piso'

interface Cuarto {
    id: number,
    tipo: 'individual' | 'doble' | 'triple',
    piso: Piso,
    precioNoche: number
}

interface Reservacion {
    id: number,
    huesped: Huesped,
    fechaEntrada: Date,
    fechaSalida: Date,
    cuarto: Cuarto,
    nochesReservadas?: number
}

const datosFederico : Huesped = {
    id: 1,
    nombre: "federico",
    apellido: "stagnaro",
    correo: "federico.stagnaro.ar@gmail.com",
}

const reservaFede : Reservacion = {
    id: 1,
    huesped: datosFederico,
    fechaEntrada: new Date(),
    fechaSalida: new Date(),
    cuarto: {id: 1, tipo: "doble",  piso: "Primer piso", precioNoche: 500}
    
}

// extension de interfaces

interface AA {
    a: string,
    b: number,
    c: boolean
}

interface BB extends AA {
    d: Array<string>
}
interface CC {
    x: string | number
}

interface DD extends AA, CC {
    y: number | undefined
}

// Enums ==> sirven para declarar constantes || sirven para hacer legible el codigo

// tipo numerico
// Segun el primer valor, luego se incrementa de a 1.... Por defecto el primer elemento es 0
enum Piso {
    Primero = 1,    
    Segundo,
    Tercero
}
// tipo string
enum TipoCuarto {
    Individual = "individual",
    Doble = "doble",
    Tiple = "triple"
}   

const pisoDeEjemplo : Piso = Piso.Primero;

interface Cuarto2 {
    id: number,
    tipo: TipoCuarto
    piso: Piso,
    precioNoche: number
}
const cuartoEjemplo : Cuarto2 = {
    id: 10,
    tipo: TipoCuarto.Doble,
    piso: Piso.Primero,
    precioNoche: 5400
}

// tuplas
const arreglo: string[] = ['a', 'b']

const arregloTipoUnion: (string|number)[] = ['a',123]

// definicion de tipos por indice del arreglo
const tuple : [string, number,boolean, number] = ["a", 123, true, 123]


// tipos literales
// sirve para comprobar los potenciales valores q puede tomar una varibale en la aplicacion

const saborDeHelado = "vainilla"

type SaborDeHelado = "Chocolate" | "vainilla" | "fresa";
let sabores: SaborDeHelado = "fresa"

function crearHelado (sabor: SaborDeHelado | string) :void {
    switch(sabor) {
        case "chocolate":
            console.log("haceindo helado de chocolate")
            break;
    }
}

// operador keyof permite obtener un tipo de una interfaz

interface Huesped2 {
    id: number,
    nombre: string,
    apellido: string,
    correo: string,
    direccion?: string,
    telefono?:string
}

const datosFederico : Huesped2 = {
    id: 1,
    nombre: "federico",
    apellido: "stagnaro",
    correo: "federico.stagnaro.ar@gmail.com",
}

const nombrePropiedad: keyof Huesped = 'nombre';

function retornarValor(huesped: Huesped, key: keyof Huesped ) {
    return huesped[key]
}
// solo nos permite ingresar en el segundo parametros valores que correspondan a alguna key de huesped
retornarValor(datosFederico, 'correo')

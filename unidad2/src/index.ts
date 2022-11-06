let message = "prueba";
message = 100;

const prueba = 100;

class Persona { }

let persona = new Persona();

// === Arrays ===

const arreglosString: string[] = ["a", "b"]

const otroArrayString: Array<string> = ["a", "b"]

interface Persona2 {
    nombre: string
}

const arregloPersonas: Array<Persona2> = [{ nombre: "federico" }, { nombre: "leonardo" }]

// Firma de tipos

function calculate(x: number, y: number): number {
    return x + y
}

const filtro = (valor: string): boolean => {
    return valor.length >= 5
}

const animales: string[] = ["perro", "gato"]

console.log(animales.map(animal => filtro(animal)))

// tipo any y unknown

let cualquiera: any;
cualquiera = "string"
cualquiera = 10;

let variableString: string;
let variableUnknown: unknown;
variableUnknown = "string";
variableUnknown = 12;

variableString = variableUnknown; // no se puede. Se podria añadir varios tipos string | unknown

// undefined y null

let unaVariable: undefined;
unaVariable = undefined;

let unaVariableNull: null = null

// never y void
// se usa never cuando sabemos q la ejecucion del codigo se termina en determinado lugar..
// en este caso, se lanza una excepcion . por ende, finaliza la ejecucion

function lanzarError(mensajeError: string): never {
    throw new Error(mensajeError)
}

const saludar = (message: string): void => {
    console.log(message)
}


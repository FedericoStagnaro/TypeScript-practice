// Tipos genericos

//// con tipos 
const arreglo = new Array<string>();

arreglo.push('hola');

(function mostrarEnConsolaString(mensaje: string): string {
    console.log(mensaje + ' desde la funcion...')
    return mensaje
})('Hola typescript')

//// con tipos genericos

// se define un tipo entre los signos (<) y (>)
function mostrarEnConsolaGenerico<GENERIC>(valor: GENERIC): GENERIC {
    console.log(valor, ' desde la funcion generica')
    return valor
}

// en estos ejemplo, typescript decide el tipo de dato segun la entrada como paramentro
mostrarEnConsolaGenerico('string')
mostrarEnConsolaGenerico(123)
mostrarEnConsolaGenerico(['a', 123, true])
mostrarEnConsolaGenerico(false)

mostrarEnConsolaGenerico<'blanco'>(123) // asignando los signos (<) y (>) se fuerza el tipo que queremos añadir

///////////////////////////////////////////////////////////////////////////////////////////
// que pasa cuando se necesitan mas de un tipo generico?

function modificarArregloAlMismoTipo<T>(valores: T[], fnc: (valor: T) => T): T[] {
    const newArreglo = new Array<T>();
    for (const valor of valores) {
        newArreglo.push(fnc(valor))
    }
    return newArreglo;
}

const arregloNumero = modificarArregloAlMismoTipo([1, 2, 3, 4, 5], valor => valor * 3)
const arregloString = modificarArregloAlMismoTipo(['hola', 'mundo'], valor => valor + valor)
// si o si tienen el mismo tipo devuelto que el ingresado

// se puede añadir dos tipos genericos <T,R>
function modificarArregloTipoDistinto<T,R>(valores: T[], fnc: (valor: T) => R): R[] {
    const newArreglo = new Array<R>();
    for (const valor of valores) {
        newArreglo.push(fnc(valor))
    }
    return newArreglo;
}
// ahora se ingresa un tipo generico y regresa otro tipo generico diferente
const arregloNumero2 = modificarArregloTipoDistinto([1, 2, 3, 4, 5], valor => `${valor} + ${valor}`)
const arregloString2 = modificarArregloTipoDistinto(['hola', 'mundo'], valor => valor.length )

///////////////////////////////////////////////////////////////////////////////////////////
// Tipos generico en interfaces

interface IConGenerico<T,R> {
    id: T;
    valor: R;
}

const primerValor : IConGenerico<number, boolean> = {id: 50, valor: true} 

// describe le tipo de un índice ('índice' = valor)
interface ITipoIndex<T> {
    [id: string]: T;
}

const segundoValor : ITipoIndex<number> = {
    123: 123,
    "b": 456,
    "c": 789,
}
const valor = segundoValor[123];
const valor2 = segundoValor['b'];

//////////////////////////////////////////////////////////////////////////////////////////
// genericos en clases
type Fruta = 'fresa'|'mango'|'banano'|'piña'

// se declara un tipo generico junto al nombre
class Frutero<T> {
    private listaFrutas: T[] = [];

    agregarFruta(fruta: T): void {
        this.listaFrutas.push(fruta)
    }
    tomarFruta(index: number) {
        return this.listaFrutas[index];
    }
}
const frutero : Frutero<Fruta> = new Frutero<Fruta>()
frutero.agregarFruta('fresa')
frutero.agregarFruta('mango')

//////////////////////////////////////////////////////////////////////////////////////////
// restricciones para tipos genericos

interface IFruta {
    tipo: Fruta,
    picar: ()=>Fruta
}

// con extend se indica que F debe ser un derivado del tipo fruta
function picarFrutas<F extends IFruta>(frutas: F[]): void {
    for (const fruta of frutas){
        fruta.picar();
    }
}
// estoy obligando q el tipo generico, sea un derivado del tipo fruta y no cualquier cosa

class Fresa implements IFruta {
    tipo: Fruta = 'fresa'
    picar() {
        return this.tipo
    }
}

class Mango implements IFruta {
    tipo: Fruta = 'mango'
    picar() {
        return this.tipo
    }
}
const fresa = new Fresa()
const mango = new Mango()

// de esta manera, esta funcion picar frutas desde un arreglo, solo aceptara un array cuyos 
// objetos sean derivados de clases q implementen este metodo polimorfico Fruta
picarFrutas([fresa, mango])


class Prueba {} // clase q no implementa IFruta
const prueba = new Prueba(); // objeto sin la interfas de IFruta
picarFrutas([fresa, mango, prueba])  // manifiesta un error de tipos

// con keyof se indica que K debe ser el nombre de alguna propiedad de IFruta
function obtenerPropiedadFruta<K extends keyof IFruta>(nombreDePropiedad: K, fruta: IFruta): Fruta | (()=>Fruta) {
    return fruta[nombreDePropiedad]
}
const keyOfFruta = obtenerPropiedadFruta('tipo', fresa) 
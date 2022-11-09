// encadenamiento opcional en aserciones no-null 

import type { SrvRecord } from "dns"

interface DD {
    d: string
}

interface BB {
    c?: DD
}

interface AA {
    a: string,
    b?: BB
}

const prueba: AA = {
    a: 'prueba'
}

// encadenamient oopcional
// operador (?) retornara undefined si una propiedad opcional no esta definida

function existeD(valor: AA): boolean {
    return valor.b?.c?.d ? true : false
}

// aserciones no-nulll: Se activa si la opcion strictNullChecks esta activa en el compilador
// El opderador ! asegura al compilador que la propiedades opcionales existen
// es un poco riesgoso usar este operador ya que las probabilidades pueden no estar definidas
function largoD(valor: AA): number {
    return valor.b!.c!.d.length;
}

// Para evitar usar ! o ? se puede validar la existencia de objetos opcionales al inicion de la funcion
function largoDAsertado(valor: AA): number | null {
    if (valor.b && valor.b.c) {
        return valor.b.c.d.length
    }
    return null
}

// asercion de tipos
function calcularCostoReservacion(costoNoche: number, totalNoches: number, formato: boolean): number | string {
    const costo = costoNoche * totalNoches
    return formato ? `${costo}` : costo
}

// asercion usando keyword 'as'
const costo = calcularCostoReservacion(90, 5, true) as number

interface Pedido {
    id: number;
    cliente: string;
    productos: string[];
    fechaEntrega: Date;
}

interface PedidoSupermercado extends Pedido {
    superMercado: string
}

const pedidoSupermercado: PedidoSupermercado = {
    id: 1,
    cliente: 'paula',
    productos: ['pan', 'tomates'],
    fechaEntrega: new Date(),
    superMercado: 'Tesco'
}

const pedido = pedidoSupermercado as Pedido // se plaica la asercion desde una clase padre

function procesarPedido(pedido: Pedido) {
    console.log(pedido)
}
procesarPedido(pedidoSupermercado)

// Funciones de asercion

const prueba2: AA = {
    a: 'prueba'
}

function assert(condicion: unknown, mensaje: string): asserts condicion {
    if (!condicion) throw new Error(mensaje)
}

assert(prueba2.b, 'b no existe')
const c = prueba2.b.c;


function assertString(condicion: unknown, mensaje: string): asserts condicion {
    if (typeof condicion !== 'string') throw new Error(mensaje);
}

assertString(prueba2.a, 'A no es string')

// guardia de tipos

function calcularDiasDiferencia(fechaEntrada: Date | string, fechaSalida: Date | string): number {
    const fechaInicio = typeof fechaEntrada === 'string' ? new Date(fechaEntrada) : fechaEntrada;
    const fechaFin = typeof fechaSalida === 'string' ? new Date(fechaSalida) : fechaSalida;

    const diferenciaTiempo = fechaFin.getTime() - fechaInicio.getTime()

    return diferenciaTiempo / (1000 * 3600 * 24)
}

interface ProductoFresco {
    fechaExpiracion: Date
}

class Fruta implements ProductoFresco {
    private _tipoFruta: string
    private _fechaExpiracion: Date

    constructor(fechaExpiracion: Date, tipoFruta: string) {
        this._fechaExpiracion = fechaExpiracion
        this._tipoFruta = tipoFruta
    }

    public get tipoFruta(): string {
        return this._tipoFruta
    }
    public get fechaExpiracion(): Date {
        return this._fechaExpiracion
    }
}

const mango = new Fruta(new Date(), 'mango')
const fresa = new Fruta(new Date(), 'fresa')

// guarda personalizadas : arg is tipo:
function esFruta(producto: any): producto is Fruta {
    return producto instanceof Fruta
}

function agregarCarrito(productosFrescos: ProductoFresco[]): void {
    const frutas = new Array<Fruta>;
    for (let i = 0; i < productosFrescos.length; i++) {
        // Guarda instanceof
        if (productosFrescos[i] instanceof Fruta) {
            frutas.push(productosFrescos[i] as Fruta)
        }

        // Guarda Personalizada
        if (esFruta(productosFrescos[i])) {
            frutas.push(productosFrescos[i] as Fruta)
        }
    }
}

agregarCarrito([mango, fresa])

// Guarda keyword (in)
if ('_fechaExpiracion' in mango) {
    console.log(`Producto mango ${(mango as Fruta).fechaExpiracion}`)
}

// Tipos parcial y required en typescript

interface Computadora {
    id: string
    fabricante: string
    modelo: string
    procesador: string
    touchBar?: boolean
}

// partial: => nos permite pasar datos parciales de la interfaaz computadora
function generaraComputadora(computadora: Partial<Computadora>): Computadora {
    return {
        id: '01',   // valores prestablecidos
        fabricante: 'apple', // valores prestablecidos
        modelo: 'mackbook', // valores prestablecidos
        procesador: 'apple m1 chip', // valores prestablecidos
        ...computadora // copio los datos pasados como parametros parciales
    }
}

// se pasan propiedades parciales que quiero definir como parametro
const nuevaComputadora: Computadora = generaraComputadora({
    id: '02',
    procesador: 'apple m1 extended'
})

// Required => ahce q todas las propiedades opcionales sean requeridas
// touchBar es opcional en el tipo computadora, pero required en el tipo Required<Computadora>
// dado de que la funcion generarComputadora retorna un tipo "Computadora", no hace match con el tipo "Required<Computadora>"
// ya que la funcion generarComputadora podria retornar un objeto cuya propiedad touchBar sea "boolean | undifined"
const conTouchBar: Required<Computadora> = generaraComputadora({
    touchBar: true
})

// Por esto debemos hacer
const conTouchBarBien: Required<Computadora> = {
    ...generaraComputadora({}), // objeto inicial 
    touchBar: true  // expandimos el objeto con la propiedad opcional pero ahora requerida
}

// Tipo readOnly
const computadora: Readonly<Computadora> = {
    ...generaraComputadora({})
}

// definiendo esa propiedad de readOnly , hace q ese objecto solo sea de lectura, no se peude modificar
computadora.id = '02'

// Pick => toma una interfaz y selecciona que propiedades de esa niterfaz va a necesitar
type SubComputadora = Pick<Computadora, 'id' | 'procesador' | 'modelo'>

const computadora2 : SubComputadora = {
    id: '01',
    procesador: 'Ryzen 5400',
    modelo: 'Lenovo 3000'
}

//Omit => toma una interfaz y selecciona que propiedades de esa niterfaz NO va a necesitar
type SinProcesador = Omit<Computadora, 'procesador' >

const computadora3 : SinProcesador = {
    id: '01',
    fabricante: 'Intel',
    modelo: 'Lenovo 3000'
}

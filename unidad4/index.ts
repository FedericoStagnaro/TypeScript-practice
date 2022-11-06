// clases en typescript + propiedades publicas y privadas

type Color = 'negro' | 'rojo' | 'azul'

class Vehiculo {
    marca: string;
    color: Color;

    constructor(marca: string, color: Color){
        this.marca = marca;
        this.color = color;
    }

    descripcionVehiculo(): string {
        return `Este vehigulo es de marca ${this.marca} y color ${this.color}`
    }

    private obtenerVelocidad():string {
        return '100 km/h'
    }
}

const miVehiculo = new Vehiculo('Toyota', 'negro');
miVehiculo.descripcionVehiculo();
miVehiculo.obtenerVelocidad(); // es privado

// modificadores de atributos de clases (Setters and getters)

class Vehiculo2 {
    private _marca: string;
    private _color: Color;
    private _nro_ruedas: number | undefined;

    constructor(marca: string, color: Color, nro_ruedas: number = 0){ // nro de ruedas tiene un valor por defecto de 0 si no se pasa
        this.marca = marca;
        this.color = color;
        this.nro_ruedas = nro_ruedas;
    }

    public get nro_ruedas(): number | undefined {
        return this._nro_ruedas;
    }
    public set nro_ruedas(value: number | undefined) {
        this._nro_ruedas = value;
    }

    public get color(): Color {
        return this._color;
    }
    public set color(value: Color) {
        this._color = value;
    }

    public get marca(): string {
        return this._marca;
    }
    public set marca(value: string) {
        this._marca = value;
    }
    descripcionVehiculo(): string {
        return `Este vehigulo es de marca ${this.marca} y color ${this.color}`
    }

    moverse(): string {
        return `Empieza a moverse a ${this.obtenerVelocidad}`
    }
    private obtenerVelocidad():string { // metodo q no es accesible desde el exterior , ni clases hijas
        return '100 km/h'
    }

    moverseProtected(): string {
        return `Empieza a moverse a ${this.obtenerVelocidadProtected()}` // obtenerVelocidad() es un metodo de la clase padre
    }
    protected obtenerVelocidadProtected():string { // metodo q no es accesible desde el exterior pero si en clases hijas
        return '100 km/h'
    }
}

const miVehiculo2 = new Vehiculo2('Toyota', 'negro');
miVehiculo2.descripcionVehiculo();
miVehiculo2.nro_ruedas = 4
console.log(miVehiculo2.nro_ruedas)
miVehiculo2.obtenerVelocidad(); // es privado

// Herencia de clases

class Avion extends Vehiculo {
    largoAlas: number;

    constructor(marca: string, color: Color, largoAlas: number){
        super(marca, color);
        this.largoAlas = largoAlas;
    }
    // sobre escribimos el metodo de la clase padre
    descripcionVehiculo(): string {
        return `El avion es de marca ${this.marca} y color ${this.color} y su largo de alas es ${this.largoAlas}`
    }

    moverse(): string {
        return `Empieza a moverse a ${this.obtenerVelocidad()}` // obtenerVelocidad() es un metodo de la clase padre
    }
    moverseProtected(): string {
        return `Empieza a moverse a ${super.obtenerVelocidadProtected()}` // obtenerVelocidad() es un metodo de la clase padre
    }

}

// clases abstractas

abstract class Transporte {
    marca: string;
    color: Color;

    constructor(marca: string, color: Color){
        this.marca = marca;
        this.color = color;
    }
    descripcionVehiculo(): string {
        return `Este vehigulo es de marca ${this.marca} y color ${this.color}`
    }

    moverseProtected(): string {
        return `Empieza a moverse a ${this.obtenerVelocidadProtected()}` // obtenerVelocidad() es un metodo de la clase padre
    }
    protected obtenerVelocidadProtected():string { // metodo q no es accesible desde el exterior pero si en clases hijas
        return '100 km/h'
    }
}
const transporte = new Transporte('asdas', 'rojo') // no se pueden crear concreciones desde clases abstractas

class Vehiculo3 extends Transporte {
    nro_ruedas: number
    constructor (marca:string, color: Color, nro_ruedas: number) {
        super(marca, color);
        this.nro_ruedas = nro_ruedas;
    }
    descripcionVehiculo(): string {
        return `El Vehiculo es de marca ${this.marca} y color ${this.color} .`
    }
}

class Avion2 extends Transporte {
    largoAlas: number;

    constructor(marca: string, color: Color, largoAlas: number){
        super(marca, color);
        this.largoAlas = largoAlas;
    }
    descripcionVehiculo(): string {
        return `El avion es de marca ${this.marca} y color ${this.color} y su largo de alas es ${this.largoAlas}`
    }
}

const vehiculo3 = new Vehiculo3('Nissan', 'rojo', 4)
const avion3 = new Avion2('papel', 'negro',20)

const array_transporte = [ vehiculo3 , avion3 ];

(function moverTodos (transportes: Transporte[]){
    transportes.forEach((transporte: Transporte) => {
        console.log(transporte.moverseProtected())      // metodo polimorfico
    });
})(array_transporte);

// interfaces en clases

interface AlgoQueSeMueve {
    nombre: string | undefined,
    moverse: () => string
}

class Animal implements AlgoQueSeMueve {
    nombre: string | undefined;
    moverse(): string {
        return 'El animal se mueve'
    }
}

abstract class Transporte2 implements AlgoQueSeMueve {
    // definida por "AlgoQueSeMueve"
    nombre: string | undefined;

    private marca: string;
    private color: Color;
    private nro_ruedas: number | undefined;

    constructor(marca: string, color: Color, nro_ruedas: number = 0){ 
        this.marca = marca;
        this.color = color;
        this.nro_ruedas = nro_ruedas;
    }

    moverse(): string {
        return 'Me estoy moviendo'
    }
}

class Vehiculo4 extends Transporte2 {
    constructor (marca:string, color: Color, nro_ruedas: number) {
        super(marca, color, nro_ruedas);

    }
}

// Propiedades estaticas de una clase + sobrecarga
// las propiedades y metodos staticos se acceden a traves del nombre de la clase


class Vehiculo5 {
    marca: string;
    color: Color;
    id: string = Vehiculo5.generarID(); // no utilizamos this.generarID() porque es un metodo statico y usamos la clase

    constructor(marca, color){
        this.marca = marca;
        this.color = color
    }
    
    // Sobrecarga de metodos
    hacerMantenimiento(elemento: string) : void;
    hacerMantenimiento(elementoExterno: number) : void;
    hacerMantenimiento(elemento : string | number) :void {
        console.log('Realizando mantenimiento...')
    }

    static generarID(): string {
        return Math.random().toString(36).slice(2)
    }

}
const vehiculo5 = new Vehiculo5('nissan', 'rojo')
vehiculo5.hacerMantenimiento('string')
vehiculo5.hacerMantenimiento(25)


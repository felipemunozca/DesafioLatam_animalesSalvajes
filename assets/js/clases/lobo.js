//import { Animal } from "./animal.js";
import Animal from "./animal.js";

// Clase Lobo hija de clase Animal
class Lobo extends Animal{
	constructor(nombre, edad, img, comentarios, sonido){
		super(nombre, edad, img, comentarios, sonido)
	}

	Aullar() {
		//return console.log('Aullar');
		return this.sonido();
	}
}

export {
    Lobo
}
//import { Animal } from "./animal.js";
import Animal from "./animal.js";

// Clase Aguila hija de clase Animal
class Aguila extends Animal{
	constructor(nombre, edad, img, comentarios, sonido){
		super(nombre, edad, img, comentarios, sonido)
	}

	Chillar() {
		//return console.log('Chillar');
		return this.sonido();
	}
}

export {
    Aguila
}
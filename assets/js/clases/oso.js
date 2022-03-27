//import { Animal } from "./animal.js";
import Animal from "./animal.js";

// Clase Oso hija de clase Animal
class Oso extends Animal{
	constructor(nombre, edad, img, comentarios, sonido){
		super(nombre, edad, img, comentarios, sonido)
	}

	Grunir() {
		//return console.log('Gruñir');
		return this.sonido();
	}
}

export {
    Oso
}
//import { Animal } from "./animal.js";
import Animal from "./animal.js";

// Clase Serpiente hija de clase Animal
class Serpiente extends Animal{
	constructor(nombre, edad, img, comentarios, sonido){
		super(nombre, edad, img, comentarios, sonido)
	}

	Sisear() {
		//return console.log('Sisear');
		return this.sonido();
	}
}

export {
    Serpiente
}
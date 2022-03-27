//import { Animal } from "./animal.js";
import Animal from "./animal.js";

// Clase Leon hija de clase Animal
class Leon extends Animal{
	constructor(nombre, edad, img, comentarios, sonido){
		super(nombre, edad, img, comentarios, sonido)
	}

	Rugir() {
		//return console.log('Rugir');
		return this.sonido();
	}
}

export {
    Leon
}
// Super Clase o clase padre Animal
export default class Animal {
    constructor (nombre, edad, img, comentarios, sonido){
        let _nombre = nombre;
        let _edad = edad;
        let _img = img;
        let _comentarios = comentarios;
        let _sonido = sonido;

        this.getNombre = () => _nombre;
        this.getEdad = () => _edad;
        this.getImg = () => _img;
        this.getComentarios = () => _comentarios;
        this.getSonido = () => _sonido;

        this.setComentarios = (comentarios) => {
            return _comentarios = comentarios
        };
    }

    //metodos getter y setter
    get nombre(){
        return this.getNombre();
    }

    get edad(){
        return this.getEdad();
    }

    get img(){
        return this.getImg();
    }
    
    get comentarios(){
        return this.getComentarios();
    }

    get sonido(){
        return this.getSonido();
    }

    set comentarios(comentarios){
        return this.setComentarios(comentarios);
    }
}
/*
export default {
    Animal
}
*/
//export default Animal;
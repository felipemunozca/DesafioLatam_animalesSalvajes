//importacion de las clases a utilizar
import { Leon } from "./clases/leon.js";
import { Lobo } from "./clases/lobo.js";
import { Oso } from "./clases/oso.js";
import { Serpiente } from "./clases/serpiente.js";
import { Aguila } from "./clases/aguila.js";


//declaro todas las variables a utilizar desde el html
const AnimalesDIV = document.querySelector('#Animales');
const selectorAnimal = document.querySelector('#animal');
const edad = document.querySelector('#edad');
const comentarios = document.querySelector('#comentarios');
const preview = document.querySelector('#preview');
const btnRegistrar = document.querySelector('#btnRegistrar');

//declaro las variables propieas a utilizar
let arregloAnimales = [];
//variable nula -> tiene que ser let para poder guardar las diferentes opciones del arreglo de ciclos if.
let nuevoAnimal;


btnRegistrar.addEventListener('click', (e) => { 
    e.preventDefault();

    obtenerInformacion();
});


let listaAnimalesJson = ( () => {
    
    //se debe agregar el mismo puerto con el que se levante el live server.
    const url = "http://127.0.0.1:5500/animales.json";
    
    //funcion asincrona que consultara al archivo json.
    const obtenerData = async () => {
        const respuesta = await fetch(url)
        const datos = await respuesta.json();
        return datos;
    };

    //retorno un objeto utilizando el metodo obtenerData.
    return { obtenerData };

} ) ();


//funcion de tipo IIFE
//se ejecuta automaticamente cada vez que se cambie (change) la opcion del selector selectorAnimal.
( () => {
    selectorAnimal.addEventListener('change', async (valorAnimal) => {

        const { animales } = await listaAnimalesJson.obtenerData();
        const nombreAnimal = valorAnimal.target.value;
        const imagenAnimal = animales.find(data => data.name == nombreAnimal).imagen;
        
        preview.innerHTML = 
        `<img class="rounded mx-auto d-block" width="85%" height="100%" src="/assets/imgs/${imagenAnimal}" />`;
        
    })
}) ();

const obtenerInformacion = async () => {

    //constante para conectarme al archivo .json y obtener la informacion.
    const { animales } = await listaAnimalesJson.obtenerData();

    //validación que los select elegidos y que en el input escriban algo.
    if (selectorAnimal.value === 'Seleccione un animal') {
        alert('Tiene que elegir un nombre de animal.');
    } else if (edad.value === 'Seleccione un rango de años') {
        alert('Tiene que elegir la edad del animal');
    } else if (comentarios.value == '') {
        alert('Tiene que escribir uno o mas comentarios');
    } else {
        try {
            //variable donde obtengo la imagen del animal desde el nombre guardado en el archivo .json.
            const imagenAnimal = animales.find((animal) => animal.name === selectorAnimal.value).imagen;
            //variable donde obtengo el sonido del animal desde el nombre guardado en el archivo .json.
            const sonidoAnimal = animales.find((animal) => animal.name === selectorAnimal.value).sonido;
            
            //envio las rutas completas de imagen y sonido para guardarlas en cada clase respectiva.
            if (selectorAnimal.value == 'Leon') {
                nuevoAnimal = new Leon (selectorAnimal.value, edad.value, `/assets/imgs/${imagenAnimal}`, comentarios.value, `/assets/sounds/${sonidoAnimal}`);
            }
            if (selectorAnimal.value == 'Lobo') {
                nuevoAnimal = new Lobo (selectorAnimal.value, edad.value, `/assets/imgs/${imagenAnimal}`, comentarios.value, `/assets/sounds/${sonidoAnimal}`);
            }
            if (selectorAnimal.value == 'Oso') {
                nuevoAnimal = new Oso (selectorAnimal.value, edad.value, `/assets/imgs/${imagenAnimal}`, comentarios.value, `/assets/sounds/${sonidoAnimal}`);
            }
            if (selectorAnimal.value == 'Serpiente') {
                nuevoAnimal = new Serpiente (selectorAnimal.value, edad.value, `/assets/imgs/${imagenAnimal}`, comentarios.value, `/assets/sounds/${sonidoAnimal}`);
            }
            if (selectorAnimal.value == 'Aguila') {
                nuevoAnimal = new Aguila (selectorAnimal.value, edad.value, `/assets/imgs/${imagenAnimal}`, comentarios.value, `/assets/sounds/${sonidoAnimal}`);
            }

            //agrego los datos de "nuevoAnimal" en el arreglo vacio.
            arregloAnimales.push(nuevoAnimal);
            //envio los datos a la funcion para mostrarlos en el html.
            mostrarAnimalInvestigacion();
            //limpio el formulario 
            limpiarFormulario();

        } catch (error) {
            console.error(error);
            console.log('Error en la ejecución del programa para agregar el animal a su respectiva clase.')
        }

    }
}

const mostrarAnimalInvestigacion = () => {
    //const AnimalesDIV = document.querySelector('#Animales');
    AnimalesDIV.innerHTML = '';
    //utilizo un foreach para recorrer la informacion que obtendre de las clase de cada animal utilizando la palabra elemento.
    arregloAnimales.forEach((elemento, index) => {
        AnimalesDIV.innerHTML += 
            `<div class="${elemento.nombre} ml-3 mr-3">
                <img src="${elemento.img}" onclick="mostrarModal(${index})" width="200" height="200 "alt="">
                <br>
                <img src="assets/imgs/audio.svg" onclick="document.querySelector('.${elemento.nombre} audio').play()" 
                width="200" height="40" style="background-color: gray" class="pb-1 pt-1" />
                <audio>
                    <source src="${elemento.sonido}" type="audio/mpeg"></source>
                </audio>
            </div>`
    });

}


//utilizo el objeto window para levantar el modal directo en el DOM sin tener que pasar por una funcion o mucho codigo redundante.
window.mostrarModal = (index) => {
    //creo un nuevo arreglo para pasar los valores de arregloAnimales mas el valor de index enviado desde mostrarAnimalInvestigacion()
    let arregloModal = arregloAnimales[index];
    let modalBody= document.querySelector('.modal-body')
    //utilizo las clases de bootstrap para darle estilo.
    modalBody.innerHTML=`
    <div class="text-center text-light  mx-auto">
        <div class="modal-body">
            <img src="${arregloModal.img}" class="rounded mx-auto d-block" width="100%" height ="100%" />           
            <p class="mt-2">${arregloModal.edad}</p>
            <p>Comentarios:</p>
            <p>${arregloModal.comentarios}</p> 
        </div>
    </div>`
    $("#exampleModal").modal("toggle");
    //cargo el atributo toggle para poder hacer desaparacer y aparecer el modal.
}

const limpiarFormulario = () => {

    //volver el select a la posicion cero para resetear.
    selectorAnimal.selectedIndex = 0;
    edad.selectedIndex = 0;
    comentarios.value = '';
    //reseteo la vista previa y vuelvo a cargar la imagen por defecto.
    document.querySelector('#preview').innerHTML = '';
    document.querySelector('#preview').style.backgroundImage = "assets/imgs/lion.svg";
}

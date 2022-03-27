import { Leon } from "./clases/leon.js";
import { Lobo } from "./clases/lobo.js";
import { Oso } from "./clases/oso.js";
import { Serpiente } from "./clases/serpiente.js";
import { Aguila } from "./clases/aguila.js";

const AnimalesDIV = document.querySelector('#Animales');
const selectorAnimal = document.querySelector('#animal');
const edad = document.querySelector('#edad');
const comentarios = document.querySelector('#comentarios');
const preview = document.querySelector('#preview');
const btnRegistrar = document.querySelector('#btnRegistrar');

let arregloAnimales = [];
let nuevoAnimal;


btnRegistrar.addEventListener('click', (e) => { 
    e.preventDefault();

    obtenerInformacion();
});


let listaAnimalesJson = ( () => {
    const url = "http://127.0.0.1:5500/animales.json";
    const obtenerData = async () => {
        const respuesta = await fetch(url)
        const datos = await respuesta.json();
        return datos;
    };
    return { obtenerData };
} ) ();


( () => {
    selectorAnimal.addEventListener('change', async (valorAnimal) => {

        const { animales } = await listaAnimalesJson.obtenerData();
        const nombreAnimal = valorAnimal.target.value;
        const imagenAnimal = animales.find(data => data.name == nombreAnimal).imagen;
        preview.innerHTML = `<img class="rounded mx-auto d-block" width="80%" height="100%" src="/assets/imgs/${imagenAnimal}" />`;
    })
}) ();

const obtenerInformacion = async () => {
    const { animales } = await listaAnimalesJson.obtenerData();

    if (selectorAnimal.value === 'Seleccione un animal') {
        alert('Tiene que elegir un nombre de animal.');
    } else if (edad.value === 'Seleccione un rango de años') {
        alert('Tiene que elegir la edad del animal');
    } else if (comentarios.value == '') {
        alert('Tiene que escribir uno o mas comentarios');
    } else {
        try {
            const imagenAnimal = animales.find((animal) => animal.name === selectorAnimal.value).imagen;
            const sonidoAnimal = animales.find((animal) => animal.name === selectorAnimal.value).sonido;
            
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

            arregloAnimales.push(nuevoAnimal);
            mostrarAnimalInvestigacion();
            limpiarFormulario();

        } catch (error) {
            console.error(error);
            console.log('Error en la ejecución del programa para agregar el animal a su respectiva clase.')
        }
    }
}

const mostrarAnimalInvestigacion = () => {
    AnimalesDIV.innerHTML = '';
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


window.mostrarModal = (index) => {
    let arregloModal = arregloAnimales[index];
    let modalBody= document.querySelector('.modal-body')
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
}

const limpiarFormulario = () => {
    selectorAnimal.selectedIndex = 0;
    edad.selectedIndex = 0;
    comentarios.value = '';
    document.querySelector('#preview').innerHTML = '';
    document.querySelector('#preview').style.backgroundImage = "assets/imgs/lion.svg";
}


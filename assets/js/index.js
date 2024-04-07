import {
  Leon,
  Lobo,
  Oso,
  Serpiente,
  Aguila,
} from "./modulos/class-children-animal.js";

document
  .getElementById("btnRegistrar")
  .addEventListener("click", async function () {
    const nombre = document.getElementById("animal").value;
    const edad = document.getElementById("edad").value;
    const comentarios = document.getElementById("comentarios").value;
    const imagen = await obtenerImagen(nombre);

    let animal;
    switch (nombre) {
      case "Leon":
        animal = new Leon(nombre, edad, imagen, comentarios);
        break;
      case "Lobo":
        animal = new Lobo(nombre, edad, imagen, comentarios);
        break;
      case "Oso":
        animal = new Oso(nombre, edad, imagen, comentarios);
        break;
      case "Serpiente":
        animal = new Serpiente(nombre, edad, imagen, comentarios);
        break;
      case "Aguila":
        animal = new Aguila(nombre, edad, imagen, comentarios);
        break;
      default:
        console.log("Animal no encontrado");
        return;
    }

    mostrarInfoAnimal(animal);
  });

function mostrarImagenPreview(imagenUrl) {
  const previewDiv = document.getElementById("preview");
  previewDiv.style.backgroundImage = `url(${imagenUrl})`;
  previewDiv.style.backgroundSize = "contain";
  previewDiv.style.backgroundPosition = "center";
}

document.getElementById("animal").addEventListener("change", async function () {
  const nombreAnimal = this.value;
  const imagenUrl = await obtenerImagen(nombreAnimal);
  mostrarImagenPreview(imagenUrl);
});

async function obtenerImagen(nombre) {
  const imgUrl = `assets/imgs/${nombre}.jpg`;

  try {
    const respuesta = await fetch(imgUrl);
    if (respuesta.ok) {
      return imgUrl;
    } else {
      throw new Error("No se puede obtener la imagen");
    }
  } catch (error) {
    console.error("Error obteniendo imagen:", error);
    return `imgs/lion.svg`;
  }
}

async function mostrarInfoAnimal(animal) {
  const contenedorAnimales = document.getElementById("Animales");
  const nuevoAnimal = document.createElement("div");

  nuevoAnimal.innerHTML = `<img width="150" height="150" src="${animal.img}" alt="${animal.nombre}" id="animalTabla">
    <p><strong>Nombre:</strong> ${animal.nombre}</p>
    <p><strong>Edad:</strong> ${animal.edad}</p>
    <p><strong>Comentarios:</strong> ${animal.comentarios}</p>
    <button style="background-color: green" onclick="playSound('${animal.sonido}')">
    <img src="assets/imgs/audio.svg" alt="Play Audio" style="width: 150px; height: 24px;"></button>
`;

  contenedorAnimales.appendChild(nuevoAnimal);
}

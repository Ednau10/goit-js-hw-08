// Descrito en la documentación
//import SimpleLightbox from "simplelightbox"; //----> En todos los IMport me marca error, como si no lo encontrara, se opta por verlos desde el html
// Importación adicional de estilos
//import "simplelightbox/dist/simple-lightbox.min.css";

// Importar el array de elementos de la galería
import { galleryItems } from './gallery-items.js';

// Obtener el contenedor de la galería
const galleryContainer = document.querySelector('.gallery');

// Función para crear la galería
function createGalleryMarkup(galleryItems) {
  // Mapear cada elemento del array a un fragmento de HTML
  return galleryItems.map(({ preview, original, description }) => {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description || 'Imagen'}" />
        </a>
      </li>
    `;
  }).join('');
}

// Insertar el marcado de la galería en el contenedor
galleryContainer.innerHTML = createGalleryMarkup(galleryItems);

// Inicializar SimpleLightbox con los enlaces de la galería
const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionDelay: 250,
});

// Escucha el evento de teclado
document.addEventListener('keydown', (e) => {
  // Verificar si la ventana modal está abierta
  if (lightbox.visible()) {
    // Verificar si se presionó la tecla Escape
    if (e.key === 'Escape') {
      // Cerrar la ventana modal
      lightbox.close();
    }
  }
});
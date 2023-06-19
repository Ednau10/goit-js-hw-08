 // Importación de la biblioteca de Vimeo y  throttle de Lodash
import Vimeo from '@vimeo/player';
import _ from 'lodash';

// Obtener el elemento del reproductor de Vimeo por su ID en el HTML
const iframe = document.querySelector('#vimeo-player');
// Crear una instancia del reproductor de Vimeo
const player = new Vimeo(iframe);

//Obtener el tiempo actual de reproducción del video y guardarlo en el localStore
const localStore = () => {
  try {
    player.getCurrentTime().then(seconds => {
      // Guardar el tiempo actual de reproducción en el localStore
      localStorage.setItem('videoplayer-current-time', seconds);
    });
  } catch (error) {
    console.error('Error al obtener el tiempo actual de reproducción del video', error);
  }
};
// Agregar un throttle al evento timeupdate para limitar la frecuencia de guardado
player.on('timeupdate', _.throttle(localStore, 1000));

// Obtener el tiempo de reproducción guardado en el almacenamiento local
const currentTime = localStorage.getItem('videoplayer-current-time');
if (currentTime) {
  player.setCurrentTime(currentTime).catch(error => {
    console.error('Error al establecer el tiempo actual de reproducción del video', error);
  });
}
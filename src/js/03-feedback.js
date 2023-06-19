   import _ from 'lodash';
 //import throttle from '/node_modules/lodash.throttle/index.js';

//Seleccionar los elementos del formulario y crear una función para guardar los valores del formulario en el almacenamiento local
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

// Guardar los valores en el almacenamiento local
function saveToLocalStorage() {
  localStorage.setItem('feedback-form-state', JSON.stringify({
    email: emailInput.value,
    message: messageInput.value
  }));
}

//Usar el evento input para llamar a la función saveToLocalStorage() cuando los valores del formulario cambien
// emailInput.addEventListener('input', saveToLocalStorage);
form.addEventListener('input', _.throttle(saveToLocalStorage, 500));
//emailInput.addEventListener('input', throttle(saveToLocalStorage, 500));
//messageInput.addEventListener('input', saveToLocalStorage);
//messageInput.addEventListener('input', throttle(saveToLocalStorage, 500));
 messageInput.addEventListener('input',_.throttle(saveToLocalStorage, 500));

// Comprobar si hay valores guardados en el almacenamiento local, si los hay, rellenar el formulario con ellos
function init() {
  const savedState = localStorage.getItem('feedback-form-state');
  if (savedState) {
    const { email, message } = JSON.parse(savedState);
    emailInput.value = email;
    messageInput.value = message;
  }
}

// Borrar  valores del almacenamiento local y deja un objeto con los valores actuales del formulario en la consola.
form.addEventListener('submit', event => {
  event.preventDefault();
  const formData = {
    email: emailInput.value,
    message: messageInput.value
  };
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
});

// Iniciar la página
init();
// -- programa javascript --
const desafios = [
    {
        id: 1,
        title: "Desafío 1: El título principal",
        description: "El título más importante de una página se define con la etiqueta h1. ¡Restaurá el título principal!",
        brokenCode: '... El Planeta Digital ...',
        correctAnswer: '<h1>El Planeta Digital</h1>',
        badge: '🏆 Genio de los Títulos',
        isCompleted: false
    },
    {
        id: 2,
        title: "Desafío 2: El párrafo informativo",
        description: "Los párrafos de texto van entre etiquetas p. Arreglá este párrafo para que se vea como la gente.",
        brokenCode: '... HTML es el esqueleto de la web ...',
        correctAnswer: '<p>HTML es el esqueleto de la web</p>',
        badge: '✍️ Arquitecto de Letras',
        isCompleted: false
    },
    {
        id: 3,
        title: "Desafío 3: La imagen perdida",
        description: "Para mostrar una imagen, se usa la etiqueta img con el atributo src. ¡Meté la imagen que falta!",
        brokenCode: '... imagen.png ...',
        // aceptamos varias respuestas porque somos cracks
        correctAnswer: [ 
            '<img src="imagen.png">',
            '<img src="imagen.png"/>',
            "<img src='imagen.png'>",
            '<img src="imagen.png" alt="imagen">',
            '<img alt="imagen" src="imagen.png">'
        ],
        badge: '🖼️ Fotógrafo del Código',
        isCompleted: false
    },
     {
        id: 4,
        title: "Desafío 4: El enlace roto",
        description: "Los enlaces se hacen con la etiqueta 'a' y el atributo 'href="www.ejemplo.com"'. Dejá este enlace como nuevo.",
        brokenCode: '... Ir a la Base de Datos ...',
        correctAnswer: '<a href="www.ejemplo.com">Ir a la Base de Datos</a>',
        badge: '🔗 Uniendo Cables',
        isCompleted: false
    }
];

// ---ARIABLES PARA LLEVAR LA CUENTA--
let desafioActual = 0;
let desafiosCompletados = 0;

// --AGARRAMOS LAS COSAS DEL HTML--
const elementoTituloDesafio = document.getElementById('titulo-desafio');
const elementoDescripcionDesafio = document.getElementById('descripcion-desafio');
const elementoCodigoRoto = document.getElementById('codigo-roto');
const elementoEntradaUsuario = document.getElementById('entrada-usuario');
const botonVerificar = document.getElementById('boton-verificar');
const elementoMensajeFeedback = document.getElementById('mensaje-feedback');
const barraProgreso = document.getElementById('barra-progreso');
const contenedorMedallas = document.getElementById('contenedor-medallas');
const contenedorDesafio = document.getElementById('contenedor-desafio');

// --- LA LÓGICA DEL JUEGO--

/**
 * Pone el desafío en la pantalla para que lo veas.
 * @param {number} indice - El número del desafío que toca.
 */
function cargarDesafio(indice) {
    const desafio = desafios[indice];
    elementoTituloDesafio.textContent = desafio.title;
    elementoDescripcionDesafio.textContent = desafio.description;
    elementoCodigoRoto.textContent = desafio.brokenCode;
    elementoEntradaUsuario.value = ''; // Borramos lo que había antes
    elementoEntradaUsuario.focus(); // Ponemos el cursor ahí
}

/**
 * se fija si lo que escribiste está bien o si mandaste cualquiera.
 */
function verificarRespuesta() {
    const desafio = desafios[desafioActual];
    // Limpiamos lo que escribió el usuario por las dudas
    const respuestaUsuario = elementoEntradaUsuario.value.trim();
    const respuestaCorrecta = desafio.correctAnswer;

    // Sacamos el tembleque si le erró antes
    elementoEntradaUsuario.classList.remove('shake');
    
    // Si la respuesta es un array, vemos si lo que escribió está adentro. Si no, comparamos nomás.
    const esCorrecta = Array.isArray(respuestaCorrecta) 
        ? respuestaCorrecta.includes(respuestaUsuario)
        : respuestaUsuario === respuestaCorrecta;

    if (esCorrecta) {
        manejarRespuestaCorrecta(desafio);
    } else {
        manejarRespuestaIncorrecta();
    }
}

/**
 * Se ejecuta cuando le pegás a la respuesta.
 * @param {object} desafio - el desafío que acabás de resolver.
 */
function manejarRespuestaCorrecta(desafio) {
    elementoMensajeFeedback.textContent = "¡Impecable! Arreglaste el código.";
    elementoMensajeFeedback.style.color = '#34D399'; // verdecito
    desafio.isCompleted = true;
    desafiosCompletados++;
    
    actualizarProgreso();
    agregarChapa(desafio.badge);

    // bloqueamos el botón para que no le de mil veces
    botonVerificar.disabled = true;

    // esperamos un cachito y pasamos al siguiente
    setTimeout(() => {
        desafioActual++;
        if (desafioActual < desafios.length) {
            cargarDesafio(desafioActual);
            elementoMensajeFeedback.textContent = ''; // limpiamos el mensaje
            botonVerificar.disabled = false; // activamos el botón de nuevo
        } else {
            mostrarMensajeFinal();
        }
    }, 1500);
}

/**
 * se ejecuta cuando le errás.
 */
function manejarRespuestaIncorrecta() {
    elementoMensajeFeedback.textContent = "¡ojo! Le erraste en algo. Fijate bien y probá de nuevo.";
    elementoMensajeFeedback.style.color = '#F87171'; // rojo
    elementoEntradaUsuario.classList.add('shake'); // para que tiemble
}

/**
 * actualiza la barrita de progreso.
 */
function actualizarProgreso() {
    const progreso = (desafiosCompletados / desafios.length) * 100;
    barraProgreso.value = progreso;
}

/**
 * te da una medalla (una chapa) por tu logro.
 * @param {string} textoDeLaChapa - el texto que va en la medalla.
 */
function agregarChapa(textoDeLaChapa) {
    if (desafiosCompletados === 1) {
        contenedorMedallas.innerHTML = ''; // limpiamos el "no tenés medallas"
    }
    const elementoChapa = document.createElement('span');
    elementoChapa.className = 'chapa';
    elementoChapa.textContent = textoDeLaChapa;
    contenedorMedallas.appendChild(elementoChapa);
}

/**
 *muestra el mensaje de que sos un campeón cuando terminás todo.
 */
function mostrarMensajeFinal() {
    contenedorDesafio.innerHTML = `
        <div style="text-align: center;">
            <h2 style="font-size: 1.875rem; font-weight: 700; color: #6EE7B7; margin-bottom: 1rem;">¡Impecable!</h2>
            <p style="color: #D1D5DB; font-size: 1.125rem;">Restauraste todo el sistema. El código web ahora funciona gracias a vos, ¡cra!</p>
            <p style="font-size: 3rem; margin-top: 1.5rem;">🎉</p>
        </div>
    `;
}

// --- ARRANQUE DEL SCRIPT ---

// cargamos apenas carga la página
document.addEventListener('DOMContentLoaded', () => {
    cargarDesafio(desafioActual);
});

// le decimos al botón que cuando le hacen clic verifique la respuesta
botonVerificar.addEventListener('click', verificarRespuesta);

// para que también ande con el Enter
elementoEntradaUsuario.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        verificarRespuesta();
    }
});

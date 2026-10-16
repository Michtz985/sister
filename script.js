
"use strict";

// =====================================
// 1. GENERAR GLOBOS
// =====================================

const contenedorGlobos = document.getElementById("globos");

const coloresGlobos = [
    "#ff5d9e",
    "#9c83ff",
    "#ffcf56",
    "#65e6c4",
    "#ff875e"
];

for (let i = 0; i < 6; i++) {
    const globo = document.createElement("div");

    globo.classList.add("globo");

    globo.style.left = `${Math.random() * 100}%`;

    globo.style.background =
        coloresGlobos[i % coloresGlobos.length];

    globo.style.animationDuration =
        `${12 + Math.random() * 12}s`;

    globo.style.animationDelay =
        `${-Math.random() * 20}s`;

    const tamaño = 28 + Math.random() * 22;

    globo.style.width = `${tamaño}px`;
    globo.style.height = `${tamaño * 1.25}px`;

    contenedorGlobos.appendChild(globo);
}

// =====================================
// 2. GENERAR CONFETI
// =====================================

const contenedorConfeti = document.getElementById("confeti");

const coloresConfeti = [
    "#ff70ac",
    "#ffdc83",
    "#9c83ff",
    "#65e6c4",
    "#ffffff"
];

for (let i = 0; i < 20; i++) {
    const pieza = document.createElement("div");

    pieza.classList.add("confeti");

    pieza.style.left = `${Math.random() * 100}%`;

    pieza.style.background =
        coloresConfeti[
            Math.floor(Math.random() * coloresConfeti.length)
        ];

    pieza.style.animationDuration =
        `${5 + Math.random() * 8}s`;

    pieza.style.animationDelay =
        `${-Math.random() * 12}s`;

    pieza.style.width = `${4 + Math.random() * 6}px`;
    pieza.style.height = `${7 + Math.random() * 9}px`;

    contenedorConfeti.appendChild(pieza);
}

// =====================================
// 3. GENERAR ESTRELLAS
// =====================================

const contenedorEstrellas = document.getElementById("estrellas");

for (let i = 0; i < 8; i++) {
    const estrella = document.createElement("span");

    estrella.classList.add("estrella");
    estrella.textContent = Math.random() > 0.5 ? "✦" : "✧";

    estrella.style.left = `${Math.random() * 100}%`;
    estrella.style.top = `${Math.random() * 100}%`;

    estrella.style.fontSize =
        `${10 + Math.random() * 13}px`;

    estrella.style.animationDelay =
        `${Math.random() * 3}s`;

    contenedorEstrellas.appendChild(estrella);
}

// =====================================
// 4. MOSTRAR U OCULTAR CONTRASEÑA
// =====================================



/* =========================================
   5. FLUJO DE LA DEDICATORIA
========================================= */

const formulario = document.getElementById("formulario");
const campoContrasena = document.getElementById("contrasena");
const mensaje = document.getElementById("mensaje");

const panelContrasena = document.getElementById("panel");
const bienvenida = document.getElementById("bienvenida");
const contenidoDesbloqueado = document.getElementById(
    "contenidoDesbloqueado"
);

// Corazón y progreso
const corazonInteractivo = document.getElementById(
    "corazonInteractivo"
);

const rellenoRecorte = document.getElementById("rellenoRecorte");
const progresoCorazon = document.getElementById("progresoCorazon");
const progresoVisual = document.getElementById("progresoVisual");
const mensajeCorazon = document.getElementById("mensajeCorazon");

// Contraseña 

const obtenerContrasena = () =>
    String.fromCharCode(108, 111, 118, 101, 121, 111, 117);

// Número de toques necesarios
const TOQUES_NECESARIOS = 4;

let toquesCorazon = 0;
let dedicatoriaDesbloqueada = false;

// Mostrar u ocultar la contraseña
const botonMostrar = document.getElementById("mostrarContrasena");

if (botonMostrar && campoContrasena) {
    botonMostrar.addEventListener("click", () => {
        const estaOculta = campoContrasena.type === "password";

        campoContrasena.type = estaOculta ? "text" : "password";

        botonMostrar.textContent = estaOculta ? "🙈" : "👁️";

        botonMostrar.setAttribute(
            "aria-label",
            estaOculta ? "Ocultar contraseña" : "Mostrar contraseña"
        );
    });
}


/* =========================================
   5.1 COMPROBAR CONTRASEÑA
========================================= */


formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

if (campoContrasena.value === obtenerContrasena()) {
            // Mostrar exclusivamente la etapa de bienvenida
        panelContrasena.hidden = true;
        bienvenida.hidden = false;
        contenidoDesbloqueado.hidden = true;

        // Reiniciar el corazón
        toquesCorazon = 0;
        dedicatoriaDesbloqueada = false;
        corazonInteractivo.disabled = false;

        actualizarCorazon();

        bienvenida.scrollIntoView({
            behavior: "auto",
            block: "center"
        });
    } else {
        mensaje.textContent =
            "Esa no es la contraseña correcta 💗";

        campoContrasena.value = "";
        campoContrasena.focus();
    }
});



/* =========================================
   5.2 INTERACCIÓN CON EL CORAZÓN
========================================= */

corazonInteractivo.addEventListener("click", () => {
    // Evitar sumar toques una vez desbloqueada la página
    if (dedicatoriaDesbloqueada) {
        return;
    }

    toquesCorazon = Math.min(
        toquesCorazon + 1,
        TOQUES_NECESARIOS
    );

    actualizarCorazon();

    if (toquesCorazon === TOQUES_NECESARIOS) {
        desbloquearDedicatoria();
    }
});


/* =========================================
   5.3 ACTUALIZAR EL RELLENO
========================================= */


function actualizarCorazon() {
    const porcentaje =
        toquesCorazon / TOQUES_NECESARIOS;

    const alturaAnterior =
        90 * ((toquesCorazon - 1) / TOQUES_NECESARIOS);

    const alturaNueva =
        90 * porcentaje;

    const yAnterior =
        90 - alturaAnterior;

    const yNuevo =
        90 - alturaNueva;

    const animarY = document.getElementById("animarY");
    const animarAltura = document.getElementById("animarAltura");

    // Animar la posición vertical del relleno
    animarY.setAttribute("from", yAnterior);
    animarY.setAttribute("to", yNuevo);

    // Animar la altura del relleno
    animarAltura.setAttribute("from", alturaAnterior);
    animarAltura.setAttribute("to", alturaNueva);

    // Ejecutar las animaciones SVG
    animarY.beginElement();
    animarAltura.beginElement();

    // Actualizar la barra de progreso
    progresoVisual.style.width = `${porcentaje * 100}%`;

    // Actualizar el contador
    progresoCorazon.textContent =
        `${toquesCorazon} de ${TOQUES_NECESARIOS} toques ❤️`;

    const mensajes = [
        "Toca el corazón para llenarlo de amor. 💗",
        "Sigue la linea. ❤️",
        "Cada vez falta menos para la sorpresa. 💕",
        "¡Una vez más. 💖",
        "¡Corazón completo! Tu sorpresa te espera. ❤️"
    ];

    mensajeCorazon.textContent = mensajes[toquesCorazon];

    corazonInteractivo.setAttribute(
        "aria-label",
        `Corazón con ${toquesCorazon} de ${TOQUES_NECESARIOS} toques`
    );
}






/* =========================================
   5.4 MOSTRAR LA FOTOGRAFÍA
========================================= */

function desbloquearDedicatoria() {
    dedicatoriaDesbloqueada = true;
    corazonInteractivo.disabled = true;

    setTimeout(() => {
        // Ocultar la pantalla del corazón
        bienvenida.hidden = true;

        // Evitar conflictos con las animaciones anteriores
        contenidoDesbloqueado.classList.remove(
            "animar-aparicion",
            "apareciendo"
        );

        // Mostrar el contenido, todavía transparente
        contenidoDesbloqueado.hidden = false;
        contenidoDesbloqueado.style.opacity = "0";

        // Iniciar la animación cuando el navegador lo haya dibujado
        requestAnimationFrame(() => {
            contenidoDesbloqueado.animate(
                [
                    { opacity: 0 },
                    { opacity: 1 }
                ],
                {
                    duration: 1400,
                    easing: "ease-out",
                    fill: "forwards"
                }
            );
        });

    }, 500);
}





/* =========================================
   ETAPA 4: REPRODUCTOR MUSICAL
========================================= */

(() => {
    "use strict";

    const audio = document.getElementById("audioCancion");
    const botonPlay = document.getElementById("botonReproducir");
    const botonReiniciar = document.getElementById("reiniciarCancion");
    const botonSilencio = document.getElementById("silenciarCancion");
    const barra = document.getElementById("barraCancion");
    const tiempoActual = document.getElementById("tiempoActual");
    const duracion = document.getElementById("duracionCancion");
    const vinilo = document.getElementById("viniloContenedor");

    // Comprobar que existen todos los elementos
    if (
        !audio || !botonPlay || !botonReiniciar ||
        !botonSilencio || !barra || !tiempoActual ||
        !duracion || !vinilo
    ) {
        console.error("Faltan elementos del reproductor en el HTML.");
        return;
    }

    /* =========================================
       FORMATEAR TIEMPO
    ========================================= */

    function formatearTiempo(segundos) {
        if (!Number.isFinite(segundos) || segundos < 0) {
            return "0:00";
        }

        const minutos = Math.floor(segundos / 60);
        const resto = Math.floor(segundos % 60);

        return `${minutos}:${String(resto).padStart(2, "0")}`;
    }

    /* =========================================
       ACTUALIZAR INTERFAZ
    ========================================= */

    function actualizarBoton() {
        const reproduciendo = !audio.paused && !audio.ended;

        botonPlay.textContent = reproduciendo ? "Ⅱ" : "▶";

        botonPlay.setAttribute(
            "aria-label",
            reproduciendo ? "Pausar canción" : "Reproducir canción"
        );

        vinilo.classList.toggle("reproduciendo", reproduciendo);
    }

    /* =========================================
       REPRODUCIR CANCIÓN
    ========================================= */

    async function reproducirCancion() {
        try {
            audio.muted = false;
            audio.volume = 1;

            await audio.play();

            console.log("Canción reproduciéndose correctamente.");
        } catch (error) {
            // Puede ocurrir si otra acción interrumpe la reproducción.
            if (error.name === "AbortError") {
                console.warn(
                    "La reproducción fue interrumpida antes de comenzar."
                );
            } else {
                console.error("Error al reproducir:", error);
                console.error("Código del error:", audio.error?.code);
                console.error("Ruta del audio:", audio.currentSrc);
            }
        }

        actualizarBoton();
    }

    /* =========================================
       BOTÓN REPRODUCIR / PAUSAR
    ========================================= */

    botonPlay.addEventListener("click", () => {
        if (audio.paused) {
            reproducirCancion();
        } else {
            audio.pause();
        }

        actualizarBoton();
    });

    /* =========================================
       BOTÓN REINICIAR
    ========================================= */

    botonReiniciar.addEventListener("click", async () => {
        try {
            audio.currentTime = 0;

            if (audio.paused) {
                await reproducirCancion();
            }
        } catch (error) {
            console.error("No se pudo reiniciar la canción:", error);
        }

        actualizarBoton();
    });

    /* =========================================
       BOTÓN SILENCIO
    ========================================= */

    botonSilencio.addEventListener("click", () => {
        audio.muted = !audio.muted;

        botonSilencio.textContent = audio.muted ? "×" : "♫";

        botonSilencio.setAttribute(
            "aria-label",
            audio.muted ? "Activar sonido" : "Silenciar canción"
        );
    });

    /* =========================================
       CARGA DE DURACIÓN
    ========================================= */

    audio.addEventListener("loadedmetadata", () => {
        duracion.textContent = formatearTiempo(audio.duration);
        barra.value = "0";

        console.log("Duración de la canción:", audio.duration);
    });

    /* =========================================
       ACTUALIZAR PROGRESO
    ========================================= */

    audio.addEventListener("timeupdate", () => {
        tiempoActual.textContent = formatearTiempo(audio.currentTime);

        if (Number.isFinite(audio.duration) && audio.duration > 0) {
            barra.value = String(
                (audio.currentTime / audio.duration) * 100
            );
        }
    });

    /* =========================================
       MOVER BARRA DE PROGRESO
    ========================================= */

    barra.addEventListener("input", () => {
        if (Number.isFinite(audio.duration) && audio.duration > 0) {
            audio.currentTime =
                (Number(barra.value) / 100) * audio.duration;
        }
    });

    /* =========================================
       EVENTOS DEL AUDIO
    ========================================= */

    audio.addEventListener("play", actualizarBoton);
    audio.addEventListener("pause", actualizarBoton);

    audio.addEventListener("ended", () => {
        actualizarBoton();
        barra.value = "0";
    });

    audio.addEventListener("canplay", () => {
        console.log("Audio listo para reproducirse:", audio.currentSrc);
    });

    audio.addEventListener("error", () => {
        console.error(
            "No se pudo cargar el audio.",
            audio.error?.code,
            audio.error?.message
        );

        console.error("Ruta del audio:", audio.currentSrc);
    });

    // Estado inicial
    actualizarBoton();

    audio.addEventListener("play", () => {
    console.log("EVENTO: play");
});

audio.addEventListener("playing", () => {
    console.log("EVENTO: playing");
});

audio.addEventListener("pause", () => {
    console.log("EVENTO: pause");
});

audio.addEventListener("waiting", () => {
    console.log("EVENTO: waiting");
});

audio.addEventListener("error", () => {
    console.error("EVENTO: error", audio.error);
});
})();


/* =========================================
   ETAPA 6.1: INTERACCIÓN DE LA CARTA
========================================= */

(() => {
    const carta = document.getElementById("contenidoCarta");
    const botonAbrir = document.getElementById("abrirCarta");
    const botonCerrar = document.getElementById("cerrarCarta");

    if (!carta || !botonAbrir || !botonCerrar) {
        console.error("No se encontraron los elementos de la carta.");
        return;
    }

    botonAbrir.addEventListener("click", () => {
        carta.hidden = false;

        // Reiniciar la animación de apertura
        carta.classList.remove("abierta");
        void carta.offsetWidth;
        carta.classList.add("abierta");

        botonAbrir.setAttribute("aria-expanded", "true");
    });

    botonCerrar.addEventListener("click", () => {
        carta.hidden = true;
        carta.classList.remove("abierta");

        botonAbrir.setAttribute("aria-expanded", "false");
    });
})();


/* =========================================
   ETAPA 8.1: LÓGICA DEL CUESTIONARIO
========================================= */

(() => {
    "use strict";

    const botonComenzar = document.getElementById("comenzarCuestionario");
    const modal = document.getElementById("modalCuestionario");
    const botonCerrar = document.getElementById("cerrarCuestionario");
    const progreso = document.getElementById("progresoCuestionario");
    const barra = document.getElementById("barraProgresoCuestionario");
    const relleno = document.getElementById("rellenoProgresoCuestionario");
    const titulo = document.getElementById("tituloModalCuestionario");
    const texto = document.getElementById("textoAfirmacion");
    const opciones = document.getElementById("opcionesCuestionario");
    const mensaje = document.getElementById("mensajeRespuesta");

    if (
        !botonComenzar || !modal || !botonCerrar ||
        !progreso || !barra || !relleno || !titulo ||
        !texto || !opciones || !mensaje
    ) {
        console.error("Faltan elementos del cuestionario en el HTML.");
        return;
    }

    const afirmaciones = [
        "Karina es una hermana increíble y merece todo lo bonito de la vida. 💗",
        "Karina tiene una forma especial de hacer que los momentos sean inolvidables. ✨",
        "Karina merece que la consientan, la abracen y la hagan sonreír muchísimo. 🥰",
        "Karina es mucho más importante para su familia de lo que a veces imagina. ❤️",
        "Karina tienes una gran hermana . 💌"
    ];

    let indice = 0;
    let botonAnterior = null;

    function mostrarAfirmacion() {
        const numero = indice + 1;

        progreso.textContent = `AFIRMACIÓN ${numero} DE ${afirmaciones.length}`;
        barra.setAttribute("aria-valuenow", String(numero));
        relleno.style.width = `${(numero / afirmaciones.length) * 100}%`;

        titulo.textContent = "Karina, ¿sabías que...?";

        texto.textContent = afirmaciones[indice];
        mensaje.textContent = "";

        opciones.replaceChildren();

        const respuestas = [
            "¡Es verdad! 💗",
            "¡Claro que sí! 🥰"
        ];

        respuestas.forEach(respuesta => {
            const boton = document.createElement("button");
            boton.type = "button";
            boton.className = "respuesta-cuestionario";
            boton.textContent = respuesta;

            boton.addEventListener("click", () => {
                if (indice < afirmaciones.length - 1) {
                    indice++;
                    mostrarAfirmacion();
                } else {
                    mostrarFinal();
                }
            });

            opciones.appendChild(boton);
        });
    }

    function abrirModal() {
        indice = 0;
        modal.hidden = false;
        document.body.style.overflow = "hidden";
        botonAnterior = document.activeElement;
        mostrarAfirmacion();

        const primeraRespuesta = opciones.querySelector("button");
        if (primeraRespuesta) primeraRespuesta.focus();
    }

    function cerrarModal() {
        modal.hidden = true;
        document.body.style.overflow = "";

        if (botonAnterior && typeof botonAnterior.focus === "function") {
            botonAnterior.focus();
        }
    }

    function mostrarFinal() {
        progreso.textContent = "¡CUESTIONARIO COMPLETADO!";
        barra.setAttribute("aria-valuenow", "5");
        relleno.style.width = "100%";

        titulo.textContent = "¡Lo sabíamos, Karina! 💖";

        texto.textContent =
            "Esta pequeña sorpresa es para recordarte cuánto te queremos. " +
            "Gracias por ser tú. ¡Nunca olvides lo especial que eres!";

        mensaje.textContent = "Con mucho cariño, alejandra. ❤️";

        opciones.replaceChildren();

        const botonFinal = document.createElement("button");
        botonFinal.type = "button";
        botonFinal.className = "respuesta-cuestionario";
        botonFinal.textContent = "Cerrar con amor 💗";
        botonFinal.addEventListener("click", cerrarModal);

        opciones.appendChild(botonFinal);
        botonFinal.focus();
    }

    botonComenzar.addEventListener("click", abrirModal);
    botonCerrar.addEventListener("click", cerrarModal);

    modal.addEventListener("click", evento => {
        if (evento.target === modal) {
            cerrarModal();
        }
    });

    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape" && !modal.hidden) {
            cerrarModal();
        }
    });
})();


/* =========================================
   ETAPA 9.1: MENSAJE FINAL PARA KARINA
========================================= */

(() => {
    "use strict";

    const botonAbrir = document.getElementById("botonDespedida");
    const modal = document.getElementById("modalDespedida");
    const botonCerrar = document.getElementById("cerrarDespedida");
    const botonFinalizar = document.getElementById("botonFinalizar");
    const mensaje = document.getElementById("mensajeDespedida");
    const firma = modal?.querySelector(".firma-final");

    if (
        !botonAbrir ||
        !modal ||
        !botonCerrar ||
        !botonFinalizar ||
        !mensaje ||
        !firma
    ) {
        console.error("Faltan elementos de la despedida en el HTML.");
        return;
    }

    const textoFinal =
        "Gracias por leer y espero sepas que te quiero más de lo que tú puedas pensar, hermana. ❤️";

    let temporizadorEscritura = null;
    let indiceLetra = 0;

    const movimientoReducido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Escribir el mensaje letra por letra
    function escribirMensaje() {
        clearTimeout(temporizadorEscritura);

        indiceLetra = 0;
        mensaje.textContent = "";
        mensaje.classList.add("escribiendo");
        firma.classList.remove("visible");
        botonFinalizar.hidden = true;

        if (movimientoReducido) {
            mensaje.textContent = textoFinal;
            terminarEscritura();
            return;
        }

        function escribirSiguienteLetra() {
            if (modal.hidden) return;

            mensaje.textContent = textoFinal.slice(0, indiceLetra);
            indiceLetra++;

            if (indiceLetra <= textoFinal.length) {
                temporizadorEscritura = setTimeout(
                    escribirSiguienteLetra,
                    48
                );
            } else {
                terminarEscritura();
            }
        }

        escribirSiguienteLetra();
    }

    function terminarEscritura() {
        clearTimeout(temporizadorEscritura);
        mensaje.classList.remove("escribiendo");
        firma.classList.add("visible");
        botonFinalizar.hidden = false;
    }

    // Abrir la despedida
    function abrirModal() {
        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        escribirMensaje();
        botonCerrar.focus();
    }

    // Regresar completamente a la contraseña
    function regresarAlInicio() {
        clearTimeout(temporizadorEscritura);

        // Cerrar la ventana de despedida
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
        modal.classList.remove("activo");

        // Restaurar el desplazamiento de la página
        document.body.style.overflow = "";

        // Ocultar todo el contenido desbloqueado
        contenidoDesbloqueado.hidden = true;
        contenidoDesbloqueado.style.opacity = "";

        // Ocultar la bienvenida y el corazón
        bienvenida.hidden = true;

        // Mostrar el panel de contraseña
        panelContrasena.hidden = false;

        // Limpiar el campo y el mensaje de error
        campoContrasena.value = "";
        mensaje.textContent = "";

        // Regresar al principio
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        // Enfocar el campo de contraseña
        setTimeout(() => {
            campoContrasena.focus();
        }, 300);
    }

    // Eventos de los botones
    botonAbrir.addEventListener("click", abrirModal);

    botonCerrar.addEventListener("click", regresarAlInicio);

    botonFinalizar.addEventListener("click", regresarAlInicio);

    // Clic fuera de la ventana: también regresa a la contraseña
    modal.addEventListener("click", evento => {
        if (evento.target === modal) {
            regresarAlInicio();
        }
    });

    // Escape: también regresa a la contraseña
    document.addEventListener("keydown", evento => {
        if (evento.key === "Escape" && !modal.hidden) {
            regresarAlInicio();
        }
    });
})();


/* =========================================
   ETAPA 6: ANIMACIONES AL HACER SCROLL
========================================= */

(() => {
    "use strict";

    const elementos = document.querySelectorAll(
        "#contenidoDesbloqueado .zona-fotografia, " +
        "#contenidoDesbloqueado #etapaMusical, " +
        "#contenidoDesbloqueado #etapaGaleria, " +
        "#contenidoDesbloqueado #etapaCarta, " +
        "#contenidoDesbloqueado #etapaNotas, " +
        "#contenidoDesbloqueado #etapaCuestionario, " +
        "#contenidoDesbloqueado #etapaSalida" 
    );

    if (!elementos.length) {
        console.warn("No se encontraron elementos para el scroll reveal.");
        return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const observador = new IntersectionObserver((entradas, observer) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observer.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: "0px 0px -25px 0px"
    });

    elementos.forEach((elemento, indice) => {
        elemento.classList.add("revelar-scroll");

        elemento.classList.remove(
            "retraso-1",
            "retraso-2",
            "retraso-3"
        );

        if (indice % 3 === 0) {
            elemento.classList.add("retraso-1");
        } else if (indice % 3 === 1) {
            elemento.classList.add("retraso-2");
        } else {
            elemento.classList.add("retraso-3");
        }

        observador.observe(elemento);
    });
})();


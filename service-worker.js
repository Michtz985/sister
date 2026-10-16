
"use strict";

const CACHE_VERSION = "dedicatoria-v2";

const ARCHIVOS_BASE = [
    "./",
    "./index.html",
    "./manifest.json",

    // JavaScript
    "./script.js",

    // CSS
    "./estilos.css",
    "./estilos_corazon.css",
    "./estilos_contenido.css",
    "./estilos_music.css",
    "./estilos_galeria.css",
    "./estilos_carta.css",
    "./estilos_notas.css",
    "./estilos_cuestionario.css",
    "./estilos_salida.css",

    // Iconos PWA
    "./img/icon-192.png",
    "./img/icon-512.png",

    // Imágenes: ejemplo
    "./img/amigos.png",
    "./img/crosset.png",
    "./img/espejo.png",
    "./img/family.png",
    "./img/linda.png",
    "./img/paisaje.png",
    "./img/sani.png",
    "./img/selfie.png",
    "./img/sisters.png",
    "./img/vestido.png",
// Audios: ejemplos según las rutas de tu proyecto
    "./audio/audio.ogg",
    "./audio/superstar.mp3"
];

self.addEventListener("install", (evento) => {
    evento.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => cache.addAll(ARCHIVOS_BASE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", (evento) => {
    evento.waitUntil(
        caches.keys()
            .then((nombres) =>
                Promise.all(
                    nombres
                        .filter((nombre) =>
                            nombre.startsWith("dedicatoria-") &&
                            nombre !== CACHE_VERSION
                        )
                        .map((nombre) => caches.delete(nombre))
                )
            )
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (evento) => {
    const solicitud = evento.request;

    if (
        solicitud.method !== "GET" ||
        new URL(solicitud.url).origin !== self.location.origin
    ) {
        return;
    }

    evento.respondWith(
        caches.match(solicitud)
            .then((respuestaCache) => {
                if (respuestaCache) {
                    return respuestaCache;
                }

                return fetch(solicitud).then((respuesta) => {
                    if (
                        respuesta.ok &&
                        respuesta.type === "basic"
                    ) {
                        const copia = respuesta.clone();

                        caches.open(CACHE_VERSION)
                            .then((cache) => cache.put(solicitud, copia));

                    }

                    return respuesta;
                });
            })
            .catch(() => {
                if (solicitud.mode === "navigate") {
                    return caches.match("./index.html");
                }

                return Response.error();
            })
    );
});

const imagenes = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6IV_62_q5QBydzwRnk1z1e1lg6KOLh-M8QhBc9d01FMfdS2gqBsztufA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-jqF5JPZVf3ij0FJe4aKsGiOuehoPpJjVhYi89DzyCCtVNsRQ_pFfkzo&s=10",
    ".https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDOn71tVmGlffdz_8WQDzf5he_7zeTCyx7km_07Qczgq0M1toesIqXu-cE&s=10"
];
let indice = 0;
let autoplay; // para poder pausar/reiniciar el intervalo

const imagen = document.getElementById("imagen");
const btnanterior = document.getElementById("anterior");
const btnsiguiente = document.getElementById("siguiente");
const dotsContainer = document.getElementById("dots"); // opcional, ver HTML abajo

function mostrarImagenes() {
    imagen.style.opacity = 0;
    setTimeout(() => {
        imagen.src = imagenes[indice];
        imagen.style.opacity = 1;
        actualizarDots();
    }, 250);
}

function siguiente() {
    indice = (indice + 1) % imagenes.length; // más limpio que el if
    mostrarImagenes();
}

function anterior() {
    indice = (indice - 1 + imagenes.length) % imagenes.length; // evita el bug de índices negativos
    mostrarImagenes();
}

function iniciarAutoplay() {
    autoplay = setInterval(siguiente, 3000);
}

function reiniciarAutoplay() {
    clearInterval(autoplay);
    iniciarAutoplay();
}

btnsiguiente.addEventListener("click", () => {
    siguiente();
    reiniciarAutoplay(); // así no "compite" con el autoplay
});

btnanterior.addEventListener("click", () => {
    anterior(); // <-- aquí estaba el bug: faltaban los "()"
    reiniciarAutoplay();
});

// Dots indicadores (opcional pero muy intuitivo)
function crearDots() {
    if (!dotsContainer) return;
    imagenes.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.addEventListener("click", () => {
            indice = i;
            mostrarImagenes();
            reiniciarAutoplay();
        });
        dotsContainer.appendChild(dot);
    });
}

function actualizarDots() {
    if (!dotsContainer) return;
    document.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("activo", i === indice);
    });
}

crearDots();
mostrarImagenes();
iniciarAutoplay();

var map = L.map('mapa-ninhue').setView([-36.3965, -72.3972], 16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Hacienda
var marcadorCunadeprat = L.marker([-36.394461290718084, -72.42930562380398]).addTo(map);
marcadorCunadeprat.bindPopup("<b>Hacienda San Agustín de Puñual</b>");

// Casona
var marcadorCasona = L.marker([-36.391128271143614, -72.39969241420155]).addTo(map);
marcadorCasona.bindPopup("<b>Casona Dr. David Benavente</b>");

// Humedal
var marcadorHumedal = L.marker([-36.40403663494504, -72.3970290890021]).addTo(map);
marcadorHumedal.bindPopup("<b>Humedal</b>");

// Bike Park
var marcadorMTB = L.marker([-36.38356372475324, -72.39478237138748]).addTo(map);
marcadorMTB.bindPopup("<b>Bike Park Ninhue</b>");

// Plaza
var marcadorPlaza = L.marker([-36.393720817593525, -72.39741109460272]).addTo(map);
marcadorPlaza.bindPopup("<b>Plaza de Ninhue</b>");

// Parque
var marcadorParque = L.marker([-36.40323751432372, -72.39926761592073]).addTo(map);
marcadorParque.bindPopup("<b>Parque Ramadero</b>");
// ============================================================
// CARRUSEL — DOTS
// ============================================================
const track = document.querySelector('.carousel-track');
const dotsContainer = document.querySelector('.dots');

// Esperar a que el DOM esté listo para contar los eventos
const eventos = document.querySelectorAll('.evento');

eventos.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// Sincronizar dots al hacer scroll en el carrusel
track.addEventListener('scroll', () => {
  const index = Math.round(track.scrollLeft / track.clientWidth);
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) dots[index].classList.add('active');
});

// Hacer los dots clickeables para navegar
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    track.scrollTo({ left: track.clientWidth * i, behavior: 'smooth' });
  });
});

// ============================================================
// REPRODUCTOR DE AUDIO
// ============================================================
const audio    = document.getElementById("audio");
const btn      = document.getElementById("playBtn");
const cover    = document.getElementById("cover");
const progress = document.getElementById("progress");
const current  = document.getElementById("current");
const duration = document.getElementById("duration");
const line     = document.getElementById("line");

/* PLAY / PAUSE */
function togglePlay() {
  if (audio.paused) {
    audio.play();
    btn.innerHTML = "❚❚";
    cover.parentElement.classList.add("spin");   // gira el .vinyl, no la imagen sola
  } else {
    audio.pause();
    btn.innerHTML = "▶";
    cover.parentElement.classList.remove("spin");
  }
}

/* DURACIÓN AL CARGAR */
audio.addEventListener('loadedmetadata', () => {
  duration.textContent = formatTime(audio.duration);
});

/* ACTUALIZAR PROGRESO Y LETRA */
audio.addEventListener('timeupdate', () => {
  if (!isNaN(audio.duration) && audio.duration > 0) {
    progress.value = (audio.currentTime / audio.duration) * 100;
  }
  current.textContent = formatTime(audio.currentTime);
  updateLyrics(audio.currentTime);
});

/* ARRASTRAR LA BARRA DE PROGRESO */
progress.addEventListener('input', () => {
  if (!isNaN(audio.duration)) {
    audio.currentTime = (progress.value / 100) * audio.duration;
  }
});

/* AL TERMINAR LA CANCIÓN, RESETEAR */
audio.addEventListener('ended', () => {
  btn.innerHTML = "▶";
  cover.parentElement.classList.remove("spin");
  progress.value = 0;
  current.textContent = "0:00";
  currentIndex = -1;
  line.textContent = "♪ ... ♪";
  line.style.opacity = 1;
  line.style.transform = "translateY(0)";
});

/* FORMATO mm:ss */
function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return m + ":" + (s < 10 ? "0" + s : s);
}

// ============================================================
// LETRA SINCRONIZADA
// ============================================================
const lyrics = [
  { time: 1,   text: "💞 TE AMO MI AMORCITO 💕" },
  { time: 12,  text: "♪ Green was the color of the grass ♪" },
  { time: 13,  text: "♪ Where I used to read ♪" },
  { time: 15,  text: "♪ At Centennial Park ♪" },
  { time: 17,  text: "♪ I used to think ♪" },
  { time: 18,  text: "♪ I would meet somebody there ♪" },
  { time: 23,  text: "♪ Teal was the color of your shirt ♪" },
  { time: 25,  text: "♪ When you were sixteen ♪" },
  { time: 26,  text: "♪ At the yogurt shop ♪" },
  { time: 29,  text: "♪ You used to work at ♪" },
  { time: 30,  text: "♪ To make a little money ♪" },
  { time: 35,  text: "♪ Time, curious time ♪" },
  { time: 37,  text: "♪ Gave me no compasses, gave me no signs ♪" },
  { time: 40,  text: "♪ Were there clues I didn't see? ♪" },
  { time: 47,  text: "♪ And isn't it just so pretty to think ♪" },
  { time: 51,  text: "♪ All along there was some ♪" },
  { time: 54,  text: "🪡 Invisible string 🪡" },
  { time: 57,  text: "💝 Tying you to me? 💝" },
  { time: 63,  text: "♪ Ooh-ooh-ooh-ooh ♪" },
  { time: 69,  text: "♪ Of the song in the cab ♪" },
  { time: 70,  text: "♪ Bad was the blood ♪" },
  { time: 72,  text: "♪ On your first trip to L.A. ♪" },
  { time: 75,  text: "♪ You ate at my favorite spot for dinner ♪" },
  { time: 81,  text: "♪ Bold was the waitress ♪" },
  { time: 82,  text: "♪ On our three-year trip ♪" },
  { time: 83,  text: "♪ Getting lunch down by the lakes ♪" },
  { time: 86,  text: "♪ She said I looked like ♪" },
  { time: 88,  text: "♪ An American singer ♪" },
  { time: 92,  text: "♪ Time, mystical time ♪" },
  { time: 94,  text: "♪ Cutting me open, then healing me fine ♪" },
  { time: 97,  text: "♪ Were there clues I didn't see? ♪" },
  { time: 104, text: "♪ And isn't it just so pretty to think ♪" },
  { time: 108, text: "♪ All along there was some ♪" },
  { time: 111, text: "🪡 Invisible string 🪡" },
  { time: 115, text: "💝 Tying you to me? 💝" },
  { time: 121, text: "♪ Ooh-ooh-ooh-ooh ♪" },
  { time: 125, text: "♪ A string that pulled me ♪" },
  { time: 128, text: "♪ Out of all the wrong arms ♪" },
  { time: 130, text: "♪ Right into that dive bar ♪" },
  { time: 134, text: "♪ Something wrapped all of my ♪" },
  { time: 136, text: "♪ Past mistakes in barbed wire ♪" },
  { time: 139, text: "♪ Chains around my demons ♪" },
  { time: 142, text: "♪ Wool to brave the seasons ♪" },
  { time: 146, text: "♪ One single thread of gold ♪" },
  { time: 149, text: "♪ Tied me to you ♪" },
  { time: 156, text: "♪ Cold was the steel ♪" },
  { time: 157, text: "♪ Of my axe to grind ♪" },
  { time: 158, text: "♪ For the boys who broke my heart ♪" },
  { time: 161, text: "♪ Now I send their babies presents ♪" },
  { time: 167, text: "♪ Gold was the color of the leaves ♪" },
  { time: 169, text: "♪ When I showed you ♪" },
  { time: 170, text: "♪ Around Centennial Park ♪" },
  { time: 172, text: "♪ Hell was the journey ♪" },
  { time: 174, text: "♪ But it brought me heaven ♪" },
  { time: 178, text: "♪ Time, wondrous time ♪" },
  { time: 180, text: "♪ Gave me the blues and then ♪" },
  { time: 182, text: "♪ Purple-pink skies ♪" },
  { time: 184, text: "♪ And it's cool ♪" },
  { time: 185, text: "♪ Baby, with me ♪" },
  { time: 190, text: "♪ And isn't it just so pretty to think ♪" },
  { time: 194, text: "♪ All along there was some ♪" },
  { time: 197, text: "🪡 Invisible string 🪡" },
  { time: 201, text: "💝 Tying you to me? 💝" },
  { time: 207, text: "♪ Ooh-ooh-ooh-ooh ♪" },
  { time: 213, text: "♪ Me.. ♪" },
  { time: 219, text: "♪ Ooh-ooh-ooh-ooh ♪" },
  { time: 224, text: "♪ (ah-ah-ah) ♪" },
  { time: 230, text: "♪ (ah-ah-ah) ♪" },
];

let currentIndex = -1;

function updateLyrics(time) {
  for (let i = lyrics.length - 1; i >= 0; i--) {
    if (time >= lyrics[i].time) {
      if (currentIndex !== i) {
        currentIndex = i;
        line.style.opacity = 0;
        line.style.transform = "translateY(10px)";
        setTimeout(() => {
          line.textContent = lyrics[i].text;
          line.style.opacity = 1;
          line.style.transform = "translateY(0)";
        }, 200);
      }
      return;
    }
  }
}

audio.addEventListener('play', () => {
  currentIndex = -1;
  line.textContent = "♪ ... ♪";
  line.style.opacity = 1;
  line.style.transform = "translateY(0)";
});

// ============================================================
// CONTADOR DE DÍAS
// ============================================================
const inicio = new Date("2025-12-10T00:00:00");

function actualizarContador() {
  const ahora = new Date();
  const diff  = ahora - inicio;
  const dias  = Math.floor(diff / (1000 * 60 * 60 * 24));
  document.getElementById("contador").textContent = `Llevamos ${dias} días juntitos 💞`;
}

actualizarContador();                   // mostrar de inmediato
setInterval(actualizarContador, 1000);  // actualizar cada segundo

// ============================================================
// CARTAS EMOCIONALES
// ============================================================
function mostrarCarta(tipo) {
  const textos = {
    triste:  "Si estás triste, aquí estoy para ti siempre ❤️",
    feliz:   "Tu felicidad también es la mía 💕",
    extrañes: "Yo también te extraño siempre 😔💖"
  };
  const el = document.getElementById("cartaTexto");
  el.style.opacity = 0;
  setTimeout(() => {
    el.textContent = textos[tipo] || "";
    el.style.opacity = 1;
  }, 200);
}

// ============================================================
// BOTÓN QUE HUYE
// ============================================================
const noBtn = document.getElementById("no");

noBtn.addEventListener('mouseover', () => {
  const maxX = window.innerWidth  - noBtn.offsetWidth  - 10;
  const maxY = window.innerHeight - noBtn.offsetHeight - 10;
  noBtn.style.position = "fixed";
  noBtn.style.left     = Math.max(0, Math.random() * maxX) + "px";
  noBtn.style.top      = Math.max(0, Math.random() * maxY) + "px";
  noBtn.style.zIndex   = "9999";
});

// Para móvil: también huir al tocar
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  const maxX = window.innerWidth  - noBtn.offsetWidth  - 10;
  const maxY = window.innerHeight - noBtn.offsetHeight - 10;
  noBtn.style.position = "fixed";
  noBtn.style.left     = Math.max(0, Math.random() * maxX) + "px";
  noBtn.style.top      = Math.max(0, Math.random() * maxY) + "px";
  noBtn.style.zIndex   = "9999";
}, { passive: false });

// ============================================================
// BOTÓN SÍ
// ============================================================
const siBtn = document.getElementById("si");
siBtn.addEventListener('click', () => {
  alert("Yo sabía 😌💖");
});

// ============================================================
// SORPRESA FINAL
// ============================================================
function sorpresa() {
  const msg = document.getElementById("sorpresaMensaje");
  msg.style.display = "block";
  msg.style.animation = "fadeIn 0.6s ease forwards";
}

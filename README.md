# Something About Linda 💗
## Guía completa para personalizar y publicar tu página

---

## 📁 Estructura de archivos
```
something-about-linda/
├── index.html      ← estructura de todas las escenas
├── style.css       ← estilos y animaciones
├── script.js       ← lógica y transiciones
├── music.mp3       ← pon aquí el audio (Something About Us)
├── tu-video.mp4    ← pon aquí tu video especial
└── fotos/          ← (opcional) carpeta con tus fotos
```

---

## 🎵 Agregar la música (Something About Us – Daft Punk)

1. Descarga el mp3 de la canción (YouTube to MP3, Spotify downloader, etc.)
2. Renómbrala exactamente: **`music.mp3`**
3. Ponla en la misma carpeta que `index.html`
4. ¡Listo! Se reproducirá automáticamente al tocar la pantalla.

---

## 🎬 Agregar tu video especial

1. Ten listo tu video en formato `.mp4`
2. Renómbralo como desees (ejemplo: `para-linda.mp4`)
3. En `index.html`, busca esta línea:
   ```html
   <source src="tu-video-aqui.mp4" type="video/mp4" />
   ```
4. Cambia `tu-video-aqui.mp4` por el nombre de tu archivo.
5. En `script.js`, busca:
   ```js
   if (!videoEl.src || videoEl.src.includes("tu-video-aqui"))
   ```
   Cambia `"tu-video-aqui"` por el nombre de tu archivo.

---

## 📷 Agregar tus fotos (Escena 8)

En `index.html`, encuentra los bloques `.polaroid`. Cada uno tiene:
```html
<div class="polaroid-img placeholder-img">
  <span>📷</span>
  <p>foto 1</p>
</div>
<p class="polaroid-caption">[ tu caption aquí ]</p>
```

### Para poner una foto real:
Reemplaza el bloque `placeholder-img` por:
```html
<div class="polaroid-img">
  <img src="fotos/foto1.jpg" alt="descripción" />
</div>
```
Y cambia el caption por algo lindo y personalizado.

---

## ✏️ Personalizar los textos

### Carta #1 (Escena 3)
En `index.html`, busca `<div class="letter-paper"` y edita el `<p>` dentro.

### Carta final / Propuesta (Escena 11)
Busca `<div class="p-letter-body">` y edita los párrafos. Es el texto más importante — hazlo tuyo completamente.

### Acertijos
Busca cada `riddle-q` para editar la pregunta, y los `riddle-opt` para cambiar las opciones.
El botón con `data-correct="true"` es el correcto.

---

## 🚀 Subir a GitHub Pages (paso a paso)

### Paso 1 — Crea el repositorio
1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en **"New repository"**
3. Nombre sugerido: `something-about-linda`
4. Ponlo en **Public** (necesario para Pages gratuito)
5. Haz clic en **"Create repository"**

### Paso 2 — Sube los archivos
**Opción A — Desde la web (más fácil):**
1. En tu repositorio nuevo, haz clic en **"uploading an existing file"**
2. Arrastra todos tus archivos (`index.html`, `style.css`, `script.js`, `music.mp3`, tu video, tus fotos)
3. Escribe un mensaje de commit como `"Primer commit 💗"`
4. Haz clic en **"Commit changes"**

**Opción B — Con Git:**
```bash
git init
git add .
git commit -m "Something About Linda 💗"
git remote add origin https://github.com/TU_USUARIO/something-about-linda.git
git push -u origin main
```

### Paso 3 — Activar GitHub Pages
1. En tu repositorio, ve a **Settings** → **Pages** (menú lateral)
2. En **"Source"**, selecciona **"Deploy from a branch"**
3. Selecciona la rama **main** y carpeta **/ (root)**
4. Haz clic en **Save**
5. Espera 1-2 minutos

### Paso 4 — Tu URL
Tu página estará en:
```
https://TU_USUARIO.github.io/something-about-linda/
```

Comparte esa URL con Linda 💗

---

## ⚠️ Nota sobre archivos grandes
GitHub tiene límite de 100MB por archivo. Si tu video es muy grande:
- Comprímelo con [HandBrake](https://handbrake.fr/) (gratis)
- O súbelo a Google Drive/YouTube como "no listado" y usa un iframe

Para video de YouTube/Drive, en `index.html` reemplaza el `<video>` por:
```html
<iframe
  src="https://www.youtube.com/embed/TU_VIDEO_ID?autoplay=0"
  frameborder="0"
  allowfullscreen
  style="width:100%;aspect-ratio:16/9;">
</iframe>
```

---

## 💗 Secuencia de escenas

| # | Escena | Descripción |
|---|--------|-------------|
| 0 | Intro | Disco de vinilo girando, título, estrellas |
| 1 | Universo | Planeta B-612 flotante con tulipán |
| 2 | Acertijo 1 | Coca-Cola Zero 🥤 |
| 3 | Carta 1 | Sobre con carta de amor |
| 4 | Pájaro de papel | La carta vuela como origami |
| 5 | Acertijo 2 | Daft Punk 🎵 |
| 6 | Daft Punk | Casco dorado, visor neón, letras de "Something About Us" |
| 7 | Arthur Morgan | Diálogo con la monjita 🤠 |
| 8 | Fotos | Polaroids con tus fotos especiales |
| 9 | Acertijo 3 | El Principito / La frase del zorro 🦊 |
| 10 | Video | Tu video especial para ella |
| 11 | Propuesta | Carta final + botón "¿Quieres ser mi novia?" 💗 |

---

¡Mucho éxito! Que ella diga que sí 🌷

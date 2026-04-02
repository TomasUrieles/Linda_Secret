# Something About Linda v2 💗
## Guía completa de personalización y publicación

---

## 📁 Archivos que necesitas subir a GitHub

```
📁 tu-repositorio/
├── index.html          ← no tocar (estructura)
├── style.css           ← no tocar (estilos)
├── script.js           ← editar para personalizar
├── music.mp3           ← "Something About Us" - Daft Punk
├── tu-video.mp4        ← tu video especial para ella
└── fotos/
    ├── foto1.jpg
    ├── foto2.jpg
    ├── foto3.jpg
    ├── foto4.jpg
    ├── foto5.jpg
    └── foto6.jpg
```

---

## 🗺️ Mapa de las 16 escenas

| # | Escena | Qué contiene |
|---|--------|-------------|
| 0 | Intro | Vinilo grande girando con "Something About Linda" en el centro |
| 1 | Universo | Planeta B-612 con tulipán flotante, texto de introducción |
| 2 | Acertijo 1 | Coca-Cola Zero 🥤 |
| 3 | Carta I | "Quién eres" — carta sobre su fuerza y su historia |
| 4 | Pájaro de origami | La carta vuela y la lleva a un nuevo planeta |
| 5 | Seraphine | Escena de cosplay, pétalos y notas musicales |
| 6 | Acertijo 2 | Daft Punk 🎵 |
| 7 | Daft Punk | Dos cascos animados, letras de "Something About Us" |
| 8 | Arthur Morgan | Diálogo con la monjita, línea por línea |
| 9 | Gastronomía | Plato animado, sueño de la cocina mexicana |
| 10 | Carta II | "Lo que admiro" — carta sobre su talento |
| 11 | Acertijo 3 | El Principito / frase del zorro 🦊 |
| 12 | Fotos | 6 polaroids — cada una abre una carta personalizada |
| 13 | Mensaje secreto | 6 cartas con palabras que forman un mensaje |
| 14 | Video | Tu video especial para ella |
| 15 | Propuesta | Carta final + pregunta + botón "No" que huye |

---

## ✏️ Cómo personalizar

### 1. Las cartas de las fotos (Escena 12)
En `script.js`, busca `const PHOTO_DATA = {` y edita cada entrada:
```js
p1: {
  img: "fotos/foto1.jpg",       // ruta a tu foto
  tag: "✦ Carta — El día que...", // título de la carta
  body: "Aquí va el texto que escribes tú sobre esta foto y lo que significa."
},
```
Repite para p2, p3, p4, p5, p6.

### 2. El mensaje secreto (Escena 13)
Las 6 cartas forman la frase: **"Quiero ser parte de tu mundo."**
Si quieres cambiarla, en `index.html` edita `data-word` en cada `.secret-env`:
```html
<div class="secret-env" data-word="TU_PALABRA" data-order="1">
```
Y edita también el `<p class="se-title">` y `<p class="se-body">` de cada carta.

### 3. Las cartas de sobre (Escenas 3 y 10)
En `index.html` busca `<div class="letter-open"` y edita los `<p>` dentro.

### 4. La carta final (Escena 15)
En `index.html` busca `<div class="prop-body">` y reescribe los párrafos con tus propias palabras.

### 5. El caption de cada polaroid
En `index.html`, busca los `.pol-cap` y reemplaza `[ caption ]` con texto real.

---

## 🎵 Agregar la música

1. Descarga "Something About Us - Daft Punk" en mp3
2. Nómbralo exactamente: **`music.mp3`**
3. Ponlo en la misma carpeta que `index.html`

---

## 🎬 Agregar el video

1. Renombra tu video a lo que quieras (ej: `para-linda.mp4`)
2. En `index.html`, busca:
   ```html
   <source src="tu-video-aqui.mp4" type="video/mp4" />
   ```
   Cámbialo por tu nombre de archivo.

3. En `script.js`, busca:
   ```js
   if (!videoEl.currentSrc || videoEl.currentSrc.includes("tu-video-aqui"))
   ```
   Cambia `"tu-video-aqui"` por tu nombre de archivo.

---

## 📷 Agregar tus fotos

Para reemplazar un placeholder, en `index.html` encuentra el polaroid correspondiente:
```html
<!-- ANTES -->
<div class="pol-img placeholder"><span>📷</span><small>foto 1</small></div>

<!-- DESPUÉS -->
<div class="pol-img">
  <img src="fotos/foto1.jpg" alt="Linda" />
</div>
```

---

## 🚀 Publicar en GitHub Pages

### Paso 1 — Repositorio
1. Ve a github.com → New repository
2. Nombre: `something-about-linda` (o el que quieras)
3. Visibilidad: **Public**
4. Clic en "Create repository"

### Paso 2 — Subir archivos
1. En tu repo, clic en **"uploading an existing file"**
2. Arrastra: `index.html`, `style.css`, `script.js`, `music.mp3`, video, y carpeta `fotos/`
3. Commit: "Something About Linda 💗"

### Paso 3 — Activar Pages
1. Settings → Pages (menú lateral)
2. Source: "Deploy from a branch"
3. Branch: **main**, carpeta: **/ (root)**
4. Save → espera 2 minutos

### Tu URL:
```
https://TU_USUARIO.github.io/something-about-linda/
```

---

## ⚠️ Video muy pesado

Si el video es >50MB, mejor:
1. Súbelo a YouTube como **"No listado"**
2. En `index.html` reemplaza el `<video>` por:
```html
<iframe
  src="https://www.youtube.com/embed/ID_DEL_VIDEO"
  frameborder="0" allowfullscreen
  style="width:100%;aspect-ratio:16/9;">
</iframe>
```

---

¡Mucho ánimo! Va a decir que sí 🌷💗

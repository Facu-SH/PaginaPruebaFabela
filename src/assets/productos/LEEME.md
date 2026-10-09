# Fotos de producto

Dejá acá la foto de un producto con su **slug** como nombre de archivo y el sitio la usa en lugar del dibujo.
No hace falta tocar código: alcanza con recompilar (`npm run build`).

- `mayonesa.jpg`, `ketchup.jpg`, `mostaza.jpg`, `salsa-golf.jpg`
- `azucar.jpg`, `edulcorante.jpg`
- `mermeladas.jpg`, `mermelada-surtida.jpg`
- `queso-crema.jpg`, `manteca.jpg`
- `galletitas.jpg`, `vainillas.jpg`, `tostadas.jpg`

Sirven `.jpg`, `.png`, `.webp` o `.avif`. Para reemplazar una foto, pisá el archivo.
`mermeladas.jpg` va con los cuatro sabores juntos: reemplaza a los cuatro potecitos dibujados.
Las fotos de grupo por familia van en `src/assets/categorias/`. Lista de tomas y prompts: `docs/fotos/`.
Los slugs están en `src/data/productos.ts`. Cómo tienen que ser las fotos: `docs/diseno.md` → "Dirección de fotografía".

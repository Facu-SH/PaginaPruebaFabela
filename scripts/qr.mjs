#!/usr/bin/env node
// Genera el QR de la lista de precios impresa: lleva a <site>/lista/ (site de astro.config.mjs,
// https://dpi-arg.com.ar). Corrección de errores Q (aguanta ~25 % del código manchado o doblado)
// y margen blanco de 4 módulos alrededor, como pide la norma.
//
//   npm run qr
//
// Salida, en docs/qr/:
//   lista-qr.svg             el código solo, en vector (para la imprenta o para Word/Illustrator)
//   lista-qr.png             el código solo, 2048 × 2048 px
//   lista-qr-imprimir.pdf    tarjeta de 80 × 110 mm con el logo y "Escaneá y escribile a Diego por WhatsApp"
//   lista-qr-imprimir.png    la misma tarjeta a 300 dpi

import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import QRCode from 'qrcode';
import config from '../astro.config.mjs';
import { abrirPlantilla, conPlantillas, raiz } from './plantillas.mjs';

const destino = new URL('/lista/', config.site ?? 'https://dpi-arg.com.ar').href;
const dir = join(raiz, 'docs/qr');
mkdirSync(dir, { recursive: true });

const opciones = { errorCorrectionLevel: 'Q', margin: 4, color: { dark: '#000000', light: '#ffffff' } };
const kb = (f) => `${Math.round(statSync(f).size / 1024)} KB`;
const listo = (f, extra = '') => console.log(`✓ ${relative(raiz, f)}  ${extra}${kb(f)}`);

// 1. El código solo
const qr = QRCode.create(destino, { errorCorrectionLevel: opciones.errorCorrectionLevel });
console.log(`QR → ${destino} (versión ${qr.version}, ${qr.modules.size} × ${qr.modules.size} módulos, corrección ${opciones.errorCorrectionLevel})`);

const svg = join(dir, 'lista-qr.svg');
writeFileSync(svg, await QRCode.toString(destino, { ...opciones, type: 'svg' }));
listo(svg);

const png = join(dir, 'lista-qr.png');
await QRCode.toFile(png, destino, { ...opciones, type: 'png', width: 2048 });
listo(png, '2048 × 2048 px · ');

// 2. La tarjeta para imprimir (plantilla qr-lista, que usa el SVG de arriba)
await conPlantillas(async ({ navegador, origen }) => {
  // 80 mm = 302,4 px CSS; a 300 dpi son 945 px (factor 300 / 96).
  const contexto = await navegador.newContext({ viewport: { width: 303, height: 416 }, deviceScaleFactor: 300 / 96 });
  const pagina = await abrirPlantilla(contexto, origen, 'qr-lista');

  const pdf = join(dir, 'lista-qr-imprimir.pdf');
  await pagina.pdf({ path: pdf, width: '80mm', height: '110mm', printBackground: true, pageRanges: '1' });
  listo(pdf, '80 × 110 mm · ');

  const tarjeta = join(dir, 'lista-qr-imprimir.png');
  await pagina.locator('[data-lienzo]').screenshot({ path: tarjeta, type: 'png' });
  listo(tarjeta, '300 dpi · ');
  await contexto.close();
});

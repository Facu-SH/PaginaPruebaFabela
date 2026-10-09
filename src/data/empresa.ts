// Datos de la empresa. Para cambiar un dato, editá la línea correspondiente.
// Los marcados con (S) son supuestos provisorios: ver docs/pendientes.md.
import type { Empresa } from './types';

export const empresa: Empresa = {
  razonSocial: 'Productos Individuales SRL',
  nombreComercial: 'DPI',
  desde: 2001,
  direccion: {
    calle: 'Bernardo de Irigoyen 877',
    localidad: 'Florida',
    partido: 'Vicente López',
    provincia: 'Buenos Aires',
    pais: 'AR',
  },
  telefono: '+54 11 4730-4423',
  email: 'ventas@dpi-arg.com.ar', // (S) en los sobres impresos figura también contacto@dpi-arg.com.ar
  whatsapp: {
    numero: '5491100000000', // (S) placeholder: reemplazar por el número real (solo dígitos, con 549)
    numeroVisible: '11 0000-0000', // (S) cómo se muestra el número en pantalla
    atiende: 'Diego', // (S)
  },
  dominio: 'https://dpi-arg.com.ar',
  instagram: null, // (S) completar con la URL si existe
  googleMaps: null, // (S) completar con el link al perfil de Google Maps
  clientesPublicables: 200, // (S) confirmar si se puede publicar "más de 200 clientes"; null = no mostrar
};

/** Años en el rubro, calculado. */
export const aniosEnElRubro = (hoy = new Date()) => hoy.getFullYear() - empresa.desde;

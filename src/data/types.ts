// Tipos de los datos del negocio. Los datos viven en los otros archivos de esta carpeta.

export type Dia = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo';

export interface Empresa {
  razonSocial: string;
  nombreComercial: string;
  /** Año de inicio de actividad. */
  desde: number;
  direccion: {
    calle: string;
    localidad: string;
    partido: string;
    provincia: string;
    codigoPostal?: string;
    pais: string;
    /** Coordenadas para el JSON-LD y el mapa (opcional). */
    geo?: { lat: number; lng: number };
  };
  /** Teléfono fijo, tal como se muestra. */
  telefono: string;
  email: string;
  whatsapp: {
    /** Solo dígitos, con código de país, sin "+" (formato wa.me). */
    numero: string;
    /** Cómo se muestra el número en pantalla. */
    numeroVisible: string;
    /** Quién contesta. */
    atiende: string;
  };
  dominio: string;
  instagram: string | null;
  googleMaps: string | null;
  /** Cantidad aproximada de clientes, para publicar como "más de N". null = no publicar. */
  clientesPublicables: number | null;
}

export interface Horario {
  zonaHoraria: string;
  dias: Dia[];
  /** "HH:MM" en hora de Buenos Aires. */
  abre: string;
  cierra: string;
  /** Fechas "AAAA-MM-DD" en las que no se atiende. */
  feriados: string[];
  retiroEnDeposito: boolean;
}

export interface ZonaEntrega {
  /** Identificador para links y selectores. */
  id: string;
  zona: string;
  /** Aclaración corta de qué abarca. */
  detalle?: string;
  /** Días de reparto. Vacío = a coordinar. */
  dias: Dia[] | 'habiles' | 'consultar';
  plazo?: string;
  pedidoMinimo: string;
}

export interface Pagos {
  facturacion: string[];
  medios: string[];
  instituciones: string;
}

export type CategoriaSlug = 'aderezos' | 'endulzantes' | 'mermeladas' | 'lacteos' | 'galletitas-y-tostadas';

export interface Categoria {
  slug: CategoriaSlug;
  nombre: string;
  /** Una línea concreta: qué es y para qué se usa. */
  bajada: string;
  /** Envase típico de la categoría (sirve para ilustrar). */
  envase: 'sobre' | 'sobre-papel' | 'pote' | 'paquete';
  /** Requiere cadena de frío. */
  frio?: boolean;
}

export interface Producto {
  slug: string;
  nombre: string;
  categoria: CategoriaSlug;
  /** Marca o "DPI" para la línea propia. */
  marca?: string;
  /** Sabores o variantes. */
  variantes?: string[];
  /** Los más vendidos. */
  masVendido?: boolean;
  nota?: string;
  /** Campos opcionales para cuando estén los datos. */
  gramaje?: string;
  unidadesPorCaja?: number;
  /** Ruta de la foto dentro de src/assets/ (cuando exista). */
  foto?: string;
}

export interface Marca {
  slug: string;
  nombre: string;
  propia?: boolean;
  url?: string;
}

export interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
  /** Tema, para agruparlas en /preguntas-frecuentes/ (opcional). */
  grupo?: 'pedidos' | 'pagos' | 'productos';
}

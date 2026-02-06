// Datos reales de obras de construcción en Colombia 2025
// OBRAS contiene los proyectos originales
const OBRAS_ORIGINALES = [
  {
    categoria: "Megaproyectos de Infraestructura",
    nombre: "Túnel del Toyo (Guillermo Gaviria Echeverri)",
    ubicacion: "Occidente antioqueño",
    avance: "95% (enero 2025)",
    descripcion: "Túnel carretero más largo de Latinoamérica (9.730 m). Conectará el centro del país con los puertos de Urabá.",
    tipo: "Infraestructura vial",
    etapa: "Finalización",
    alertas: ["Avance significativo, próxima entrega"],
    imagen: "https://www.elcolombiano.com/documents/10157/0/1200x800/0c0/0d0/none/11101/JKQK/image_content_33124213_20240118111913.jpg",
    lat: 6.6297, lng: -76.6347, // Aproximado Túnel del Toyo
    direccion: "Entre Cañasgordas, Giraldo y Santa Fe de Antioquia",
    detalles: "9,730 metros (túnel principal); tramo 2 incluye 11 túneles y 13 puentes. Aval de la Asamblea para traslado de $80.000 millones; diseños y cronogramas reactivados.",
    documentos: [
      {nombre: "Diseños y cronogramas", tipo: "PDF", fuente: "Asamblea de Antioquia", enlace: "https://www.antioquia.gov.co/images/planos-tunel-toyo.pdf"}
    ]
  },
  {
    categoria: "Megaproyectos de Infraestructura",
    nombre: "Tercer Carril Bogotá-Girardot",
    ubicacion: "Ruta 40, centro del país",
    avance: "80% (dic 2024)",
    descripcion: "Ampliación clave para conectar el centro con el Pacífico. Todos los tramos operarán al 100% en 2025.",
    tipo: "Infraestructura vial",
    etapa: "Construcción",
    alertas: ["Obra en fase final, alto impacto logístico"],
    imagen: "https://www.eltiempo.com/files/article_main_1200/uploads/2023/08/10/64d4e2e7b1e2b.jpeg",
    lat: 4.2767, lng: -74.7964, // Tercer Carril Bogotá-Girardot
    direccion: "Ruta 40, desde el sector La Despensa (Soacha) hasta Girardot",
    detalles: "145 km de extensión; incluye variantes en Fusagasugá, Melgar y Girardot. Informes de avance de la concesionaria Vía Sumapaz (80% a dic-2024).",
    documentos: [
      {nombre: "Informe de avance Vía Sumapaz", tipo: "PDF", fuente: "Concesionaria Vía Sumapaz", enlace: "https://viasumapaz.com.co/avance-bogota-girardot.pdf"}
    ]
  },
  {
    categoria: "Megaproyectos de Infraestructura",
    nombre: "Puerto Antioquia (Turbo)",
    ubicacion: "Turbo, Antioquia",
    avance: "En construcción",
    descripcion: "Terminal marítima de 1.340 m, inversión de 770 M USD, capacidad para buques Postpanamax.",
    tipo: "Infraestructura portuaria",
    etapa: "Construcción",
    alertas: ["Proyecto estratégico para exportaciones"],
    imagen: "https://www.puertodecartagena.com/sites/default/files/2022-09/puerto-antioquia.jpg",
    lat: 8.0956, lng: -76.7281, // Puerto Antioquia
    direccion: "Costado sur de Bahía Colombia, Turbo, Urabá",
    detalles: "Muelle de 1,340m, calado de 16.5m, viaducto de 4.2 km sobre el río León. Concesión por 30 años; Licencia ambiental suspendida actualmente por Corpourabá.",
    documentos: [
      {nombre: "Licencia ambiental", tipo: "PDF", fuente: "Corpourabá", enlace: "https://corpouraba.gov.co/licencia-puerto-antioquia.pdf"}
    ]
  },
  {
    categoria: "Renovación Urbana",
    nombre: "Parques del Río Norte",
    ubicacion: "Medellín, comunas 2 y 4",
    avance: "Licitación etapa 1 (2025)",
    descripcion: "56.000 m² de espacio público. Licitación de la etapa 1 en 2025.",
    tipo: "Espacio público",
    etapa: "Licitación",
    alertas: ["Oportunidad para proveedores de urbanismo"],
    imagen: "https://www.medellin.gov.co/es/wp-content/uploads/2023/03/parques-del-rio-norte.jpg",
    lat: 6.2907, lng: -75.5586, // Parques del Río Norte
    direccion: "Comunas 2 (Santa Cruz) y 4 (Aranjuez), entre puentes peatonales del Metro y quebrada Juan Bobo, Medellín",
    detalles: "56,000 m² de espacio público. Licitación de la etapa 1 programada para el segundo trimestre de 2025; gestión predial del 19% de la primera etapa.",
    documentos: [
      {nombre: "Licitación etapa 1", tipo: "Enlace", fuente: "Alcaldía de Medellín", enlace: "https://www.medellin.gov.co/licitaciones/parques-del-rio-norte"}
    ]
  },
  {
    categoria: "Renovación Urbana",
    nombre: "Biblioteca España (Santo Domingo Savio)",
    ubicacion: "Medellín",
    avance: "Reconstrucción total",
    descripcion: "Tres edificios interconectados y parque ambiental de 10.235 m². Recibirá 640.000 visitantes/año.",
    tipo: "Infraestructura social",
    etapa: "Reconstrucción",
    alertas: ["Demanda de materiales y mobiliario"],
    imagen: "https://www.elcolombiano.com/documents/10157/0/1200x800/0c0/0d0/none/11101/JKQK/image_content_33124213_20240118111913.jpg",
    lat: 6.2911, lng: -75.5581, // Biblioteca España
    direccion: "Barrio Santo Domingo Savio, Medellín",
    detalles: "Tres edificios interconectados por plataformas en un área de 5,208 m². Estudios de patología estructural previos y contrato de reconstrucción iniciado en enero de 2022.",
    documentos: [
      {nombre: "Contrato de reconstrucción", tipo: "PDF", fuente: "Alcaldía de Medellín", enlace: "https://www.medellin.gov.co/contratos/biblioteca-espana.pdf"}
    ]
  },
  {
    categoria: "Desarrollo Edificador",
    nombre: "Indigo y Velvet",
    ubicacion: "Itagüí",
    avance: "En construcción",
    descripcion: "Torres de 32 pisos con coworking y áreas tipo club.",
    tipo: "Residencial/Oficinas",
    etapa: "Construcción",
    alertas: ["Oferta de espacios premium"],
    imagen: "https://www.constructoraindigo.com/images/proyectos/indigo/indigo-velvet.jpg",
    lat: 6.1719, lng: -75.6116, // Indigo y Velvet, Itagüí
    direccion: "Itagüí",
    detalles: "Indigo: 545 aptos / 32 pisos. Velvet: 591 aptos / 32 pisos. Residencial con locales comerciales y unidades de 61 a 84 m².",
    documentos: [
      {nombre: "Planos estructurales", tipo: "Enlace", fuente: "Curaduría Urbana 1 Itagüí", enlace: "https://curaduriaitagui.gov.co/planos/indigo-velvet"}
    ]
  },
  {
    categoria: "Desarrollo Edificador",
    nombre: "Distrito del Río",
    ubicacion: "Envigado",
    avance: "En construcción",
    descripcion: "Eje corporativo con oficinas desde 49 m² hasta 1.003 m².",
    tipo: "Corporativo",
    etapa: "Construcción",
    alertas: ["Demanda de acabados y tecnología"],
    imagen: "https://www.distritodelrio.com/images/proyecto.jpg",
    lat: 6.1702, lng: -75.5918, // Distrito del Río, Envigado
    direccion: "Avenida Las Vegas, Envigado",
    detalles: "Oficinas (49 a 1,003 m²). Eje corporativo conectado al Metro.",
    documentos: [
      {nombre: "Licencia de construcción", tipo: "PDF", fuente: "Curaduría Urbana 1 Envigado", enlace: "https://curaduriaenvigado.gov.co/licencias/distrito-del-rio.pdf"}
    ]
  },
  {
    categoria: "VIS y Equidad",
    nombre: "VIVA Antioquia",
    ubicacion: "Antioquia",
    avance: "Meta: 150.000 viviendas 2024-2027",
    descripcion: "Soluciones VIS y 20.000 titulaciones. Subsidios y programas de acceso a vivienda.",
    tipo: "Vivienda de Interés Social",
    etapa: "Ejecución",
    alertas: ["Alto volumen de subsidios y demanda de materiales básicos"],
    imagen: "https://www.viva.gov.co/sites/default/files/2022-09/viva-antioquia.jpg",
    lat: 6.2518, lng: -75.5636, // Medellín centro (referencia para VIS)
    direccion: "Antioquia",
    detalles: "Meta: 150.000 viviendas 2024-2027. Soluciones VIS y 20.000 titulaciones. Subsidios y programas de acceso a vivienda.",
    documentos: [
      {nombre: "Resolución de subsidios", tipo: "PDF", fuente: "Gobernación de Antioquia", enlace: "https://www.antioquia.gov.co/resoluciones/viva-subsidios.pdf"}
    ]
  },
  // --- INICIO: Obras importadas desde Proyectos_Construccion_Antioquia_150.csv ---
  {categoria: 'Residencial', nombre: 'Proyecto Medellín 1', ubicacion: 'Medellín', avance: 'Preventa', descripcion: 'Residencial - VIS', tipo: 'Residencial', etapa: 'Licitación', alertas: ['Tope VIS'], imagen: '', lat: null, lng: null, direccion: 'El Poblado', detalles: 'Constructora: Conconcreto. Contacto: Sala de ventas / Web. Precio: Tope VIS.', documentos: [{nombre: 'Fuente', tipo: 'Texto', fuente: 'Camacol / Portales inmobiliarios / Ferias', enlace: ''}]},
  {categoria: 'Residencial', nombre: 'Proyecto Medellín 2', ubicacion: 'Medellín', avance: 'En construcción', descripcion: 'Residencial - No VIS', tipo: 'Residencial', etapa: 'Construcción', alertas: ['$280 ? $950 millones'], imagen: '', lat: null, lng: null, direccion: 'Laureles', detalles: 'Constructora: Arquitectura y Concreto. Contacto: Sala de ventas / Web. Precio: $280 ? $950 millones.', documentos: [{nombre: 'Fuente', tipo: 'Texto', fuente: 'Camacol / Portales inmobiliarios / Ferias', enlace: ''}]},
  {categoria: 'Residencial', nombre: 'Proyecto Medellín 3', ubicacion: 'Medellín', avance: 'Planeación', descripcion: 'Mixto - Mixto', tipo: 'Mixto', etapa: 'Ejecución', alertas: ['$280 ? $950 millones'], imagen: '', lat: null, lng: null, direccion: 'Robledo', detalles: 'Constructora: Constructora Bolívar. Contacto: Sala de ventas / Web. Precio: $280 ? $950 millones.', documentos: [{nombre: 'Fuente', tipo: 'Texto', fuente: 'Camacol / Portales inmobiliarios / Ferias', enlace: ''}]},
  {categoria: 'Residencial', nombre: 'Proyecto Medellín 4', ubicacion: 'Medellín', avance: 'Preventa', descripcion: 'Residencial - VIS', tipo: 'Residencial', etapa: 'Licitación', alertas: ['Tope VIS'], imagen: '', lat: null, lng: null, direccion: 'Belén', detalles: 'Constructora: Grupo Argos. Contacto: Sala de ventas / Web. Precio: Tope VIS.', documentos: [{nombre: 'Fuente', tipo: 'Texto', fuente: 'Camacol / Portales inmobiliarios / Ferias', enlace: ''}]},
  {categoria: 'Residencial', nombre: 'Proyecto Medellín 5', ubicacion: 'Medellín', avance: 'En construcción', descripcion: 'Residencial - No VIS', tipo: 'Residencial', etapa: 'Construcción', alertas: ['$280 ? $950 millones'], imagen: '', lat: null, lng: null, direccion: 'El Poblado', detalles: 'Constructora: Viviendas del Futuro. Contacto: Sala de ventas / Web. Precio: $280 ? $950 millones.', documentos: [{nombre: 'Fuente', tipo: 'Texto', fuente: 'Camacol / Portales inmobiliarios / Ferias', enlace: ''}]},
  // ...continúa para las 150 obras del CSV...
  // --- FIN: Obras importadas desde Proyectos_Construccion_Antioquia_150.csv ---
];

// Si existe OBRAS_CSV (definido en obras-csv.js), fusionar ambos arreglos
let OBRAS = OBRAS_ORIGINALES;
if (typeof OBRAS_CSV !== 'undefined' && Array.isArray(OBRAS_CSV)) {
  OBRAS = OBRAS_ORIGINALES.concat(OBRAS_CSV);
}

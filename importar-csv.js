// Script para importar un archivo CSV y convertirlo a objetos compatibles con OBRAS
// Instrucciones: abre index.html en el navegador, abre la consola y ejecuta importarObrasDesdeCSV()

function importarObrasDesdeCSV() {
  // Crear input para seleccionar archivo
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.csv,text/csv';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(evt) {
      const csv = evt.target.result;
      const obras = parseCSVtoObras(csv);
      console.log('// Copia y pega este bloque en data.js dentro del arreglo OBRAS:');
      console.log(JSON.stringify(obras, null, 2));
    };
    reader.readAsText(file, 'utf-8');
  };
  input.click();
}

function parseCSVtoObras(csv) {
  // Separar líneas y encabezados
  const lines = csv.split(/\r?\n/).filter(Boolean);
  const headers = lines[0].split(';').map(h => h.trim());
  const obras = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(';');
    if (cols.length < headers.length) continue;
    // Mapear campos del CSV a la estructura de OBRAS
    obras.push({
      categoria: 'Residencial', // O ajusta según lógica
      nombre: cols[1],
      ubicacion: cols[0],
      avance: cols[4],
      descripcion: `${cols[2]} - ${cols[3]}`,
      tipo: cols[2],
      etapa: mapEstadoToEtapa(cols[4]),
      alertas: [cols[8] || ''],
      imagen: '', // Puedes agregar imágenes manualmente si tienes
      lat: null, // Puedes agregar coordenadas manualmente si tienes
      lng: null,
      direccion: cols[5],
      detalles: `Constructora: ${cols[6]}. Contacto: ${cols[7]}. Precio: ${cols[8]}.`,
      documentos: [
        {nombre: 'Fuente', tipo: 'Texto', fuente: cols[9], enlace: ''}
      ]
    });
  }
  return obras;
}

function mapEstadoToEtapa(estado) {
  // Mapea el campo Estado del CSV a la etapa usada en OBRAS
  if (/preventa/i.test(estado)) return 'Licitación';
  if (/construcci/i.test(estado)) return 'Construcción';
  if (/planeaci/i.test(estado)) return 'Ejecución';
  if (/entrega|finaliz/i.test(estado)) return 'Finalización';
  return estado;
}

// Para usar: importarObrasDesdeCSV();

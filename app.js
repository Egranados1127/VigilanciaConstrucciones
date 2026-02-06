// Vista de calendario de citas agendadas
function renderCalendario() {
  return `
    <h2 class="mb-4"><i class="fa-solid fa-calendar-days me-2"></i>Calendario de Citas Agendadas</h2>
    <div id="calendar"></div>
    <div class="mt-4">
      <button class="btn btn-secondary" onclick="showView('dashboard')"><i class="fa-solid fa-arrow-left me-2"></i>Volver al Dashboard</button>
    </div>
  `;
}

// Inicializar FullCalendar en la vista principal
function initCalendario() {
  if (!window.FullCalendar) return;
  const calendarEl = document.getElementById('calendar');
  if (!calendarEl) return;
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    events: (window.VISITAS || []).map(v => ({
      title: `${v.nombre} - ${v.obra}`,
      start: v.fecha + (v.hora ? 'T' + v.hora : ''),
      description: v.obs || '',
    })),
    eventClick: function(info) {
      const visita = info.event;
      const nombreObra = visita.title.split(' - ').slice(1).join(' - ');
      const idx = OBRAS.findIndex(o => o.nombre === nombreObra);
      let detalles = `<b>Representante:</b> ${visita.title.split(' - ')[0]}<br>`;
      detalles += `<b>Obra:</b> ${nombreObra}<br>`;
      detalles += `<b>Fecha:</b> ${visita.start.toLocaleString()}<br>`;
      detalles += `<b>Observaciones:</b> ${visita.extendedProps.description || '-'}<br>`;
      detalles += `<button class='btn btn-primary mt-2' id='verObraBtn'>Ver proyecto</button>`;
      const modalHtml = `
        <div class='modal fade' id='modalCalendario' tabindex='-1' aria-labelledby='modalCalendarioLabel' aria-hidden='true'>
          <div class='modal-dialog'>
            <div class='modal-content'>
              <div class='modal-header'>
                <h5 class='modal-title' id='modalCalendarioLabel'>Detalle de la cita</h5>
                <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Cerrar'></button>
              </div>
              <div class='modal-body'>${detalles}</div>
            </div>
          </div>
        </div>`;
      let modalDiv = document.getElementById('modal-root');
      if (!modalDiv) {
        modalDiv = document.createElement('div');
        modalDiv.id = 'modal-root';
        document.body.appendChild(modalDiv);
      }
      modalDiv.innerHTML = modalHtml;
      const modal = new bootstrap.Modal(document.getElementById('modalCalendario'));
      modal.show();
      setTimeout(() => {
        const btn = document.getElementById('verObraBtn');
        if (btn && idx >= 0) {
          btn.onclick = function() {
            modal.hide();
            showView('obra', idx);
          };
        }
      }, 300);
    }
  });
  calendar.render();
}
// Navegación de vistas
let selectedObra = 0; // índice de la obra seleccionada
function showView(view, idx = 0) {
  const main = document.getElementById('main-content');
  if (view === 'obra') selectedObra = idx;
  switch(view) {
    case 'dashboard':
      main.innerHTML = dashboardView();
      break;
    case 'alertas':
      main.innerHTML = alertasView();
      break;
    case 'obra':
      main.innerHTML = obraView(selectedObra);
      break;
    case 'config':
      main.innerHTML = configView();
      break;
    default:
      main.innerHTML = dashboardView();
  }
    if (view === 'calendario') {
      main.innerHTML = renderCalendario();
      setTimeout(() => {
        if (window.initCalendario) window.initCalendario();
      }, 100);
      return;
    }
}

// Vistas simuladas
function dashboardView() {
  const explicacion = `<div class='alert alert-info mb-4'><b>¿Cómo se realiza la búsqueda?</b><br>
    El sistema integra datos públicos, portales inmobiliarios, redes sociales y análisis de imágenes satelitales para detectar obras nuevas y en ejecución. Utiliza geolocalización, procesamiento visual y reglas de scoring para priorizar oportunidades y mostrar en el mapa las ubicaciones reales de cada proyecto. Puedes explorar las obras, ver detalles y acceder a documentos técnicos desde el dashboard y las fichas.</div>`;
  // Resumen por etapa
  const etapas = {};
  OBRAS.forEach(o => {
    etapas[o.etapa] = (etapas[o.etapa] || 0) + 1;
  });
  // Resumen de cómo se identificaron
  const fuentes = [
    "Datos públicos y licencias urbanísticas",
    "Portales inmobiliarios y clasificados",
    "Redes sociales y grupos locales",
    "Imágenes satelitales y Street View",
    "Integración con CRM y visitas comerciales"
  ];
  return `
    <h2 class="mb-4"><i class="fa-solid fa-chart-line me-2"></i>Dashboard</h2>
    ${explicacion}
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="card p-3">
          <h5 class="mb-2"><i class="fa-solid fa-building me-2"></i>Construcciones encontradas</h5>
          <div class="display-6 fw-bold">${OBRAS.length}</div>
          <ul class="mt-2 mb-0">
            ${Object.entries(etapas).map(([etapa, cant]) => `<li>${etapa}: <b>${cant}</b></li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card p-3">
          <h5 class="mb-2"><i class="fa-solid fa-search me-2"></i>¿Cómo se identificaron?</h5>
          <ul class="mb-0">
            ${fuentes.map(f => `<li>${f}</li>`).join('')}
          </ul>
          <a href="calendario.html" class="btn btn-primary mt-3"><i class="fa-solid fa-calendar-days me-2"></i>Ver calendario de citas</a>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-7">
        <div class="card p-4 mb-4">
          <h5 class="mb-3"><i class="fa-solid fa-map-location-dot me-2"></i>Mapa Interactivo</h5>
          <div id="mapa-interactivo" style="width:100%;height:300px;border-radius:8px;"></div>
          <div class="mt-3">Obras detectadas: <b>${OBRAS.length}</b></div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="card p-4 mb-4">
          <h5 class="mb-3"><i class="fa-solid fa-chart-pie me-2"></i>Obras por etapa</h5>
          <canvas id="chartEtapas" height="180"></canvas>
        </div>
      </div>
    </div>
  `;
}

function alertasView() {
  // Ordenar obras por etapa y antigüedad (simulada por orden en array)
  const ordenEtapas = ["Licitación", "Ejecución", "Construcción", "Reconstrucción", "Finalización"];
  const obrasOrdenadas = [...OBRAS].sort((a, b) => {
    const etapaA = ordenEtapas.indexOf(a.etapa);
    const etapaB = ordenEtapas.indexOf(b.etapa);
    if (etapaA !== etapaB) return etapaA - etapaB;
    return b.avance.localeCompare(a.avance); // Simula antigüedad por avance
  });
  const alertas = obrasOrdenadas.map((o, i) =>
    `<div class="card p-4 mb-3">
      <div class="d-flex align-items-center justify-content-between">
        <div>
          <b>${o.nombre}</b> <span class="badge bg-primary ms-2">${o.categoria}</span><br/>
          <span class="badge bg-info text-dark ms-2">${o.etapa}</span>
          <span class="badge bg-secondary ms-2">${o.ubicacion}</span><br/>
          <small class="text-muted">${o.alertas.join(' | ')}</small>
        </div>
        <button class="btn btn-primary" onclick="showView('obra',${OBRAS.indexOf(o)})">Ver ficha</button>
      </div>
    </div>`
  ).join('');
  return `
    <h2 class="mb-4"><i class="fa-solid fa-bell me-2"></i>Feed de Alertas</h2>
    ${alertas}
  `;
}

function obraView(idx) {
  const o = OBRAS[idx] || OBRAS[0];
  // Importar info de constructoras
  let constructora = null;
  if (o.detalles && o.detalles.includes('Constructora:')) {
    const match = o.detalles.match(/Constructora: ([^\.]+)\./);
    if (match) constructora = match[1].trim();
  }
  let info = null;
  if (window.CONSTRUCTORAS_INFO && constructora && window.CONSTRUCTORAS_INFO[constructora]) {
    info = window.CONSTRUCTORAS_INFO[constructora];
  }
  // Filtro de tipo de documento
  let tipoFiltro = window.tipoDocFiltro || 'Todos';
  const tipos = ['Todos', ...new Set((o.documentos||[]).map(d => d.tipo))];
  const docsFiltrados = (o.documentos||[]).filter(d => tipoFiltro === 'Todos' || d.tipo === tipoFiltro);
  return `
    <h2 class="mb-4"><i class="fa-solid fa-file-lines me-2"></i>Ficha de Obra</h2>
    <div class="card p-4">
      <div class="row">
        <div class="col-md-8">
          <h4>${o.nombre}</h4>
          <p><b>Categoría:</b> <span class="badge bg-primary">${o.categoria}</span></p>
          <p><b>Ubicación:</b> <a href="#" onclick="mostrarDatosUbicacion(${idx});return false;" class="text-decoration-underline">${o.ubicacion}</a></p>
          <p><b>Dirección:</b> ${o.direccion || '-'}</p>
          <p><b>Etapa:</b> <span class="badge bg-info text-dark">${o.etapa}</span></p>
          <p><b>Avance:</b> ${o.avance}</p>
          <p><b>Descripción:</b> ${o.descripcion}</p>
          <p><b>Detalles técnicos:</b> ${o.detalles || '-'}</p>
          <p><b>Alertas:</b> <span class="badge bg-warning text-dark">${o.alertas.join(' | ')}</span></p>
          <p><b>Documentos asociados:</b></p>
          <div class="mb-2">
            <label for="tipoDocFiltro" class="form-label">Filtrar por tipo:</label>
            <select id="tipoDocFiltro" class="form-select form-select-sm" style="max-width:200px;display:inline-block;" onchange="window.tipoDocFiltro=this.value;showView('obra',${idx})">
              ${tipos.map(t => `<option${t===tipoFiltro?' selected':''}>${t}</option>`).join('')}
            </select>
          </div>
          ${info && constructora ? `<div class='card border-primary bg-light p-3 mb-3'>
            <div class='d-flex align-items-center mb-2'>
              <i class='fa-solid fa-building fa-lg text-primary me-2'></i>
              <span class='fw-bold text-primary'>${constructora}</span>
            </div>
            <div><i class='fa-solid fa-location-dot me-1'></i> <b>Dirección:</b> ${info.direccion}</div>
            <div><i class='fa-solid fa-info-circle me-1'></i> <b>Detalle:</b> ${info.detalle}</div>
            <div><i class='fa-solid fa-phone me-1'></i> <b>Teléfono:</b> <span class='badge bg-success text-white'>${info.telefono}</span></div>
            <div><i class='fa-solid fa-globe me-1'></i> <b>Web:</b> <a href='${info.web}' target='_blank' class='badge bg-primary text-white text-decoration-none'>${info.web}</a></div>
          </div>` : ''}
          <ul>
            ${docsFiltrados.map(d => {
              return `<li><i class='fa-solid fa-file me-1'></i>${d.nombre} <span class='badge bg-secondary ms-2'>${d.tipo}</span> <span class='badge bg-light text-dark ms-2'>${d.fuente}</span>${d.enlace?` <a href='${d.enlace}' target='_blank' class='ms-2'><i class='fa-solid fa-arrow-up-right-from-square'></i> Ver</a>`:''}</li>`;
            }).join('') || '<li>No hay documentos</li>'}
          </ul>
          <button class="btn btn-primary mt-2" onclick="abrirModalVisita(${idx})">Asignar visita</button>
        </div>
        <div class="col-md-4">
          <div id="mapa-obra" style="width:100%;height:220px;border-radius:8px;"></div>
          <img src="${o.imagen}" alt="Obra" class="img-fluid rounded shadow-sm mt-3"/>
        </div>
      </div>
    </div>
    <div id="modal-root"></div>
    <div id="ubicacion-info"></div>
  `;
}

// Mostrar mapa de la obra en la ficha
function renderMapaObra(idx) {
  const o = OBRAS[idx] || OBRAS[0];
  if (!o.lat || !o.lng) return;
  setTimeout(() => {
    if (window.mapaObra) {
      window.mapaObra.remove();
      window.mapaObra = null;
    }
    window.mapaObra = L.map('mapa-obra').setView([o.lat, o.lng], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(window.mapaObra);
    L.marker([o.lat, o.lng]).addTo(window.mapaObra)
      .bindPopup(`<b>${o.nombre}</b><br>${o.ubicacion}`);
  }, 200);
}

// Mostrar datos de la ubicación al hacer clic
function mostrarDatosUbicacion(idx) {
  const o = OBRAS[idx] || OBRAS[0];
  const info = `<div class='alert alert-secondary mt-3'><b>Datos de la ubicación:</b><br>
    <b>Nombre:</b> ${o.nombre}<br>
    <b>Ubicación:</b> ${o.ubicacion}<br>
    <b>Dirección:</b> ${o.direccion || '-'}<br>
    <b>Lat/Lng:</b> ${o.lat}, ${o.lng}
  </div>`;
  document.getElementById('ubicacion-info').innerHTML = info;
}

function configView() {
  return `
    <h2 class="mb-4"><i class="fa-solid fa-gear me-2"></i>Configuración</h2>
    <div class="card p-4">
      <form>
        <div class="mb-3">
          <label class="form-label">Zonas cubiertas:</label>
          <input type="text" class="form-control" value="Bogotá, Medellín, Cali" />
        </div>
        <div class="mb-3">
          <label class="form-label">Notificaciones:</label>
          <select class="form-select">
            <option>Inmediatas</option>
            <option>Resumen diario</option>
          </select>
        </div>
        <div class="mb-3">
          <label class="form-label">Representantes comerciales:</label>
          <input type="text" class="form-control" value="Juan, Ana, Pedro" />
        </div>
        <button class="btn btn-primary mt-2">Guardar cambios</button>
      </form>
    </div>
  `;
}

// Mostrar vista inicial y simular gráfico
document.addEventListener('DOMContentLoaded', () => {
  showView('dashboard');
});

// Inicializar mapa cuando se muestra el dashboard o ficha de obra
const origShowViewMap = showView;
showView = function(view, idx = 0) {
  origShowViewMap(view, idx);
  if (view === 'dashboard') {
    setTimeout(() => {
      if (typeof initMap === 'function') initMap();
      loadChartJs();
    }, 100);
  }
  if (view === 'obra') {
    renderMapaObra(idx);
  }
};

// Renderizar gráfico de etapas cuando se muestra el dashboard
document.addEventListener('click', function(e) {
  if (e.target && e.target.closest('.nav-link')) {
    setTimeout(renderChart, 100);
  }
});

function renderChart() {
  const ctx = document.getElementById('chartEtapas');
  if (ctx && window.Chart) {
    // Calcular datos reales
    const etapas = {};
    OBRAS.forEach(o => {
      etapas[o.etapa] = (etapas[o.etapa] || 0) + 1;
    });
    new window.Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(etapas),
        datasets: [{
          data: Object.values(etapas),
          backgroundColor: ['#38bdf8', '#fbbf24', '#22c55e', '#a78bfa', '#f87171', '#facc15'],
        }]
      },
      options: {
        plugins: { legend: { position: 'bottom' } },
        cutout: '70%'
      }
    });
  }
}

// Cargar Chart.js dinámicamente
function loadChartJs() {
  if (!window.Chart) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    script.onload = renderChart;
    document.body.appendChild(script);
  } else {
    renderChart();
  }
}

// Detectar cuando se muestra el dashboard para cargar el gráfico
const origShowView = showView;
showView = function(view, idx = 0) {
  origShowView(view, idx);
  if (view === 'dashboard') {
    setTimeout(loadChartJs, 100);
  }
};

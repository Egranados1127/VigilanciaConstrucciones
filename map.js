// Inicialización de mapa interactivo con Leaflet
let map, markers = [];

function initMap() {
  if (map) {
    map.remove();
    map = null;
  }
  map = L.map('mapa-interactivo').setView([6.25184, -75.56359], 6); // Centro en Colombia
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
  // Agregar marcadores de obras con coordenadas conocidas
  markers = [];
  OBRAS.forEach((o, i) => {
    if (o.lat && o.lng) {
      const marker = L.marker([o.lat, o.lng]).addTo(map)
        .bindPopup(`<b>${o.nombre}</b><br>${o.ubicacion}<br><button class='btn btn-sm btn-primary' onclick='showView("obra",${i})'>Ver ficha</button>`);
      markers.push(marker);
    }
  });
}

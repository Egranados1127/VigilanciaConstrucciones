// Registro de visitas a obras
let VISITAS = JSON.parse(localStorage.getItem('VISITAS') || '[]');
window.VISITAS = VISITAS;

function abrirModalVisita(idx) {
  const o = OBRAS[idx];
  const modalHtml = `
    <div class="modal fade" id="modalVisita" tabindex="-1" aria-labelledby="modalVisitaLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalVisitaLabel">Asignar visita a: ${o.nombre}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
          </div>
          <div class="modal-body">
            <form id="formVisita">
              <div class="mb-3">
                <label class="form-label">Nombre del representante</label>
                <input type="text" class="form-control" name="nombre" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Fecha de visita</label>
                <input type="date" class="form-control" name="fecha" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Hora de visita</label>
                <input type="time" class="form-control" name="hora" required />
              </div>
              <div class="mb-3">
                <label class="form-label">Observaciones</label>
                <textarea class="form-control" name="obs"></textarea>
              </div>
              <input type="hidden" name="obra" value="${o.nombre}" />
              <button type="submit" class="btn btn-primary">Registrar visita</button>
            </form>
          </div>
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
  const modal = new bootstrap.Modal(document.getElementById('modalVisita'));
  modal.show();
  document.getElementById('formVisita').onsubmit = function(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(this).entries());
    VISITAS.push(data);
    localStorage.setItem('VISITAS', JSON.stringify(VISITAS));
    window.VISITAS = VISITAS;
    modal.hide();
    alert('Visita registrada correctamente.');
  };
}

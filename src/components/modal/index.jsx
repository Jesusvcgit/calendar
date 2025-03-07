const Modal = ({ tipo, textoEditado, setTextoEditado, onConfirm, onClose }) => {
  return (
    <div className="modal show" style={{ display: 'block' }}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{tipo === 'editar' ? 'Editar Actividad' : 'Eliminar Actividad'}</h5>
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {tipo === 'editar' ? (
              <input
                type="text"
                value={textoEditado}
                onChange={(e) => setTextoEditado(e.target.value)}
                placeholder="Escribe la nueva actividad"
                className="form-control"
              />
            ) : (
              <p>¿Estás seguro de que deseas eliminar esta actividad?</p>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={onConfirm}>
              {tipo === 'editar' ? 'Guardar cambios' : 'Eliminar'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

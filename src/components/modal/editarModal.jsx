import { useState } from "react";

const EditarModal = ({ isOpen, onClose, onConfirm }) => {
  const [nuevoTexto, setNuevoTexto] = useState("");

  if (!isOpen) return null;

  return (
    <>
      <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: "block" }}>
        <div className="modal-dialog" role="document" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={nuevoTexto}
                onChange={(e) => setNuevoTexto(e.target.value)}
                placeholder="Nuevo texto"
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={() => onConfirm(nuevoTexto)}>
                Guardar
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" style={{ pointerEvents: "none" }}></div>
    </>
  );
};

export default EditarModal;

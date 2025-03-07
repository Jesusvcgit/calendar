import './App.css';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { setHorarios, editarHorario, eliminarHorario } from './redux/horarioSlice';
import EditarModal from './components/modal/editarModal';
import EliminarModal from './components/modal/eliminarModal';

export default function App() {
  const dispatch = useDispatch();
  const horarios = useSelector((state) => state.horarios.horarios);
  const [celdasSeleccionadas, setCeldasSeleccionadas] = useState([]);
  const [modalTipo, setModalTipo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  const generarHorarios = () => {
    let horarios = [];
    let hora = 0;
    let minuto = 0;
    while (hora < 12) {
      let inicio = `${hora.toString().padStart(2, '0')}:${minuto === 0 ? '00' : '30'}`;
      let finMinuto = minuto === 0 ? 30 : 0;
      let finHora = minuto === 0 ? hora : hora + 1;
      let fin = `${finHora.toString().padStart(2, '0')}:${finMinuto === 0 ? '00' : '30'}`;
      horarios.push({
        horario: `${inicio}-${fin}`,
        actividades: diasSemana.reduce((acc, dia) => ({ ...acc, [dia]: "" }), {})
      });
      minuto = finMinuto;
      if (minuto === 0) hora++;
    }
    return horarios;
  };

  useEffect(() => {
    if (horarios.length === 0) {
      dispatch(setHorarios(generarHorarios()));
    }
  }, [dispatch, horarios.length]);

  const toggleSeleccionCelda = (horario, dia) => {
    const key = `${horario}-${dia}`;
    setCeldasSeleccionadas((prev) =>
      prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]
    );
  };

  const toggleSeleccionFila = (id) => {
    const celdasFila = diasSemana.map(dia => `${id}-${dia}`);
    const filaSeleccionada = celdasFila.every(key => celdasSeleccionadas.includes(key));

    setCeldasSeleccionadas((prev) => 
      filaSeleccionada
        ? prev.filter(key => !celdasFila.includes(key))
        : [...prev, ...celdasFila]
    );
  };

  const abrirModal = (tipo) => {
    setModalTipo(tipo);
    setModalOpen(true);
  };

  const cerrarModal = () => {
    setModalOpen(false);
  };

  const handleConfirmar = (nuevoTexto = "") => {
    if (modalTipo === "editar") {
      if (!nuevoTexto.trim()) {
        alert("El texto no puede estar vacío.");
        return;
      }
      celdasSeleccionadas.forEach((key) => {
        const partes = key.split("-");
        const horario = `${partes[0]}-${partes[1]}`;
        const dia = partes[2];
        if (!diasSemana.includes(dia)) {
          console.error("Día inválido:", dia);
          return;
        }
        dispatch(editarHorario({ horario, dia, nuevoTexto }));
      });
    } else if (modalTipo === "eliminar") {
      let horariosAfectados = {};
      celdasSeleccionadas.forEach((key) => {
        const partes = key.split("-");
        const horario = `${partes[0]}-${partes[1]}`;
        const dia = partes[2];
        if (!horariosAfectados[horario]) horariosAfectados[horario] = [];
        horariosAfectados[horario].push(dia);
      });
      Object.keys(horariosAfectados).forEach((horario) => {
        dispatch(eliminarHorario({ horario, diasAfectados: horariosAfectados[horario] }));
      });
    }
    setCeldasSeleccionadas([]);
    cerrarModal();
  };

  return (
    <div style={{ padding: "20px" }}>
      {celdasSeleccionadas.length > 0 && (
        <div style={{ marginBottom: "10px" }}>
          <button type="button" className="btn btn-primary" onClick={() => abrirModal("editar")}>Editar</button>
          <button type="button" className="btn btn-danger" onClick={() => abrirModal("eliminar")}>Eliminar</button>
        </div>
      )}

<div className="container mt-4">
    <h2 className="mb-3 text-center">Tabla de Horarios</h2>
    <div className="table-responsive">
      <table className="table table-bordered table-hover table-striped">
        <thead className="table-primary">
          <tr>
            <th>Horario</th>
            {diasSemana.map((dia) => (
              <th key={dia} className="d-none d-sm-table-cell">{dia}</th>
            ))}
            <th>Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((h) => (
            <tr key={h.horario}>
              <td className="fw-bold">{h.horario}</td>
              {diasSemana.map((dia) => (
                <td
                  key={dia}
                  onClick={() => toggleSeleccionCelda(h.horario, dia)}
                  className={`text-center d-none d-sm-table-cell ${celdasSeleccionadas.includes(`${h.horario}-${dia}`) ? "bg-danger text-white" : ""}`}
                  style={{ cursor: "pointer" }}
                >
                  {h.actividades[dia] || "-"}
                </td>
              ))}
              <td className="text-center">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => toggleSeleccionFila(h.horario)}
                >
                  Seleccionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

      {modalOpen && modalTipo === "editar" && (
        <EditarModal isOpen={modalOpen} onClose={cerrarModal} onConfirm={handleConfirmar} />
      )}

      {modalOpen && modalTipo === "eliminar" && (
        <EliminarModal isOpen={modalOpen} onClose={cerrarModal} onConfirm={handleConfirmar} />
      )}
    </div>
  );
}

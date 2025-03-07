import { createSlice } from "@reduxjs/toolkit";

const loadHorarios = () => {
  const storedData = localStorage.getItem("horarios");
  return storedData ? JSON.parse(storedData) : [];
};

const saveHorarios = (horarios) => {
  localStorage.setItem("horarios", JSON.stringify(horarios));
};

const initialState = { horarios: loadHorarios() };

const horarioSlice = createSlice({
  name: "horarios",
  initialState,
  reducers: {
    setHorarios: (state, action) => {
      state.horarios = action.payload;
      saveHorarios(state.horarios);
    },
    agregarHorario: (state, action) => {
      state.horarios.push(action.payload);
      saveHorarios(state.horarios);
    },
    editarHorario: (state, action) => {
      const { horario, dia, nuevoTexto } = action.payload;
      const index = state.horarios.findIndex((h) => h.horario === horario);

      if (index !== -1) {
        state.horarios[index].actividades[dia] = nuevoTexto;
        saveHorarios(state.horarios);
      } else {
        console.error("Horario no encontrado:", horario);
      }
    },
    eliminarHorario: (state, action) => {
      const { horario, diasAfectados } = action.payload;
      const index = state.horarios.findIndex((h) => h.horario === horario);
    
      if (index !== -1) {
        
        diasAfectados.forEach((dia) => {
          if (state.horarios[index].actividades?.[dia] !== undefined) {
            state.horarios[index].actividades[dia] = "";
          }
        });
    
        
        saveHorarios(state.horarios);
      } else {
        console.error("Horario no encontrado para eliminar:", horario);
      }
    },
  },
});

export const { setHorarios, agregarHorario, editarHorario, eliminarHorario } = horarioSlice.actions;
export default horarioSlice.reducer;

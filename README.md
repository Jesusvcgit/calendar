# Calendar

## 📌 Descripción
Calendar es una aplicación web que permite gestionar horarios de actividades de manera interactiva y dinamica. Los usuarios podrán visualizar, editar y eliminar actividades en una tabla de horarios. Los datos se almacenaran en `localStorage` permitiendo una mayor usabilidad y persistencia de los datos.

## 🚀 Características
- 📅 **Tabla de horarios dinámica**
- ✏️ **Edición de actividades.**
- ❌ **Eliminación de actividades.**
- 💾 **Persistencia de datos con `localStorage`.**
- 🎨 **Interfaz intuitiva y responsive.**

## 🛠️ Tecnologías Utilizadas
- **React**
- **Redux Toolkit** para la edición y eliminación de los datos
- **Bootstrap** para estilos y diseño responsivo

## 📂 Estructura del Proyecto
```
📂 src
 ├── 📂 components
 │   ├── modal
 │   │   ├── editarModal.js
 │   │   ├── eliminarModal.js
 │   │   ├── index.jsx
 ├── 📂 redux
 │   ├── horarioSlice.js
 ├── App.jsx
 ├── main.jsx
```

## 🏗️ Instalación y Ejecución
1. Clona este repositorio:
   ```bash
   git clone https://github.com/Jesusvcgit/calendar-project.git
   ```
2. Accede al directorio del proyecto:
   ```bash
   cd calendar-project
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Inicia la aplicación:
   ```bash
   npm run dev
   ```

## 📋 Uso
1. Selecciona una o varias celdas de una misma fila o filas distintas.
2. Usa los botones **Editar** o **Eliminar** para modificar los datos.
3. Los cambios se guardan automáticamente en `localStorage` de forma que cuando se recargue la página los datos seguirán persistiendo.

---
✍️ _Desarrollado por [Jesusvcgit](https://github.com/Jesusvcgit)_


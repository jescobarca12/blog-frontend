import { useState } from "react";
function EjemploEventos() {
  const [mensaje, setMensaje] = useState("Esperando...");

  return (
    <>
      <h2>{mensaje}</h2>
      <div
        style={{ width: "300px", height: "200px", border: "2px solid black" }}
        onClick={() => setMensaje("Cliqueaste")}
        onMouseEnter={() => setMensaje("Mouse adentro")}
        onMouseLeave={() => setMensaje("Mouse afuera")}
      ></div>
      <button
        onClick={() => setMensaje("Botón cliqueado")}
        onMouseEnter={() => setMensaje("Hover en el botón")}
      >
        CLICK
      </button>
    </>
  );
}

export default EjemploEventos;

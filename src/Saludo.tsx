interface SaludoProps {
  nombre: string;
  edad:number;
}

function Saludo({nombre,edad}: SaludoProps) {
  return <h2>¡Hola, {nombre}! Tienes {edad} años.</h2>;
}

export default Saludo;
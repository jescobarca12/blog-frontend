function Saludo() {
  const nombre = 'Jorge';
  const edad = 22;

  return (
    <div className="caja-saludo">
      <h2>¡Hola, {nombre}!</h2>
      <p>Tienes {edad} años.</p>
      <p>El próximo cumple cumples {edad + 1}.</p>
      <hr />
    </div>
  );
}

export default Saludo;

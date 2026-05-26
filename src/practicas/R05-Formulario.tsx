import { useState } from 'react';
function Formulario() {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState<number | ''>('');
  const [email, setEmail] = useState('');
  return (
    <>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <input type="number" value={edad} onChange={(e) => setEdad(Number(e.target.value))} />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <div>
        Hola {nombre}, tienes {edad} años. Tu email es {email}
      </div>
      <button
        onClick={() => {
          setNombre('');
          setEdad('');
          setEmail('');
        }}
      >
        Limpiar
      </button>
    </>
  );
}
export default Formulario;

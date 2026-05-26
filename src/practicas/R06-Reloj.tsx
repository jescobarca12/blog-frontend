import { useEffect, useState } from 'react';
function Reloj() {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setHora(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <>
      <h1>{hora.toLocaleDateString()}</h1>
      <h2>{hora.toLocaleTimeString()}</h2>
    </>
  );
}
export default Reloj;

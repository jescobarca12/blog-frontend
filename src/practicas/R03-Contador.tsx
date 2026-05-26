import { useState } from "react";

function Contador() {
  const [valor, setValor] = useState(0);

  const incrementar = () => setValor(valor + 1);
  const decrementar = () => setValor(valor - 1);
  const reset = () => setValor(0);
  return (
    <div>
      <p>Contador: {valor}</p>
      <button onClick={incrementar}>+1</button>
      <button onClick={decrementar}>-1</button>
      <button onClick={reset}>0</button>
    </div>
  );
}

export default Contador;

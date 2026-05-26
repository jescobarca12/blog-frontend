interface BotonContadorProps {
    cantidad:number;
    onIncrementar: (cantidad:number) => void;
}

function BotonContador({ onIncrementar ,cantidad}: BotonContadorProps) {
  return (
    <button onClick={() => onIncrementar(cantidad)}>+{cantidad}</button>
  );
}

export default BotonContador;
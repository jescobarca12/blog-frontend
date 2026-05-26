import { useState, useEffect } from 'react';
interface Coctel {
  idDrink: string;
  strDrinkThumb: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
}
function Cocteleria() {
  const [busqueda, setBusqueda] = useState('margarita');
  const [cocteles, setCocteles] = useState<Coctel[]>([]);
  const [Cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  async function buscarCoctel() {
    try {
      setCargando(true);
      setError(null);
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${busqueda}`,
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      if (data.drinks === null) {
        setCocteles([]);
        return;
      }
      setCocteles(data.drinks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setCargando(false);
    }
  }
  useEffect(() => {
    buscarCoctel();
  }, []);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          buscarCoctel();
        }}
      >
        <input type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>
      {Cargando && <p>cargando...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
      {!Cargando && !error && cocteles.length === 0 && (
        <p>No se encontró ningún coctel con ese nombre.</p>
      )}
      {!Cargando && !error && cocteles.length > 0 && (
        <div>
          {cocteles.map((coctel) => (
            <div key={coctel.idDrink}>
              <img src={coctel.strDrinkThumb} alt={coctel.strDrink} />
              <h3>{coctel.strDrink}</h3>
              <p>
                {coctel.strCategory } · {coctel.strAlcoholic}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default Cocteleria;

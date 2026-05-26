import { useState, useEffect } from 'react';

interface Personaje {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

function RickAndMorty() {
  const [busqueda, setBusqueda] = useState('Rick Sanchez');
  const [personajes, setPersonajes] = useState<Personaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function buscarPersonajes() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${busqueda}`);

      if (response.status === 404) {
        setPersonajes([]);
        return;
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setPersonajes(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    buscarPersonajes();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          buscarPersonajes();
        }}
      >
        <input type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Cargando...</p>}

      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

      {!loading && !error && personajes.length === 0 && (
        <p>No se encontró ningún personaje con ese nombre.</p>
      )}

      {!loading && !error && personajes.length > 0 && (
        <div>
          {personajes.map((personaje) => (
            <div key={personaje.id}>
              <img src={personaje.image} alt={personaje.name} />
              <h3>{personaje.name}</h3>
              <p>
                {personaje.status} · {personaje.species}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default RickAndMorty;

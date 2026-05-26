import { useEffect, useState } from 'react';
interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
}
function Pokemons() {
  const [pokemon, setPokemon] = useState('pikachu');
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function cargarPokemon() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = (await response.json()) as Pokemon;
      setPokemonData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    cargarPokemon();
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          cargarPokemon();
        }}
      >
        <input type="text" value={pokemon} onChange={(e) => setPokemon(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <h2>Pokemon</h2>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
      {!loading && !error && pokemonData && (
        <>
          <h1>{pokemonData.name}</h1>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          {pokemonData.types.map((type) => (
            <h2 key={type.type.name}>{type.type.name}</h2>
          ))}
        </>
      )}
    </>
  );
}
export default Pokemons;

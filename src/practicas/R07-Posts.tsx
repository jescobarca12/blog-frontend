import { useEffect, useState } from 'react';

interface Post {
  id: number;
  titulo: string;
}

function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  async function cargarPosts() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:3000/posts');

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    cargarPosts();
  }, []);

  return (
    <>
      <button onClick={cargarPosts}>Recargar</button>
      <h2>Lista de posts</h2>
      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
      {!loading && !error && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.titulo}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Posts;

import { useEffect, useState } from 'react';
import type { Post } from './types';
import { API_URL } from './config';
function BlogPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estados del formulario
  const [titulo, setTitulo] = useState<string>('');
  const [contenido, setContenido] = useState<string>('');
  const [autorId, setAutorId] = useState<number>(1);
  const token: string | null = localStorage.getItem('token');
  async function cargarPosts() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/posts`);
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      const response = await fetch(`${API_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ← clave
        },
      });
      if (!response.ok) throw new Error(`Error al eliminar: ${response.status}`);
      await cargarPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar');
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // ← clave
        },
        body: JSON.stringify({ titulo, contenido, autor_id: autorId }),
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      setTitulo('');
      setContenido('');
      setAutorId(1);

      await cargarPosts();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear');
    }
  }

  useEffect(() => {
    cargarPosts();
  }, []);

  return (
    <>
      <h2>Lista de posts</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h3>Crear nuevo post</h3>
        <div>
          <label>
            Título:{' '}
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Contenido (mín. 50 caracteres):{' '}
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              required
              rows={4}
              cols={50}
            />
          </label>
        </div>
        <button type="submit">Crear post</button>
      </form>

      {loading && <p>Cargando posts...</p>}
      {error && <p style={{ color: 'red' }}>❌ {error}</p>}

      {!loading && !error && (
        <>
          <p>Cantidad: {posts.length}</p>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <strong>{post.titulo}</strong> — {post.vistas} vistas{' '}
                <button onClick={() => handleDelete(post.id)}>🗑️ Eliminar</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default BlogPosts;

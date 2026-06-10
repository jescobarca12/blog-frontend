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
          Authorization: `Bearer ${token}`,
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
          Authorization: `Bearer ${token}`,
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
    <div className="blog">
      <section className="card post-form-card">
        <h2>Crear nuevo post</h2>
        <form className="post-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="post-titulo">Título</label>
            <input
              id="post-titulo"
              className="input"
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Título del post"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="post-contenido">Contenido</label>
            <textarea
              id="post-contenido"
              className="input textarea"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              placeholder="Escribe el contenido (mín. 50 caracteres)"
              rows={4}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Publicar post
          </button>
        </form>
      </section>

      <section className="post-list-section">
        <div className="post-list-header">
          <h2>Posts</h2>
          {!loading && !error && (
            <span className="badge">{posts.length}</span>
          )}
        </div>

        {loading && <p className="estado">Cargando posts...</p>}
        {error && <p className="auth-error">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p className="estado">Aún no hay posts. ¡Crea el primero!</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.id} className="card post-card">
                <div className="post-card-body">
                  <h3 className="post-title">{post.titulo}</h3>
                  <span className="post-meta">{post.vistas} vistas</span>
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(post.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default BlogPosts;

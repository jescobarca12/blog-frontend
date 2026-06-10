import { useState } from 'react';
import BlogPosts from './BlogPosts';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  function handleLogin(nuevoToken: string) {
    localStorage.setItem('token', nuevoToken);
    setToken(nuevoToken);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  // Sin sesión: mostrar login o registro según el estado.
  if (!token) {
    return mostrarRegistro ? (
      <RegisterForm
        onLogin={handleLogin}
        onCambiar={() => setMostrarRegistro(false)}
      />
    ) : (
      <LoginForm
        onLogin={handleLogin}
        onCambiar={() => setMostrarRegistro(true)}
      />
    );
  }

  // Con sesión: cabecera + contenido del blog.
  return (
    <div className="app">
      <header className="app-header">
        <h1>Blog</h1>
        <button className="btn btn-ghost" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </header>
      <main className="container">
        <BlogPosts />
      </main>
    </div>
  );
}

export default App;

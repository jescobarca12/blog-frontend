import { useState } from 'react';
import BlogPosts from './BlogPosts';
import LoginForm from './LoginForm';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  function handleLogin(nuevoToken: string) {
    localStorage.setItem('token', nuevoToken);
    setToken(nuevoToken);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setToken(null);
  }

  return (
    <>
      <h1>Blog</h1>

      {token ? (
        <>
          <button onClick={handleLogout}>Cerrar sesión</button>
          <BlogPosts />
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;

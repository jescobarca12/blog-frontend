import { useState } from 'react';
import { API_URL } from './config';
interface LoginFormProps {
  onLogin: (token: string) => void;
}

function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error de login');
      }

      const data = await response.json();
      onLogin(data.token);   // ← notifica al padre
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>

      <div>
        <label>
          Email:{' '}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Password:{' '}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>

      <button type="submit">Entrar</button>

      {error && <p style={{ color: 'red' }}>❌ {error}</p>}
    </form>
  );
}

export default LoginForm;
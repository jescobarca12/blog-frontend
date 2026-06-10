import { useState } from 'react';
import { API_URL } from './config';

interface RegisterFormProps {
  onLogin: (token: string) => void;
  onCambiar: () => void;
}

function RegisterForm({ onLogin, onCambiar }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nombre, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'No se pudo registrar');
      }

      const data = await response.json();
      onLogin(data.token); // queda logueado automáticamente tras registrarse
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Crear cuenta</h2>

        {error && <p className="auth-error">{error}</p>}

        <div className="form-group">
          <label htmlFor="reg-email">Email</label>
          <input
            id="reg-email"
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reg-nombre">Nombre</label>
          <input
            id="reg-nombre"
            className="input"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Tu nombre"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reg-password">Contraseña</label>
          <input
            id="reg-password"
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres"
            minLength={8}
            required
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Registrarme
        </button>

        <button className="btn-link" type="button" onClick={onCambiar}>
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;

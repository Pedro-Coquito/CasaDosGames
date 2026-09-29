import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem('isLogged', 'true');
      navigate('/');
    } else {
      alert('Preencha todos os campos!');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleLogin} style={{ padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', width: '300px' }}>
        <h2>Login do Sistema</h2>
        <div style={{ marginBottom: '1rem' }}>
          <label>E-mail:</label><br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '8px' }} placeholder="admin@email.com" />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Senha:</label><br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '8px' }} placeholder="******" />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#white', border: 'none', borderRadius: '4px' }}>Entrar</button>
      </form>
    </div>
  );
}

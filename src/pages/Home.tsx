import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLogged');
    navigate('/login');
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Bem-vindo ao Portal de Jogos Web</h1>
      <p>Este é o Checkpoint 1 do Projeto Evolutivo de Frontend.</p>
      <div style={{ margin: '30px 0', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link to="/jogos" style={{ padding: '12px 20px', backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '5px' }}>Ir para o Catálogo de Jogos</Link>
        <button onClick={handleLogout} style={{ padding: '12px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Sair (Logout)</button>
      </div>
    </div>
  );
}
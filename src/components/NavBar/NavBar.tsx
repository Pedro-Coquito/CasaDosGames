import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLogged');
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', backgroundColor: '#333', color: '#fff', fontFamily: 'sans-serif' }}>
      <h2>Portal de Jogos</h2>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
        <Link to="/jogos" style={{ color: '#fff', textDecoration: 'none' }}>Catálogo</Link>
        <button onClick={handleLogout} style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>
          Sair
        </button>
      </div>
    </nav>
  );
}
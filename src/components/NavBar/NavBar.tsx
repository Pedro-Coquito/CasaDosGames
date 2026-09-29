import { Link, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css'; 

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <nav className={styles.nav}>
      <h2>Portal de Jogos</h2>
      <div className={styles.linksContainer}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/jogos" className={styles.link}>Catálogo</Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Sair
        </button>
      </div>
    </nav>
  );
}
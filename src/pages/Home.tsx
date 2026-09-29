import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Bem-vindo ao Portal de Jogos Web</h1>
      <p className={styles.description}>Este é o Checkpoint 1 do Projeto Evolutivo de Frontend.</p>
      
      <div className={styles.actionsContainer}>
        <Link to="/jogos" className={styles.catalogLink}>
          Ir para o Catálogo de Jogos
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Sair (Logout)
        </button>
      </div>
    </div>
  );
}
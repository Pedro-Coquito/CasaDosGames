import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchGames } from '../services/api';
import type { Game } from '../types/game';
import styles from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [totalGames, setTotalGames] = useState(0);
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) setUserEmail(email);

    // Carrega os jogos do catálogo e filtra os favoritos do localStorage
    fetchGames().then(games => {
      setTotalGames(games.length);
      
      const savedFavorites: number[] = JSON.parse(localStorage.getItem('gameFavorites') || '[]');
      const favorites = games.filter(game => savedFavorites.includes(game.id));
      setFavoriteGames(favorites);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Bem-vindo ao Portal de Jogos Web</h1>
        
        {userEmail && (
          <p className={styles.welcomeUser}>Logado como: <strong>{userEmail}</strong></p>
        )}
        
        <p className={styles.description}>Este é o Checkpoint do Projeto Evolutivo de Frontend.</p>
        
        {/* Estatísticas Rápidas */}
        <div className={styles.statsContainer}>
          <div className={styles.statCard}>
            <h3>{totalGames > 0 ? totalGames : '...'}</h3>
            <p>Jogos Free-to-Play</p>
          </div>
          <div className={styles.statCard}>
            <h3>{favoriteGames.length}</h3>
            <p>Meus Favoritos</p>
          </div>
        </div>

        {/* Secção de Jogos Favoritos na Home */}
        <div className={styles.favoritesSection}>
          <h2 className={styles.sectionTitle}>⭐ Os Seus Jogos Favoritos</h2>
          
          {favoriteGames.length === 0 ? (
            <p className={styles.noFavorites}>Ainda não tens jogos favoritados. Vai ao catálogo e clica em favoritar!</p>
          ) : (
            <div className={styles.favoriteGrid}>
              {favoriteGames.slice(0, 3).map(game => (
                <div key={game.id} className={styles.miniCard}>
                  <img src={game.thumbnail} alt={game.title} />
                  <div className={styles.miniCardInfo}>
                    <h4>{game.title}</h4>
                    <Link to={`/jogos/${game.id}`} state={{ game }} className={styles.miniDetailsBtn}>
                      Ver
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Botões de Ação */}
        <div className={styles.actionsContainer}>
          <Link to="/jogos" className={styles.catalogLink}>Ir para o Catálogo</Link>
          <button onClick={handleLogout} className={styles.logoutButton}>Sair (Logout)</button>
        </div>
      </div>
    </div>
  );
}
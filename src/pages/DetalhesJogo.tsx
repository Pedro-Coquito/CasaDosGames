import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Game } from '../types/game';
import styles from './DetalhesJogo.module.css';

export default function DetalhesJogo() {
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Tenta recuperar o jogo do state ou usa uma alternativa se recarregar a página diretamente
  const game: Game | undefined = location.state?.game;

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (game) {
      const savedFavorites: number[] = JSON.parse(localStorage.getItem('gameFavorites') || '[]');
      setIsFavorite(savedFavorites.includes(game.id));
    }
  }, [game]);

  const toggleFavorite = () => {
    if (!game) return;
    const savedFavorites: number[] = JSON.parse(localStorage.getItem('gameFavorites') || '[]');
    let updatedFavorites;

    if (savedFavorites.includes(game.id)) {
      updatedFavorites = savedFavorites.filter(favId => favId !== game.id);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...savedFavorites, game.id];
      setIsFavorite(true);
    }

    localStorage.setItem('gameFavorites', JSON.stringify(updatedFavorites));
  };

  if (!game) {
    return (
      <div className={styles.container}>
        <p className={styles.errorText}>Jogo não encontrado ou dados em falta.</p>
        <button onClick={() => navigate('/jogos')} className={styles.backButton}>
          Voltar ao Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <button onClick={() => navigate(-1)} className={styles.backLink}>
            ← Voltar
          </button>
          
          <button 
            onClick={toggleFavorite} 
            className={`${styles.favoriteBtn} ${isFavorite ? styles.favorited : ''}`}
          >
            {isFavorite ? '❤️ Nos Favoritos' : '🤍 Favoritar'}
          </button>
        </div>

        <h1 className={styles.title}>{game.title}</h1>
        
        <div className={styles.imageContainer}>
          <img src={game.thumbnail} alt={game.title} className={styles.image} />
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.badgeGroup}>
            <span className={styles.badge}>Gênero: {game.genre}</span>
            <span className={styles.badge}>Plataforma: {game.platform}</span>
          </div>

          <p className={styles.description}>
            <strong>Descrição:</strong> {game.short_description}
          </p>

          <a 
            href={game.game_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.playButton}
          >
            Acessar Jogo Oficial
          </a>
        </div>
      </div>
    </div>
  );
}
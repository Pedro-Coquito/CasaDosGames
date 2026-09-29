import { useLocation, Link, useNavigate } from 'react-router-dom';
import type { Game } from '../types/game';
import styles from './DetalhesJogo.module.css';

export default function DetalhesJogo() {
  const location = useLocation();
  const navigate = useNavigate();
  const game = location.state?.game as Game;

  if (!game) {
    return (
      <div className={styles.errorContainer}>
        <p>Nenhum jogo selecionado ou dados perdidos.</p>
        <button onClick={() => navigate('/jogos')} className={styles.errorButton}>
          Voltar para a listagem
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to="/jogos" className={styles.backLink}>← Voltar para a listagem</Link>
      
      <h1 className={styles.title}>{game.title}</h1>
      
      <img src={game.thumbnail} alt={game.title} className={styles.thumbnail} />
      
      <p className={styles.paragraph}>
        <strong>Gênero:</strong> {game.genre}
      </p>
      
      <p className={styles.paragraph}>
        <strong>Plataforma:</strong> {game.platform}
      </p>
      
      <p className={styles.paragraph}>
        <strong>Descrição:</strong> {game.short_description}
      </p>
      
      <a 
        href={game.game_url} 
        target="_blank" 
        rel="noreferrer" 
        className={styles.externalButton}
      >
        Acessar Jogo Oficial
      </a>
    </div>
  );
} 
import { useLocation, Link, useNavigate } from 'react-router-dom';
import type { Game } from '../types/game';

export default function DetalhesJogo() {
  const location = useLocation();
  const navigate = useNavigate();
  const game = location.state?.game as Game;

  if (!game) {
    return (
      <div style={{ padding: '20px' }}>
        <p>Nenhum jogo selecionado ou dados perdidos.</p>
        <button onClick={() => navigate('/jogos')}>Voltar para a listagem</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <Link to="/jogos">← Voltar para a listagem</Link>
      <h1>{game.title}</h1>
      <img src={game.thumbnail} alt={game.title} style={{ width: '100%', borderRadius: '8px' }} />
      <p><strong>Gênero:</strong> {game.genre}</p>
      <p><strong>Plataforma:</strong> {game.platform}</p>
      <p><strong>Descrição:</strong> {game.short_description}</p>
      <a href={game.game_url} target="_blank" rel="noreferrer" style={{ display: 'inline-block', padding: '10px 15px', backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>Acessar Jogo Oficial</a>
    </div>
  );
}
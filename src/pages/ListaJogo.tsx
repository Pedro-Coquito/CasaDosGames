import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchGames } from '../services/api';
import type { Game } from '../types/game';
import styles from './ListaJogo.module.css';




export default function ListaJogo() {
  const [games, setGames] = useState<Game[]>([]);
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    fetchGames().then(setGames);
  }, []);

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre ? game.genre === selectedGenre : true;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/Home" className={styles.backLink}>← Voltar para Home</Link>
        <h1 className={styles.title}>Catálogo de Jogos (Free-to-Play)</h1>
      </header>

      <div className={styles.filtersContainer}>
        <input 
          type="text" 
          placeholder="Pesquisar por nome..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        
        <select 
          value={selectedGenre} 
          onChange={(e) => setSelectedGenre(e.target.value)}
          className={styles.selectInput}
        >
          <option value="">Todos os Gêneros</option>
          <option value="MMORPG">MMORPG</option>
          <option value="Shooter">Shooter</option>
          <option value="Strategy">Strategy</option>
          <option value="MOBA">MOBA</option>
        </select>
      </div>

      <div className={styles.grid}>
        {filteredGames.map(game => (
          <div key={game.id} className={styles.card}>
            <img src={game.thumbnail} alt={game.title} />
            <div className={styles.cardContent}>
              <span className={styles.genreBadge}>{game.genre}</span>
              <h3>{game.title}</h3>
              <p>{game.short_description}</p>
            </div>
            <div className={styles.cardFooter}>
              <Link to={`/jogos/${game.id}`} state={{ game }} className={styles.detailsButton}>
                Ver Detalhes
              </Link>
            </div>
          </div>

          

        ))}
      </div>
    </div>
  );
}
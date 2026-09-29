import { useEffect, useState } from 'react';
import { fetchGames } from '../services/api';
import type { Game } from '../types/game';
import { Link } from 'react-router-dom';

export default function ListaJogo() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  useEffect(() => {
    fetchGames()
      .then(data => {
        setGames(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filtragem por busca e gênero
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || game.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>Carregando jogos...</div>;
  if (error) return <div style={{ textAlign: 'center', color: 'red', padding: '50px' }}>Erro: {error}</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Catálogo de Jogos (Free-to-Play)</h1>
      <Link to="/">Voltar para Home</Link>
      
      <div style={{ margin: '20px 0', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <input 
          type="text" 
          placeholder="Pesquisar por nome..." 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          style={{ padding: '8px', width: '250px' }}
        />
        <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)} style={{ padding: '8px' }}>
          <option value="All">Todos os Gêneros</option>
          <option value="MMORPG">MMORPG</option>
          <option value="Shooter">Shooter</option>
          <option value="Action RPG">Action RPG</option>
          <option value="Strategy">Strategy</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {filteredGames.map(game => (
          <div key={game.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <img src={game.thumbnail} alt={game.title} style={{ width: '100%', borderRadius: '4px' }} />
              <h3>{game.title}</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>{game.genre}</p>
            </div>
            <Link to={`/jogos/${game.id}`} state={{ game }} style={{ textDecoration: 'none', backgroundColor: '#28a745', color: '#fff', padding: '8px', textAlign: 'center', borderRadius: '4px', marginTop: '10px' }}>Ver Detalhes</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
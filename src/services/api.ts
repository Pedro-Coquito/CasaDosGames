import type { Game } from '../types/game';

export async function fetchGames(): Promise<Game[]> {
  const response = await fetch('https://www.freetogame.com/api/games');
  if (!response.ok) {
    throw new Error('Erro ao carregar os dados da API.');
  }
  return response.json();
}
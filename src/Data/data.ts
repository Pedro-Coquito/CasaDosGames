
interface User {
  email: string;
  name: string;
}

export const MOCKED_USERS: Record<string, string> = {
  'admin@email.com': '123456',
  'usuario@email.com': 'senha123',
};
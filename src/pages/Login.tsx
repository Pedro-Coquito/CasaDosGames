import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCKED_USERS } from '../Data/data';
import styles from './Login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Preencha todos os campos!');
      return;
    }

    const savedPassword = MOCKED_USERS[email];
    if (savedPassword && savedPassword === password) {
      // Se estiver correto, salva e navega
      localStorage.setItem('isLogged', 'true');
      localStorage.setItem('userEmail', email);
      navigate('/');
    } else {
      // Se estiver errado, avisa e NÃO deixa prosseguir
      alert('E-mail ou senha inválidos!');
      return;
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2 className={styles.title}>Login do Sistema</h2>
        
        <div className={styles.inputGroup}>
          <label className={styles.label}>E-mail:</label>
          <br />
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className={styles.input} 
            placeholder="admin@email.com" 
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Senha:</label>
          <br />
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className={styles.input} 
            placeholder="******" 
          />
        </div>

        <button type="submit" className={styles.button}>
          Entrar
        </button>
      </form>
    </div>
  );
}
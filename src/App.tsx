import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import ListaJogo from './pages/ListaJogo';
import DetalhesJogo from './pages/DetalhesJogo';
import React from 'react';

// Componente simples para proteger rotas se não estiver logado
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isLogged = localStorage.getItem('isLogged') === 'true';
  return isLogged ? <>{children}</> : <Navigate to="/login" replace />;
};

export function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/jogos" element={<PrivateRoute><ListaJogo /></PrivateRoute>} />
        <Route path="/jogos/:id" element={<PrivateRoute><DetalhesJogo /></PrivateRoute>} />
      </Routes>
  );
}

export default App;
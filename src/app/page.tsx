// app/page.tsx
'use client';

import { useState } from 'react';
import api from '../utils/axios';
import { useRouter } from 'next/navigation';

const Home = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await api.post('/contraventor/login', { login, password });
      if (response.status === 200) {
        alert('Login realizado com sucesso!');
        router.push('/contraventor/');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Login de Contraventor</h1>
      <input
        type="text"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        placeholder="Login"
        className="border rounded p-2 mb-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        className="border rounded p-2 mb-2"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white rounded p-2"
      >
        Entrar
      </button>
    </div>
  );
};

export default Home;

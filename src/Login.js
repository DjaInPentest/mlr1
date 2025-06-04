import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { currentUser, login } = useAuth();
  const navigate = useNavigate();

  if (currentUser) {
    // если уже залогинен — редирект на главную
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // поиск в users
      const resp = await axios.get(
        `http://localhost:5000/users?username=${formData.username}&password=${formData.password}`
      );
      if (resp.data.length === 1) {
        const user = resp.data[0];
        login(user);
        navigate('/');
      } else {
        setError('Неверное имя пользователя или пароль.');
      }
    } catch (err) {
      console.error(err);
      setError('Ошибка сервера при авторизации.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '100px auto', fontFamily: 'Arial' }}>
      <h2>Вход</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Username:</label><br/>
          <input
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{ width: '100%', padding: 8 }}
            required
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Password:</label><br/>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', padding: 8 }}
            required
          />
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>Войти</button>
      </form>
    </div>
  );
};

export default Login;

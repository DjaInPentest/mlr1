import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const Home = () => {
  const [data, setData] = useState([]);
  const { currentUser, logout } = useAuth();

  useEffect(() => {
    axios.get("http://localhost:5000/items")
      .then(resp => setData(resp.data))
      .catch(err => console.error(err));
  }, []);

  // ДОВЕРЯЕМСЯ СЕРВЕРУ — он сам отфильтровал ваши записи
  const filtered = data;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ textAlign: 'right', marginBottom: 10 }}>
        <span>{currentUser.username} ({currentUser.role})</span>
        <button onClick={logout} style={{ marginLeft: 10 }}>Выйти</button>
      </div>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Список обращений</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {filtered.map(item => (
          <div key={item.id} style={{
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            padding: '15px',
            width: 'calc(50% - 20px)',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ marginTop: 0 }}>{item.name}</h3>
            <p><strong>Тема:</strong> {item.theme}</p>
            <p><strong>Дата:</strong> {item.date}</p>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '15px'
            }}>
              <Link to={`/detail/${item.id}`} style={{ textDecoration: 'none', color: '#4285f4', fontWeight: 'bold' }}>
                Подробнее
              </Link>
              <Link to={`/edit/${item.id}`} style={{ textDecoration: 'none', color: '#f0ad4e', fontWeight: 'bold' }}>
                Изменить
              </Link>
              <button onClick={() => {
                axios.delete(`http://localhost:5000/items/${item.id}`)
                  .then(() => setData(d => d.filter(x => x.id !== item.id)));
              }} style={{
                backgroundColor: '#d9534f',
                color: '#fff',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to="/add" style={{
          backgroundColor: '#4285f4',
          color: '#fff',
          padding: '10px 20px',
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: 'bold'
        }}>
          Добавить обращение
        </Link>
      </div>
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const DetailView = () => {
  const { id } = useParams();
  const [itemData, setItemData] = useState(null);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/items/${id}`);
        setItemData(response.data);
        console.log("Загруженное обращение:", response.data);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      }
    };
    loadItem();
  }, [id]);

  if (!itemData) {
    return <p style={{ textAlign: 'center' }}>Загрузка...</p>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Детальная информация</h1>
      
      <div style={{
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          padding: '20px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
        }}>
        <p><strong>Название:</strong> {itemData.name}</p>
        <p><strong>Тема:</strong> {itemData.theme}</p>
        <p><strong>Содержание:</strong> {itemData.content}</p>
        <p><strong>Дата:</strong> {itemData.date}</p>
        <p><strong>Заявитель:</strong> {itemData.applicant}</p>
        <p><strong>Статус:</strong> {itemData.status}</p>
        <p><strong>Приоритет:</strong> {itemData.priority}</p>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link
          to="/"
          style={{
            backgroundColor: '#4285f4',
            color: '#fff',
            padding: '8px 16px',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Вернуться к списку
        </Link>
      </div>
    </div>
  );
};
//Сегодня без анекдотов.
export default DetailView;

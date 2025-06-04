import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

const Form = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    theme: '',
    content: '',
    date: '',
    status: '',
    priority: ''
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errorsList = [];
    if (!formData.name.trim()) errorsList.push("Название обязательно для заполнения.");
    if (!formData.date.trim()) errorsList.push("Дата обязательна для заполнения.");
    return errorsList;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (errs.length) {
      setErrors(errs);
      return;
    }
    const payload = {
      ...formData,
      applicant: currentUser.username,
      ownerId: currentUser.id
    };
    axios.post("http://localhost:5000/items", payload, {
      headers: { "Content-Type": "application/json; charset=utf-8" }
    })
      .then(() => navigate('/'))
      .catch(err => console.error("Ошибка создания:", err));
  };

  return (
    <div style={{ maxWidth: 600, margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Создание нового обращения</h1>
      {errors.length > 0 && (
        <div style={{ color: 'red', marginBottom: 10 }}>
          {errors.map((e, i) => <div key={i}>{e}</div>)}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 10 }}>
          <label>Название:</label><br/>
          <input name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: 8 }}/>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Тема:</label><br/>
          <input name="theme" value={formData.theme} onChange={handleChange} style={{ width: '100%', padding: 8 }}/>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Содержание:</label><br/>
          <textarea name="content" value={formData.content} onChange={handleChange} rows={4} style={{ width: '100%', padding: 8 }}/>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Дата:</label><br/>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required style={{ width: '100%', padding: 8 }}/>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Статус:</label><br/>
          <input name="status" value={formData.status} onChange={handleChange} style={{ width: '100%', padding: 8 }}/>
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Приоритет:</label><br/>
          <input name="priority" value={formData.priority} onChange={handleChange} style={{ width: '100%', padding: 8 }}/>
        </div>
        <button type="submit" style={{ padding: '8px 16px' }}>Сохранить</button>
      </form>
    </div>
  );
};

export default Form;

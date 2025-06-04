import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const DetailEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    theme: '',
    content: '',
    date: '',
    applicant: '',
    status: '',
    priority: ''
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/items/${id}`)
      .then(resp => setFormData(resp.data))
      .catch(err => console.error("Ошибка загрузки:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    const errs = [];
    if (!formData.name.trim()) errs.push("Название обязательно для заполнения.");
    if (!formData.date.trim()) errs.push("Дата обязательна для заполнения.");
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (errs.length) {
      setErrors(errs);
      return;
    }
    axios.put(
      `http://localhost:5000/items/${id}`,
      formData,
      { headers: { "Content-Type": "application/json; charset=utf-8" } }
    )
      .then(() => navigate('/'))
      .catch(err => console.error("Ошибка обновления:", err));
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 30 }}>Редактирование обращения</h1>
      {errors.length > 0 && (
        <div style={{ color: 'red', marginBottom: 15 }}>
          {errors.map((e, i) => <div key={i}>{e}</div>)}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Название */}
        <div style={{ marginBottom: 10 }}>
          <label>Название:</label><br/>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        {/* Тема */}
        <div style={{ marginBottom: 10 }}>
          <label>Тема:</label><br/>
          <input
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        {/* Содержание */}
        <div style={{ marginBottom: 10 }}>
          <label>Содержание:</label><br/>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={4}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        {/* Дата */}
        <div style={{ marginBottom: 10 }}>
          <label>Дата:</label><br/>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        {/* Заявитель (только чтение) */}
        <div style={{ marginBottom: 10 }}>
          <label>Заявитель:</label><br/>
          <input
            name="applicant"
            value={formData.applicant}
            disabled
            style={{ width: '100%', padding: 8, background: '#eee' }}
          />
        </div>
        {/* Статус */}
        <div style={{ marginBottom: 10 }}>
          <label>Статус:</label><br/>
          <input
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        {/* Приоритет */}
        <div style={{ marginBottom: 10 }}>
          <label>Приоритет:</label><br/>
          <input
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        {/* Кнопки */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 20 }}>
          <button type="submit" style={{ padding: '8px 16px' }}>Сохранить</button>
          <Link to="/" style={{ padding: '8px 16px', textDecoration: 'none', background: '#ccc', borderRadius: 4 }}>Отмена</Link>
        </div>
      </form>
    </div>
  );
};

export default DetailEdit;

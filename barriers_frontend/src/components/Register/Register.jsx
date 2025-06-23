import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api.jsx';
import './Register.scss';


const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;



function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    nickname: '',
    password: '',
    adminPasswordInput: '', // поле для ввода
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Проверка пароля администратора
    if (formData.adminPasswordInput !== ADMIN_PASSWORD) {
      setError('Неверный пароль администратора');
      setLoading(false);
      return;
    }

    try {
      const { adminPasswordInput, ...userData } = formData; // исключаем поле
      const res = await API.post('/auth/register', userData);
      localStorage.setItem('token', res.data.access_token);
      setSuccess(true);
      navigate('/crm');
    } catch (err) {
      setError(err.response?.data?.detail || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nickname"
          placeholder="Никнейм"
          value={formData.nickname}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="adminPasswordInput"
          placeholder="Пароль администратора"
          value={formData.adminPasswordInput}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Вы успешно зарегистрированы!</p>}
      </form>
    </div>
  );
}

export default Register;

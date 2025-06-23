import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- не забудь импорт
import API from '../../api.jsx';
import './Login.scss';

function Login() {
  const navigate = useNavigate(); // ✅ теперь хук внутри компонента

  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

    try {
      const res = await API.post('/auth/login', formData);
      localStorage.setItem('token', res.data.access_token);
      setSuccess(true);
      navigate('/crm'); // редирект после успешного входа
    } catch (err) {
      setError(err.response?.data?.detail || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit} className="register-form">
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
        <button type="submit" disabled={loading}>
          {loading ? 'Вход...' : 'Войти'}
        </button>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">Вы успешно вошли!</p>}
      </form>
    </div>
  );
}

export default Login;

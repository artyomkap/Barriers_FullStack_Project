import React, { useContext } from 'react';
import './Header.scss';
import logo from '../../images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext.jsx';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header__left">
        <img src={logo} alt="Логотип" className="header__logo" />
        <nav className="header__nav">
          <Link to="/">Главная страница</Link>
          <Link to="/contacts">Контакты</Link>
          <Link to="/services">Услуги</Link>
          <Link to="/gallery">Галерея</Link>
          {user && <Link to="/crm">CRM</Link>}
        </nav>
      </div>

      <div className="header__auth">
        {!user ? (
          <>
            <Link to="/login" className="header__auth-link">Логин</Link>
            <Link to="/register" className="header__auth-link">Регистрация</Link>
          </>
        ) : (
          <>
            <span className="header__auth-name">{user.nickname}</span>
            <button onClick={handleLogout} className="header__auth-link">Выйти</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

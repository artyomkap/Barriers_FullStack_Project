import React from 'react';
import './Footer.scss';
import logo from '../../images/logo.png'; // Замени на свой логотип
import vkIcon from '../../images/social/vk.svg';
import youtubeIcon from '../../images/social/youtube.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">

          <div className="footer__info">
            <a href="/">
              <img src={logo} alt="Логотип Шлагбаумы" className="footer__logo" />
            </a>
            <div className="footer__description">
              Системы шлагбаумов и безопасности
            </div>
          </div>

          <div className="footer__menu">
            <div className="footer__title">НАВИГАЦИЯ</div>
            <ul className="footer__list">
                <li><a href="/">Главная страница</a></li>
                <li><a href="/contacts">Контакты</a></li>
                <li><a href="/services">Услуги</a></li>
               <li><a href="/gallery">Галерея</a></li>
            </ul>
          </div>


          <div className="footer__contact">
            <div className="footer__title">Контакты</div>
            <p>г. Киров, ул. Розы Люксембург, д. 16<br />Пн-Пт: 08:00 – 18:00</p>
            <p>Телефон: <a href="tel:+79229771133">8 (922) 977-11-33</a></p>
            <a className="footer__callback" href="#">Перезвоните мне</a>
            <div className="footer__social">
              <a href="https://vk.com" target="_blank"><img src={vkIcon} alt="VK" /></a>
              <a href="https://youtube.com" target="_blank"><img src={youtubeIcon} alt="YouTube" /></a>
            </div>
          </div>

        </div>

        <div className="footer__copyright">
          © 2014 – 2025 Шлагбаумы. Все права защищены.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

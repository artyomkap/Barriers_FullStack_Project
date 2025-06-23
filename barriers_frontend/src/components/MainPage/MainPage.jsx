import React from 'react';
import './MainPage.scss';
import banner from '../../images/banners/mainbanner.webp';
import adve1 from '../../images/consultation.svg';
import adve2 from '../../images/questionnaire.svg';
import adve3 from '../../images/delivery.svg';
import adve4 from '../../images/handshake.svg';
import companyImage from '../../images/logo.png';
import work1 from '../../images/our_work/our_work (1).jpg';
import work2 from '../../images/our_work/our_work (2).jpg';
import work3 from '../../images/our_work/our_work (3).jpg';
import work4 from '../../images/our_work/our_work (4).jpg';


function MainPage() {
  return (
    <div className="main-page">
      {/* Баннер */}
      <div className="main-banner">
        <img src={banner} alt="Устанавливаем шлагбаумы для вас" />
        <h1 className="main-banner__title">Устанавливаем шлагбаумы для вас</h1>
      </div>

      {/* Преимущества */}
      <section className="advantages">
        <div className="advantages__inner">
          <div className="advantage">
            <img src={adve1} alt="" className="advantage__image" />
            <div className="advantage__content">
              <div className="advantage__name">Качественная консультация</div>
              <div className="advantage__text">Быстрая и качественная консультация от профессионалов</div>
            </div>
          </div>
          <div className="advantage">
            <img src={adve2} alt="" className="advantage__image" />
            <div className="advantage__content">
              <div className="advantage__name">Подбор оборудования под проект</div>
              <div className="advantage__text">Подберем оборудование под ТЗ любой сложности по вашему запросу</div>
            </div>
          </div>
          <div className="advantage">
            <img src={adve3} alt="" className="advantage__image" />
            <div className="advantage__content">
              <div className="advantage__name">Привезем любое оборудование</div>
              <div className="advantage__text">Видеонаблюдение<br/>ОПС<br/>СКУД</div>
            </div>
          </div>
          <div className="advantage">
            <img src={adve4} alt="" className="advantage__image" />
            <div className="advantage__content">
              <div className="advantage__name">Партнерская программа для организаций</div>
              <div className="advantage__text">Выгодная цена, специальные закрытые предложения для монтажных организаций</div>
            </div>
          </div>
        </div>
      </section>

      {/* Наши работы */}
      <section className="our-works">
        <h2>Наши работы</h2>
        <div className="our-works__gallery">
            <img src={work1} alt="Work 1" />
            <img src={work2} alt="Work 2" />
            <img src={work3} alt="Work 3" />
            <img src={work4} alt="Work 4" />
        </div>
       </section>


      {/* Связь с нами */}
      <section className="consultation-form">
        <h2>Связаться с нами</h2>
        <form>
          <input type="text" placeholder="Ваше имя" required />
          <input type="tel" placeholder="Телефон" required />
          <textarea placeholder="Ваше сообщение" required></textarea>
          <button type="submit">Отправить</button>
        </form>
      </section>

      {/* О компании */}
      <section className="about-company">
        <div className="about-company__grid">
          <div className="about-company__text">
            <h2>О компании</h2>
            <p>Наша компания — надёжный поставщик систем безопасности, шлагбаумов и видеонаблюдения, работающий более 14 лет. Мы предоставляем решения любой сложности и заслужили доверие сотен клиентов.</p>
            <a className="about-company__more" href="/content/about/">Подробнее</a>
          </div>
          <img src={companyImage} alt="О компании" className="about-company__image" />
        </div>
      </section>
    </div>
  );
}

export default MainPage;
import React from 'react';
import './Contacts.scss';

function Contacts() {
  return (
    <main className="contacts">
      <section className="contacts-title">
        <div className="contacts-title__container">
          <h1>Контакты</h1>
          <div className="contacts-title__row">
            <div className="contacts-title__column contacts-title__column_big">
              <div className="contacts-title__item contacts-title__item_number">
                <p className="contacts-title__item-head">Телефон</p>
                <a href="tel:+79229771133">8 (912) 345-67-89</a>
              </div>
              <div className="contacts-title__item contacts-title__item_mail">
                <p className="contacts-title__item-head">Общая электронная почта</p>
                <a href="mailto:zakaz@rub-m.ru">barriers@gmail.com</a>
              </div>
              <div className="contacts-title__item contacts-title__item_address">
                <p className="contacts-title__item-head">Адрес</p>
                <p>г. Москва, ул. Розы Люксембург, д. 20<br/>Пн - Пт: 08:00 – 18:00</p>
              </div>
            </div>

            <div className="contacts-title__column">
              <div className="contacts-title__item">
                <p className="contacts-title__item-head">Мессенджеры</p>
                <div className="contacts-title__icon"><a href="" target="_blank">Telegram</a></div>
                <div className="contacts-title__icon"><a href="" target="_blank">WhatsApp</a></div>
                <div className="contacts-title__icon"><a href="" target="_blank">Viber</a></div>
              </div>
            </div>

            <div className="contacts-title__column">
              <div className="contacts-title__item">
                <p className="contacts-title__item-head">Социальные сети</p>
                <div className="contacts-title__icon"><a href="" target="_blank">Vkontakte</a></div>
                <div className="contacts-title__icon"><a href="" target="_blank">Youtube</a></div>
                <div className="contacts-title__icon"><a href="" target="_blank">Instagram</a></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contacts-form">
        <div className="contacts-form__container">
          <div className="contacts-form__column contacts-form__requisites">
            <iframe
              src="https://yandex.ru/map-widget/v1/"
              width="100%"
              height="487"
              frameBorder="0"
              title="Карта"
            ></iframe>
          </div>

          <div className="contacts-form__column contacts-form__body">
            <div className="contacts-form__content">
              <div className="contacts-form__head">
                <h2>Связаться с нами</h2>
                <p>Если у Вас есть вопрос — Вы можете связаться с нами.</p>
              </div>
              <form className="contacts-form__form">
                <input className="contacts-form__name" type="text" placeholder="ФИО*" required name="FULL_NAME" />
                <div className="contacts-form__wrap">
                  <input className="contacts-form__tel" type="tel" placeholder="Телефон*" required name="PHONE" maxLength="17" />
                  <input className="contacts-form__email" type="email" placeholder="Email*" required name="EMAIL" />
                </div>
                <textarea className="contacts-form__area" placeholder="Сообщение" name="DETAIL_TEXT"></textarea>
                <button type="submit" className="contacts-form__btn button">Отправить</button>
              </form>
              <p>
                Нажимая на кнопку отправить<br />Вы соглашаетесь с <a href="/content/privacy/" target="_blank">политикой конфиденциальности</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contacts;

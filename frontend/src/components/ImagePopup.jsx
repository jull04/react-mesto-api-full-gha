import React from 'react';

function ImagePopup ({card, onClose, isOpen}) {
  return (
    <div className={`popup popup_img ${isOpen ? "popup__visible" : ""}`}>
      <form className="popup__content-img" name="img-form">
        <button
          className="popup__close popup__close_img"
          aria-label="Закрыть"
          type="button"
          onClick={onClose}
        />
        <figure className="popup__figure">
          <img className="popup__img" src={card.link ? card.link : '#'}  alt={card.name ? `Изображение ${card.name}` : '#'}/>
          <figcaption className="popup__description">{card.name}</figcaption>
        </figure>
      </form>
    </div>
  )
}

export default ImagePopup
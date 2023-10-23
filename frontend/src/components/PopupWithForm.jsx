import React from 'react';

function PopupWithForm ({name, title, btnText, children, isOpen, onClose, onSubmit, isValid=true}) {
  return (
    <div className={`popup popup_type_${name}} ${isOpen ? "popup__visible" : ""}`}>
      <form className="popup__content" name="edit-form" noValidate  onSubmit={onSubmit}>
        <button
          type="button"
          className="popup__close popup__close_edit"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <h3 className="popup__title">{title}</h3>
        {children}
        <button 
          disabled={!isValid} 
          type="submit" 
          value="Сохранить" 
          className={`popup__submit ${isValid ? '' : 'popup__submit_disabled'}`}>
          {btnText}
        </button>
      </form>
    </div>
  )
}

export default PopupWithForm
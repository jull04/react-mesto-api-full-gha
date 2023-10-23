import React from "react";
import useFormValidation from "../hooks/useFormValidation";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup ({isOpen, onClose, onAddPlace, isLoading}) {

  const {handleChange, values, errors, isValid, isInputValid, reset} = useFormValidation();

  React.useEffect(() => {
    reset();
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({title: values.title, link: values.link}); 
  }

  return(
    <PopupWithForm
    name="add"
    title="Новое место"
    btnText={isLoading ? "Сохранение..." : "Создать"}
    isOpen={isOpen}
    onClose={onClose}
    onSubmit={handleSubmit}
    isValid={isValid}
    >
    <input
      id="add"
      className={`popup__input popup__input_title ${isInputValid.title === undefined || isInputValid.title ? '' : 'popup__input_type_error' }`}
      type="text"
      name="title"
      placeholder="Название"
      minLength="2"
      maxLength="30"
      required
      onChange={handleChange}
      value={values.title ? values.title : ''}
    />
    <span className="add-error popup__error popup__error_visible">{errors.title}</span>
    <input
      id="url"
      className={`popup__input popup__input_link ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_type_error' }`}
      type="url"
      name="link"
      placeholder="Ссылка на картинку"
      required
      onChange={handleChange}
      value={values.link ? values.link : ''}
    />
    <span className="url-error popup__error popup__error_visible">{errors.link}</span>
  </PopupWithForm>
  )
}

export default AddPlacePopup
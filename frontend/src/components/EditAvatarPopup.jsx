import useFormValidation from "../hooks/useFormValidation";
import PopupWithForm from "./PopupWithForm"
import React, {useEffect} from "react";

function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar, isLoading}) {

  const {handleChange, values, errors, isValid, isInputValid, reset} = useFormValidation();

  useEffect(() => {
    reset();
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(values);
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      btnText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="avatar"
        className={`popup__input popup__input_title ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input_type_error' }`}
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        value={values.avatar ? values.avatar : ''}
        onChange={handleChange}
      />
      <span className="avatar-error popup__error popup__error_visible">{errors.avatar}</span>
    </PopupWithForm>
  )  
}

export default EditAvatarPopup
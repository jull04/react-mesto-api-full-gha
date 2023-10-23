import CurrentUserContext from "../contexts/CurrentUserContext";
import useFormValidation from "../hooks/useFormValidation";
import PopupWithForm from "./PopupWithForm"
import React, {useEffect} from "react";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {

  const currentUser = React.useContext(CurrentUserContext);  

  const {handleChange, values, errors, isValid, isInputValid, reset, setValue} = useFormValidation();

  useEffect(() => {
    setValue("firstname", currentUser.name)
    setValue("job", currentUser.about)
  },[currentUser, setValue])

  useEffect(() => {
    reset({firstname: currentUser.name, job: currentUser.about})
  }, [isOpen]);

  function handleSubmit(evt){
    evt.preventDefault();
    onUpdateUser({firstname: values.firstname, job: values.job}) 
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      btnText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        id="name"
        name="firstname"
        className={`popup__input popup__input_type_name ${isInputValid.firstname === undefined || isInputValid.firstname ? '' : 'popup__input_type_error' }`}
        type="text"
        placeholder="Имя"
        minLength={2}
        maxLength={40}
        required
        onChange={handleChange}
        value={values.firstname ? values.firstname : ''}
      />
      <span className="name-error popup__error popup__error_visible">{errors.firstname}</span>
      <input
        id="job"
        className={`popup__input popup__input_type_job" ${isInputValid.job === undefined || isInputValid.job ? '' : 'popup__input_type_error' }`}
        type="text"
        name="job"
        placeholder="О себе"
        minLength={2}
        maxLength={200}
        required
        onChange={handleChange}
        value={values.job ? values.job : ''}
      />
      <span className="job-error popup__error popup__error_visible">{errors.job}</span>
    </PopupWithForm>
  )
}

export default EditProfilePopup 
import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePopupCard ({isOpen, onClose, onCardDelete, card, isLoading}) {

  function handleSubmit(evt) {
    evt.preventDefault();
    onCardDelete(card);
  } 

  return(
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      btnText={isLoading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default DeletePopupCard
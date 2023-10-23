import React, {useContext} from 'react';
import Card from "./Card.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Main ({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDeleteCard, cards, onCardLike}) {

  const currentUser = useContext(CurrentUserContext);   

  return (
    <main className="content">
    <section className="profile">
      <button type="button" className="profile__avatar-overlay" onClick={onEditAvatar}>
        <img 
          src={currentUser.avatar} 
          alt={currentUser.name}
          className="profile__avatar" 
        />
      </button>
      <div className="profile__info">
        <div className="profile__name">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button"
            aria-label="Редактировать профиль"
            onClick={onEditProfile}
          />
        </div>
        <p className="profile__subtitle">{currentUser.about}</p>
      </div>
      <button
        type="button"
        className="profile__add-button"
        aria-label="Добавить карточку"
        onClick={onAddPlace}
      />
    </section>
    <section className="cards">
      {cards.map(data => {
        return (
          <Card
            card={data}
            key={data._id}
            onCardClick={onCardClick}
            onDeleteCard= {onDeleteCard}
            onCardLike={onCardLike}
          />
        )
      })} 
    </section>
    </main> 
  )
}

export default Main
import React, {useContext} from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Like from './Like';

function Card ({card, onCardClick, onDeleteCard, onCardLike}) {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = currentUser._id===card.owner._id; 

  function handleClick() {
    onCardClick(card);
  }
  
  function handleDelete() {
    onDeleteCard(card._id);
  }

  return (
    <div className="cards__item">
      <img 
        src={card.link} 
        className="cards__image" 
        alt={card.name} 
        onClick={handleClick}
      />
      {isOwn && <button type="button" className="cards__trash" aria-label="Удалить" onClick={handleDelete}/>}
      <div className="cards__description">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__like-container">
        <Like 
          myId={currentUser._id} 
          onCardLike={onCardLike}
          card={card}
        />
        </div>
      </div>
    </div>
  )
}

export default Card
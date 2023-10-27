import React, {useEffect} from "react";

function Like({myId, card, onCardLike}) {

  const [isLike, setIsLike] = React.useState(false);

  useEffect(() => {
    setIsLike(card.likes.some((element) => myId === element))
  }, [card, myId])

  return (
    <>
      <button 
      type="button" className={`cards__like ${isLike ? 'cards__like_active' : ''}`}
      onClick={() => onCardLike(card)}
      />
      <span className="cards__like-counter">{card.likes.length}</span>
    </>
  )
}

export default Like
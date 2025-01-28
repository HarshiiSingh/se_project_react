import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);
  const isLiked = currentUser
    ? item.likes.some((id) => id === currentUser._id)
    : false;
  const itemLikeButtonClassName = `card__like-btn ${isLiked ? "liked" : ""}`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ _id: item._id, isLiked });
  };

  return (
    <div className="card" key={item._id}>
      <div className="card__content">
        <h2 className="card__title">{item.name}</h2>
        {currentUser && (
          <button
            onClick={handleLike}
            className={itemLikeButtonClassName}
          ></button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__img"
        src={item.imageUrl}
        alt={item.name}
      />
    </div>
  );
}

export default ItemCard;

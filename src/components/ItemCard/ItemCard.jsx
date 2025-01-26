import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = currentUser
    ? item.likes.some((id) => id === currentUser._id)
    : false;

  const itemLikeButtonClassName = `card__like-btn ${isLiked ? "liked" : ""}`;

  const handleLike = () => {
    onCardLike(item, isLiked);
  };

  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <div className="card" key={item._id}>
      <h2 className="card__title">{item.name}</h2>
      {currentUser && (
        <button
          onClick={handleLike}
          className={itemLikeButtonClassName}
        ></button>
      )}
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

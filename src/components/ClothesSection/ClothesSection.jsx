import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  onCardLike,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const userItems =
    currentUser && currentUser._id
      ? clothingItems.filter((item) => item.owner === currentUser._id)
      : [];
  return (
    <div className="clothes-section">
      <div className="clothes-section__controls">
        <p className="clothes-section__items">Your Items</p>
        <button
          className="clothes-section__btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>
      <div className="clothes-section__lists">
        <ul className="cards__list">
          {userItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default ClothesSection;

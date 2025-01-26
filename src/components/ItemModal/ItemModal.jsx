import "./ItemModal.css";
import close from "../../assets/close-btn-light.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function ItemModal({ activeModal, card, closeActiveModal, handleDelete }) {
  const { currentUser } = useContext(CurrentUserContext);
  // Checking if the current user is the owner of the current clothing item
  const isOwn = card.owner === currentUser?._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__delete-button ${
    isOwn ? "" : "modal__delete-button_hidden"
  }`;
  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content_type_image">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close_type_preview"
        >
          <img
            src={close}
            alt="close-btn"
            className="modal__close-img_type_preview"
          />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__img" />
        <div className="modal__footer">
          <div className="modal__text">
            <p className="modal__caption">{card.name}</p>
            {isOwn && (
              <button
                className="modal__delete-btn"
                type="button"
                onClick={handleDelete}
              >
                Delete Item
              </button>
            )}
          </div>
          <p className="weather__modal">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;

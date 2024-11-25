import "./DeleteModal.css";
import close from "../../assets/close-btn-img.png";
function DeleteModal({ activeModal, closeActiveModal, onDelete }) {
  return (
    <div className={`modal ${activeModal === "delete" ? "modal_opened" : ""}`}>
      <div className="modal__content_type_delete">
        <h2 className="delete-modal__text">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
          <br />
        </h2>
        <button onClick={closeActiveModal} className="modal__close" type="button">
          <img
            className="delete-modal__close-icon"
            src={close}
            alt="close-btn"
          />
        </button>
        <form className="modal__form">
          <button
            className="delete-modal__btn"
            type="button"
            onClick={onDelete}
          >
            Yes, delete item
          </button>
          <button className="cancel__btn" type="button" onClick={closeActiveModal} >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default DeleteModal;

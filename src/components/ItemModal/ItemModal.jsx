import "./ItemModal.css";
import close from "../../assets/close-btn-light.png"

function ItemModal({activeModal, card, closeActiveModal}) {
    return (
        <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
            <div className="modal__content modal__content_type_image">
                <button onClick={closeActiveModal} type="button" className="modal__close modal__close_type_preview"><img src={close} alt="close-btn" className="modal__close-img_type_preview" /></button>
                <img src={card.link} alt={card.name} className="modal__img" />
                <div className="modal__footer">
                    <p className="modal__caption">{card.name}</p>
                    <p className="weather__modal">Weather: {card.weather}</p>
                </div>
            </div>
        </div>
    )
}

export default ItemModal;
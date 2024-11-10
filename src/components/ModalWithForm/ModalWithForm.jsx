import "./ModalWithForm.css";
import close from "../../assets/close-btn-img.png"
function ModalWithForm({ children, buttonText, title, activeModal, closeActiveModal }) {
    return (
        <div className={`modal ${activeModal === "add-garment" ? "modal_opened" : ""}`}>
            <div className="modal__content">
                <h2 className="modal__title">{title}</h2>
                <button onClick={closeActiveModal} type="button" className="modal__close"><img src={close} alt="" className="modal__close-img" /></button>
                <form className="modal__form">
                    {children}
                    <button type="submit" className="modal__submit">{buttonText}</button>
                </form>
            </div>
        </div>
    )
}

export default ModalWithForm;
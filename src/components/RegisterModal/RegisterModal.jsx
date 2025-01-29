import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({
  closeActiveModal,
  activeModal,
  handleSignInClick,
  handleRegistration,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      handleRegistration(formData);
    }
  };

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      isOpen={activeModal === "sign-up"}
      title="Sign Up"
      buttonText="Sign Up"
      onSubmit={handleSubmit}
      buttonClass={"register-btn"}
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          required
          minLength="3"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          name="name"
          placeholder="Name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label className="modal__label">
        Avatar URL*
        <input
          type="url"
          className="modal__input"
          name="avatar"
          placeholder="Avatar URL"
          required
          value={formData.avatar}
          onChange={handleChange}
        />
      </label>
      <button
        type="button"
        className="login-modal__button"
        onClick={handleSignInClick}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;

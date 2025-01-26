import "./LoginModal.css";
import "../ModalWithForm/ModalWithForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
function LoginModal({
  closeActiveModal,
  activeModal,
  handleSignUpClick,
  handleLogin,
}) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.checkValidity()) {
      handleLogin(formData);
    }
  };

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      isOpen={activeModal === "sign-in"}
      title="Log In"
      buttonText="Log In"
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email*{" "}
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
        Password*{" "}
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
      <button
        type="button"
        className="signup-modal__button"
        onClick={handleSignUpClick}
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;

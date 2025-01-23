import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({
  closeActiveModal,
  activeModal,
  handleSignUpClick,
  isOpen,
}) {
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: "", avatar: "", email: "", password: "" });
    }
  }, [isOpen]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    const allFieldsFilled = Object.values({ ...formData, [name]: value }).every(
      (field) => field.trim() !== ""
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      isOpen={activeModal === "sign-up"}
      title="Sign Up"
      buttonText="Sign Up"
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
      <label className="modal__label">
        Name*{" "}
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
        Avatar URL*{" "}
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
        className="register-modal__button"
        // onClick={handleSignInClick}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;

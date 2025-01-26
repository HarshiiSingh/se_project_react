import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

function EditProfileModal({
  closeActiveModal,
  activeModal,
  handleEditProfile,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [formData, setFormData] = useState({
    name: "",
    avatar: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.target.checkValidity()) {
      handleEditProfile(formData);
    }
  };
  useEffect(() => {
    if (activeModal && currentUser) {
      console.log("Current User:", currentUser);
      setFormData({
        username: currentUser?.name,
        avatar: currentUser?.avatar,
      });
    }
  }, [activeModal, currentUser]);

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      isOpen={activeModal === "edit-profile"}
      title="Change profile data"
      buttonText="Save changes"
      onSubmit={handleSubmit}
      buttonClass={"modal__submit-edit-profile"}
    >
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
    </ModalWithForm>
  );
}

export default EditProfileModal;

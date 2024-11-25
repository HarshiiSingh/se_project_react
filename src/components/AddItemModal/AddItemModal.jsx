import React from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ closeActiveModal, activeModal, onSubmit }) {
  const [name, setName] = React.useState("");
  const [imageUrl, setUrl] = React.useState("");
  const [weather, setWeather] = React.useState("");

  const resetForm = () => {
    setName("");
    setUrl("");
    setWeather("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { name, imageUrl, weather };
    onSubmit(newItem, resetForm);
  };

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      buttonText="Add garment"
      title="New garment"
      isOpen={activeModal === "add-garment"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageURL"
          placeholder="Image URL"
          onChange={handleUrlChange}
          value={imageUrl}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
            id="hot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherChange}
          />
          <span>Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
            type="radio"
            className="modal__radio-input"
            id="warm"
            value="warm"
            onChange={handleWeatherChange}
          />
          <span>Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weatherType"
            type="radio"
            className="modal__radio-input"
            id="cold"
            value="cold"
            onChange={handleWeatherChange}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;

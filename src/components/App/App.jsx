import { useEffect, useState } from 'react'
import './App.css'
import Header from '../Header/Header.jsx'
import Main from '../Main/Main.jsx'
import Footer from '../Footer/Footer.jsx'
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx'
import ItemModal from '../ItemModal/ItemModal.jsx'
import { getWeather, filterWeatherData } from '../../utils/weatherApi.js'
import { coordinates, APIkey } from '../../utils/constants.js'

function App() {
  
  const [weatherData, setWeatherData] = useState({ 
    type: "", 
    temp: {F: 999},
    city: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  const handleAddClick = () => {
    setActiveModal("add-garment");
  }

  const closeActiveModal = () => {
    setActiveModal("");
  }

  useEffect(() => {
    getWeather(coordinates, APIkey)
    .then((data) => {
      const filterData = filterWeatherData(data);
      setWeatherData(filterData);
    })
    .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData}/>
        <Main weatherData={weatherData} handleCardClick={handleCardClick}/>
        <Footer />
      </div>
      <ModalWithForm closeActiveModal={closeActiveModal} buttonText="Add garment" title="New garment" isOpen={activeModal === "add-garment"}>
                    <label htmlFor="name" className="modal__label">Name 
                        <input type="text" className="modal__input" id="name" placeholder="Name"/></label>
                    <label htmlFor="imageURL" className="modal__label">Image
                        <input type="url" className="modal__input" id="imageURL" placeholder="Image URL"/></label>
                    <fieldset className="modal__radio-buttons">
                        <legend className="modal__legend">Select the weather type:</legend>
                        <label htmlFor="hot" className="modal__label modal__label_type_radio">
                            <input name="weatherType" id="hot" type="radio" className="modal__radio-input" /><span>Hot</span>
                        </label>
                        <label htmlFor="warm" className="modal__label modal__label_type_radio">
                            <input name="weatherType" type="radio" className="modal__radio-input" id="warm" /><span>Warm</span>
                        </label>
                        <label htmlFor="cold" className="modal__label modal__label_type_radio">
                            <input name="weatherType" type="radio" className="modal__radio-input" id="cold" /><span>Cold</span>
                        </label>
                    </fieldset>
      </ModalWithForm>
      <ItemModal activeModal={activeModal} card={selectedCard} closeActiveModal={closeActiveModal} />
    </div>
    
  )
}

export default App;

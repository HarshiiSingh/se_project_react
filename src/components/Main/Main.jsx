import './Main.css';
import { useContext } from "react";
import ItemCard from '../ItemCard/ItemCard.jsx'
import WeatherCard from '../WeatherCard/WeatherCard.jsx'
import { defaultClothingItems } from '../../utils/constants.js';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext.js'

function Main({ weatherData, handleCardClick }) {
    const {currentTemperatureUnit} = useContext(CurrentTemperatureUnitContext);

    return (
        <main>
            <WeatherCard weatherData={weatherData}/>
            
            <section className="cards">
                <p className="cards__text">Today is {weatherData.temp[currentTemperatureUnit]} &deg; {currentTemperatureUnit} / You may want to wear:</p>
            </section>

            <ul className="cards__list">
                {defaultClothingItems
                .filter((item) => {
                    return item.weather === weatherData.type;
                    
                })
                .map((item) => {
                    return (
                        <ItemCard key={item._id} item={item} onCardClick={handleCardClick}/>
                    )
                })}
            </ul>
        </main>
    )
}

export default Main;
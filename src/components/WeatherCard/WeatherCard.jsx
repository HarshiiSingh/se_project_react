import './WeatherCard.css';
import sunny from "../../assets/weather-card-img.png";
function WeatherCard() {
    return (
        <section className="weather-card">
            <p className="weather-card__temp"> 75 &deg;</p>
            <img src={sunny} alt="" className="weather-card__img" />
        </section>
    )
}

export default WeatherCard;
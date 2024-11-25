import logo from "../../assets/header-logo.png";
import avatar from "../../assets/header-avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import { Link } from "react-router-dom";
function Header({ handleAddClick, weatherData }) {
    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

    return (
        <header className="header">
            
                <img src={logo} alt="header-logo" className="header__logo" />
            
            <p className="header__date">{currentDate}, {weatherData.city}</p>
            <ToggleSwitch />
            <button onClick={handleAddClick} type="button" className="header__add-clothes-btn">+ Add clothes</button>
        <div className="header__container-user">
            
            <p className="header__username">Terrence Tegegine</p>
            
            <img src={avatar} alt="header__avatar" className="header__avatar" />
        </div>
        </header>
    );
};

export default Header;
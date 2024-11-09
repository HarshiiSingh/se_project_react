import logo from "../../assets/header-logo.png";
import avatar from "../../assets/header-avatar.png";
import "./Header.css";
function Header() {
    return (
        <header className="header">
            <img src={logo} alt="header-logo" className="header__logo" />
            <p className="header__date">June 15, New York</p>
            <button className="header__add-clothes-btn">+ Add clothes</button>
        <div className="header__container-user">
            <p className="header__username">Terrence Tegegine</p>
            <img src={avatar} alt="header__avatar" className="header__avatar" />
        </div>
        </header>
    );
};

export default Header;
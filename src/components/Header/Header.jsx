import logo from "../../assets/header-logo.png";
import avatar from "../../assets/header-avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
function Header({
  handleAddClick,
  weatherData,
  handleSignUpClick,
  handleSignInClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const generatePlaceholder = (name) => {
    const firstLetter = name?.charAt(0).toUpperCase() || "?";
    return <div className="header__avatar-placeholder">{firstLetter}</div>;
  };

  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} alt="header-logo" className="header__logo" />
      </Link>
      <p className="header__date">
        {currentDate}, {weatherData.city}
      </p>
      <div className="header__container-btn">
        <ToggleSwitch />
        {!currentUser ? (
          <>
            <button
              type="button"
              className="header__sign-up-button"
              onClick={handleSignUpClick}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__sign-in-button"
              onClick={handleSignInClick}
            >
              Log In
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>

            <Link to="/profile" className="header__link">
              <div className="header__container-user">
                <p className="header__username">{currentUser.name}</p>
                {currentUser.avatar ? (<img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />) : (
                  generatePlaceholder(currentUser.name)
                )}
                
              </div>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

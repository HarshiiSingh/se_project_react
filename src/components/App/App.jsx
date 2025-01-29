import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import DeleteModal from "../DeleteModal/DeleteModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { coordinates, APIkey } from "../../utils/constants.js";
import {
  getItems,
  addItem,
  removeItem,
  addCardLike,
  removeCardLike,
  editUserProfile,
} from "../../utils/api.js";
import * as auth from "../../utils/auth.js";
import { setToken, getToken, removeToken } from "../../utils/token";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: {
      F: 999,
    },
    city: "",
  });
  const navigate = useNavigate();

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleDeleteClick = () => {
    setActiveModal("delete");
  };

  const handleSignUpClick = () => {
    setActiveModal("sign-up");
  };

  const handleSignInClick = () => {
    setActiveModal("sign-in");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegistration = ({ email, password, name, avatar }) => {
    auth
      .register(email, password, name, avatar)
      .then(() => {
        handleLogin({ email, password });
        closeActiveModal();
      })
      .catch(console.error);
  };

  function getUserInformation(token) {
    return auth
      .getUserInfo(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(console.error);
  }

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      console.log("No JWT found. Logging out.");
      setCurrentUser(null);
      setIsLoggedIn(false);
      return;
    }

    getUserInformation(jwt);
  }, []);

  const handleLogin = ({ email, password }) => {
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          console.log(data);
          setToken(data.token);
          setIsLoggedIn(true);
          getUserInformation(data.token).then(() => {
            navigate("/profile");
            closeActiveModal();
          });
        }
      })
      .catch(console.error);
  };

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    editUserProfile(name, avatar, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const deleteItem = () => {
    const token = localStorage.getItem("jwt");
    removeItem(selectedCard._id, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCard._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filterData = filterWeatherData(data);
        setWeatherData(filterData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  function handleAddItemSubmit(item, resetForm) {
    const token = localStorage.getItem("jwt");
    addItem(item, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        resetForm();
        closeActiveModal();
      })
      .catch(console.error);
  }

  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? 
        addCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : 
        removeCardLike(_id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === _id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleLogOut = () => {
    removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser}}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              handleSignUpClick={handleSignUpClick}
              handleSignInClick={handleSignInClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      onCardLike={handleCardLike}
                      handleLogOut={handleLogOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          <AddItemModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            onSubmit={handleAddItemSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            closeActiveModal={closeActiveModal}
            handleDelete={handleDeleteClick}
          />
          <DeleteModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            onDelete={deleteItem}
          />
          <RegisterModal
            closeActiveModal={closeActiveModal}
            activeModal={activeModal}
            handleSignInClick={handleSignInClick}
            handleRegistration={handleRegistration}
          />
          <LoginModal
            closeActiveModal={closeActiveModal}
            activeModal={activeModal}
            handleSignUpClick={handleSignUpClick}
            handleLogin={handleLogin}
          />
          <EditProfileModal
            isOpen={activeModal}
            closeActiveModal={closeActiveModal}
            activeModal={activeModal}
            handleEditProfile={handleEditProfile}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

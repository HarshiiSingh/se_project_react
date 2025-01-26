import avatar from "../../assets/header-avatar.png";
import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleEditProfileClick }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt={currentUser.name}
        />
        <p className="sidebar__username">{currentUser.name}</p>
      </div>
      <div className="sideBar__editProfile">
        <button
          className="sideBar__changeUserData"
          onClick={handleEditProfileClick}
          type="button"
        >
          Change Profile Data
        </button>
      </div>
    </div>
  );
}

export default SideBar;

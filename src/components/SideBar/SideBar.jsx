import avatar from "../../assets/header-avatar.png";
import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SideBar({ handleEditProfileClick, handleLogOut }) {
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
      <div className="sidebar__edit-user">
        <button
          className="sidebar__change-name"
          onClick={handleEditProfileClick}
          type="button"
        >
          Change Profile Data
        </button>
        <button
          className="sidebar__logout"
          onClick={handleLogOut}
          type="button"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default SideBar;

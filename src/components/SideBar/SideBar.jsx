import avatar from "../../assets/header-avatar.png";
import "./SideBar.css";

function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <img className="sidebar__avatar" src={avatar} alt="Terrence Tegegine" />
        <p className="sidebar__username">Terrence Tegegine</p>
      </div>
    </div>
  );
}

export default SideBar;

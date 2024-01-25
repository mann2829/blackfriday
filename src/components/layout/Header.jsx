import React, { useState } from "react";
import Logo from "../../assets/images/Ecentric-logo.svg";
import ToggleIcon from "../../assets/images/menu-icon.svg";
import { Link } from "react-router-dom";

const Header = ({ eventName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header>
      <div className="header-inner custom-container">
        <Link className="navbar-brand" to={""}>
          <img src={Logo} alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleToggleClick}
        >
          <img src={ToggleIcon} alt="icon" />
        </button>
        <p>
          {eventName} <span>Dashboard</span>
        </p>
        <div className={`navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul>
            <li>
              <Link to={""}>Our solutions</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;

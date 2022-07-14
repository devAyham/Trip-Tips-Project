import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faRightToBracket,
  faAngleDown,
  faDisplay,
  faHouse,
  faPlus,
  faCog,
  faCircleInfo,
  faRightFromBracket,
  faUserTie,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { baseURl } from "../../api/baseURL";
import AuthContext from "../../context/AuthProvider";
import LogOut from "../logout/logoutComponent";


let Navbar = () => {
  const { auth, setAuth } = useContext(AuthContext);

  let arrowHandelr = (e) => {
    let arrowParent = e.target.parentElement.parentElement.parentElement; //selecting main parent of arrow
    arrowParent.classList.toggle("showMenu");
  };
  let navtoggle = (e) => {
    let sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("close");
  };
  let activeIconToggle = (e) => {
    let nav_option = document.querySelectorAll(".nav_option");
    nav_option.forEach((element) => {
      element.classList.remove("active");
    });
    if (e.target.classList.contains("svg_icon")) {
      e.target.parentElement.parentElement.classList.add("active");
    }
    e.target.parentElement.classList.add("active");
    console.log(e.target);
  };

  return (
    <>
      <div className="sidebar close">
        <div className="logo-details">
          <img
            className="icon-nav-toggle"
            src="/logo/6.png"
            width="70px"
            alt="wrong"
            onClick={navtoggle}
          />
          <span className="logo_name">Trip Tips</span>
        </div>

        <ul className="nav-links">
          <li>
            <div className="icon-link">
              <NavLink
                className="nav_option"
                to="/home"
                onClick={activeIconToggle}
              >
                <i className="nav_icon">
                  <FontAwesomeIcon className="svg_icon" icon={faHouse} />
                </i>
                <span className="link_name">Home</span>
              </NavLink>
              <i className="arrow">
                <FontAwesomeIcon
                  className="arrow_icon"
                  icon={faAngleDown}
                  onClick={arrowHandelr}
                  width="100%"
                />
              </i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#Home">
                  Home
                </a>
              </li>
              <li>
                <a href="#Intro">Intro</a>
              </li>
              <li>
                <a href="#Services">Services</a>
              </li>
              <li>
                <a href="#Packages">Packages </a>
              </li>
              <li>
                <a href="#Top Tours">Top Tours</a>
              </li>
              <li>
                <a href="#Download">Download</a>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              className="nav_option"
              to="/dashboard"
              onClick={activeIconToggle}
            >
              <i className="nav_icon">
                <FontAwesomeIcon className="svg_icon" icon={faChartPie} />
              </i>
              <span className="link_name">Dashboard</span>
            </NavLink>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#Dashboard">
                  Dashboard
                </a>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              className="nav_option"
              to="/addplace"
              onClick={activeIconToggle}
            >
              <i className="nav_icon">
                <FontAwesomeIcon className="svg_icon" icon={faPlus} />
              </i>
              <span className="link_name">Add Place</span>
            </NavLink>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#addplace">
                  Add Place
                </a>
              </li>
            </ul>
          </li>
          <li>
            <NavLink
              className="nav_option"
              to="/mangeplaces"
              onClick={activeIconToggle}
            >
              <i className="nav_icon">
                <FontAwesomeIcon className="svg_icon" icon={faUserTie} />
              </i>
              <span className="link_name">Mange Places</span>
            </NavLink>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#mangeplace">
                  Mange Places
                </a>
              </li>
            </ul>
          </li>
          <li>
            <div className="icon-link">
              <NavLink
                className="nav_option"
                to="/settings"
                onClick={activeIconToggle}
              >
                <i className="nav_icon">
                  <FontAwesomeIcon className="svg_icon" icon={faCog} />
                </i>
                <span className="link_name">Settings</span>
              </NavLink>
              <i className="arrow">
                <FontAwesomeIcon
                  className="arrow_icon"
                  icon={faAngleDown}
                  onClick={arrowHandelr}
                />
              </i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#Settings">
                  Settings
                </a>
              </li>
              <li>
                <a href="#Theme">Theme</a>
              </li>
              <li>
                <a href="#Currency">Currency</a>
              </li>
              <li>
                <a href="#Units">Units</a>
              </li>
            </ul>
          </li>
          <li>
            <div className="icon-link">
              <NavLink
                className="nav_option"
                to="/helpcenter"
                onClick={activeIconToggle}
              >
                <i className="nav_icon">
                  <FontAwesomeIcon
                    className="svg_icon"
                    icon={faCircleQuestion}
                  />
                </i>
                <span className="link_name">Help Center</span>
              </NavLink>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#Help Center">
                  Help Center
                </a>
              </li>
            </ul>
          </li>
          <li>
            <div className="icon-link">
              <NavLink
                className="nav_option"
                to="/aboutus"
                onClick={activeIconToggle}
              >
                <i className="nav_icon">
                  <FontAwesomeIcon className="svg_icon" icon={faCircleInfo} />
                </i>
                <span className="link_name">About Us</span>
              </NavLink>
              <i className="arrow">
                <FontAwesomeIcon
                  className="arrow_icon"
                  icon={faAngleDown}
                  onClick={arrowHandelr}
                />
              </i>
            </div>
            <ul className="sub-menu">
              <li>
                <a className="link_name" href="#aboutus">
                  About US
                </a>
              </li>
              <li>
                <a href="#Theme">Devs</a>
              </li>
              <li>
                <a href="#Currency">App Reviews</a>
              </li>
            </ul>
          </li>
          {auth.ais_verifay !== 1 ? (
            <li>
              <NavLink
                className="nav_option login_icon "
                to="/logging"
                onClick={activeIconToggle}
              >
                <i className="nav_icon ">
                  <FontAwesomeIcon
                    className="svg_icon"
                    icon={faRightToBracket}
                  />
                </i>
                <span className="link_name">Loggin</span>
              </NavLink>
              <ul className="sub-menu blank login_blank">
                <li>
                  <a className="link_name" href="#loggin">
                    Loggin
                  </a>
                </li>
              </ul>
            </li>
          ) : (
            <li>
              <div className="profile-details ">
                <NavLink className="nav_option" to="/profile">
                  <div className="profile-content">
                    <img src={`${baseURl}${auth.aimg}`} alt="profileImg" />
                  </div>
                  <div className=" name-job">
                    <div className="profile_name">{auth.aname}</div>
                    <div className="job">{auth.arolename}</div>
                  </div>
                </NavLink>
                <a
                  className="logout-icon nav_icon"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#logout"
                  href="#logout"
                >
                  <FontAwesomeIcon icon={faRightFromBracket} />
                </a>
              </div>
            </li>
          )}
        </ul>
      </div>
      <LogOut />
    </>
  );
};
export default Navbar;

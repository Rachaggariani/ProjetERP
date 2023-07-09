import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { SlBasket } from "react-icons/sl";
import { SlSocialDropbox } from "react-icons/sl";

function SideBar() {
  const [expanded, setExpanded] = useState({
    clients: false,
    users: false,
    produits: false,
    stock: false,
  });

  const handleExpand = (key) => {
    setExpanded((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
      ...Object.keys(prevState)
        .filter((k) => k !== key)
        .reduce((acc, k) => ({ ...acc, [k]: false }), {})
    }));
  };
  const toggleMenu = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="sidebar-wrapper sidebar-theme">
      <nav id="sidebar">
        <ul className="navbar-nav theme-brand flex-row  text-center">
          <li className="nav-item theme-text">
            <a href="index.html" className="nav-link">
              {" "}
            <span style={{ fontFamily: 'Times New Roman',fontWeight: 'normal' ,fontSize:'15px',marginBottom:'-9px'}}>  Dawarji{" "} </span> 
            </a>
          </li>
          <li className="nav-item toggle-sidebar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather sidebarCollapse feather-chevrons-left"
            >
              <polyline points="11 17 6 12 11 7"></polyline>
              <polyline points="18 17 13 12 18 7"></polyline>
            </svg>
          </li>
        </ul>
        <div className="shadow-bottom"></div>
        <ul className="list-unstyled menu-categories" id="accordionExample">
          <li className="menu active">
            <Link
              to="dashboard"
              data-toggle="collapse"
              aria-expanded="true"
              className="dropdown-toggle"
            >
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-home"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Dashboard</span>
              </div>
            </Link>
          </li>

          <br />
          <li className="menu">
            <Link
              to="chargements"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <div className="">
                <FiTruck />
                <span>Chargements</span>
              </div>
            </Link>
          </li>

          <li className="menu">
            <a
              onClick={() => handleExpand("clients")}
              className="dropdown-toggle"
            >
              <div className="">
                <FaUsers className="feather feather-terminal" />
                <span>Clients</span>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`feather feather-chevron-right ${
                    expanded ? "open" : ""
                  }`}
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </a>
            <ul
              className={`collapse submenu list-unstyled ${
                expanded.clients ? "show" : ""
              }`}
              id="starter-kit"
              data-parent="#accordionExample"
            >
              <li>
                <Link to="categories"> Categories </Link>
              </li>
              <li>
                <Link to="activites"> Activites </Link>
              </li>
              <li>
                <Link to="clients"> Liste des clients </Link>
              </li>
            </ul>
          </li>

          <li className="menu">
            <a
              onClick={() => handleExpand("users")}
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-users"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>Utilisateurs</span>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </a>
            <ul
              className={`collapse submenu list-unstyled ${
                expanded.users ? "show" : ""
              }`}
              id="dashboard"
              data-parent="#accordionExample"
            >
              <li>
                <Link to="role"> Roles </Link>
              </li>
              <li>
                <Link to="utilisateurs"> Liste des utilisateurs </Link>
              </li>
            </ul>
          </li>

          <br />

          <li className="menu">
            <Link to="achat" aria-expanded="false" className="dropdown-toggle">
              <div className="">
                <BiPurchaseTagAlt />
                <span>Achat</span>
              </div>
            </Link>
          </li>

          <li className="menu">
            <a
              onClick={() => handleExpand("produits")}
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-box"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <span>Produits</span>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </a>
            <ul
              className={`collapse submenu list-unstyled  ${
                expanded.produits ? "show" : ""
              }`}
              id="invoice"
              data-parent="#accordionExample"
            >
              <li>
                <Link to="gammes"> Gammes </Link>
              </li>
              <li>
                <Link to="familles"> Familles </Link>
              </li>
              <li>
                <Link to="sous_familles"> Sous familles </Link>
              </li>
              <li>
                <Link to="marques"> Marques </Link>
              </li>
              <li>
                <Link to="Produits"> List des Produits </Link>
              </li>
            </ul>
          </li>

          <li className="menu">
            <a
              onClick={() => handleExpand("stock")}
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <div className="">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-layers"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline> 
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
                <span>stock</span>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </a>
            <ul
              className={`collapse submenu list-unstyled  ${
                expanded.stock ? "show" : ""
              }`}
              id="invoice"
              data-parent="#accordionExample"
            >
              <li>
                <Link to="camion">Camion </Link>
              </li>
              <li>
                <Link to="stockdepot">Dépôt </Link>
              </li>
            </ul>
          </li>


          <li className="menu">
            <a
              onClick={() => handleExpand("vente")}
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <div className="">
              <SlBasket />
                <span>Vente</span>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </a>
            <ul
              className={`collapse submenu list-unstyled  ${
                expanded.vente ? "show" : ""
              }`}
              id="invoice"
              data-parent="#accordionExample"
            >
              <li>
                <Link to="BondeLivraison"> Bonde de livraison </Link>
              </li>
              <li>
                <Link to="Commande"> Commande </Link>
              </li>
            </ul>
          </li>

            </ul>
      </nav>
    </div>
  );
}

export default SideBar;

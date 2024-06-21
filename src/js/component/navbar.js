import React, { useContext, useRef, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ImagenHome from "/workspaces/cris9898-starwars-blog/src/img/home.png"

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef(null);
	
  
	const handleClickOutside = (event) => {
	  if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
		setIsDropdownOpen(false);
	  }
	};
  
	const toggleDropdown = () => {
	  setIsDropdownOpen(!isDropdownOpen);
	};
  
	const handleRemoveFavorite = (event, favorite) => {
	  event.stopPropagation(); // Evita que el evento se propague al contenedor del dropdown
	  actions.removeFromFavorites(favorite);
	};
  
	useEffect(() => {
	  document.addEventListener("mousedown", handleClickOutside);
	  return () => {
		document.removeEventListener("mousedown", handleClickOutside);
	  };
	}, []);
 // /characters/:id
  
	
  return (
    <div className=" flex-grow-1 bg-dark custom-card contrastNormal">
      <div className="container">
        <nav className="navbar mb-3">
          <Link to="/">
            <img src={ImagenHome}/>
          </Link>
		  <div className="dropdown" ref={dropdownRef}>
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              onClick={toggleDropdown}
              aria-expanded={isDropdownOpen}
            >
              Favorites ❤️
            </button>
            <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
              {store.favorites.length === 0 ? (
                <li className="dropdown-item">Empty</li>
              ) : (
                store.favorites.map((favorite, index) => (
                  <li key={index} className="d-flex justify-content-between m-2">
                    <Link to={`/details/${favorite}`}>{favorite}</Link>
                    <button
                      className="btn btn-danger"
                      onClick={(event) => handleRemoveFavorite(event, favorite)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

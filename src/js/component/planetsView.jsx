import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const planetsView = ({ planets }) => {
  const { store, actions } = useContext(Context);
  const [planetsDetails, setPlanetsDetails] = useState({});
  const [isFavorite, setIsFavorite] = useState(false);
  const planetsImageSrc = `https://starwars-visualguide.com/assets/img/planets/${planets.uid}.jpg`;
    
  
  useEffect(() => {
    const fetchPlanetsInfo = async () => {
      const details = await actions.getPlanetsInfo(planets.uid);
      setPlanetsDetails(details);
    };

    fetchPlanetsInfo();
    setIsFavorite(store.favorites.includes(planets.name));
  }, [planets.uid, actions, store.favorites]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      actions.removeFromFavorites(planets.name);
    } else {
      actions.addToFavorites(planets.name);
    }
    setIsFavorite(!isFavorite);
  };

  const handleImageError = (e) => {
    e.target.src = "https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png/revision/latest?cb=20131214162357";
  };

  
  return (
    <div className="card-group">
      <div className="card custom-card">
      <img
          src={planetsImageSrc}
          className="card-img-top img"
          onError={handleImageError}
          
        />
        <div className="card-body">
          <h5 className="card-title mb-3">{planets.name}</h5>
          <span className="card-text">
            <div className="d-flex gap-1">
              <label>Population:</label>
              <p>{planetsDetails.population}</p>
            </div>
            <div className="d-flex gap-1">
              <label>Terrain:</label>
              <p>{planetsDetails.terrain}</p>
            </div>
          </span>
          <div className="d-flex justify-content-between">
          <Link to={`/planets/${planets.uid}`} className="btn btn-primary">
              Learn More!
            </Link>
            <button
            className={`btn btn-glow btn-secondary fs-5 ${isFavorite ? "text-danger" : ""}`}
            onClick={handleFavoriteClick}
            >
                ♡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default planetsView;

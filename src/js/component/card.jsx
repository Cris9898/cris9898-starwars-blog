import React, {useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";



const overView = ({character}) => {
 
  const {store, actions} = useContext(Context);
  const [characterDetails, setCharacterDetails] = useState({});
  const characterImageSrc = `https://starwars-visualguide.com/assets/img/characters/${character.uid}.jpg`;
  const [isFavorite, setIsFavorite] = useState(false);
  
  
  useEffect(() => {
    const fetchCharacterInfo = async () => {
      const details = await actions.getCharacterInfo(character.uid);
      setCharacterDetails(details);
    };

    fetchCharacterInfo();

    
    setIsFavorite(store.favorites.includes(character.name));
  }, [character.uid, actions, store.favorites]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      actions.removeFromFavorites(character.name);
    } else {
      actions.addToFavorites(character.name);
    }
    setIsFavorite(!isFavorite);
  };


  return (
    <div className="card-group ">
      <div className="card custom-card ">
        
        <img
          src={characterImageSrc}
          className="card-img-top img"
          
        />
        <div className="card-body">
          <h5 className="card-title mb-3">{character.name}</h5>
          <span className="card-text">
            <div className="d-flex gap-1">
              <label>Gender:</label>
              <p>{characterDetails.gender || "Loading..."}</p>
            </div>
            <div className="d-flex gap-1">
              <label>Hair Color:</label>
              <p>{characterDetails.hair_color || "Loading..."}</p>
            </div>
            <div className="d-flex gap-1">
              <label>Eye-Color:</label>
              <p>{characterDetails.eye_color || "Loading..."}</p>
            </div>
          </span>
          <div className="d-flex justify-content-between">
            <Link to={`/characters/${character.uid}`} className="btn btn-primary">
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

export default overView;
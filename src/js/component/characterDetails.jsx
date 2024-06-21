// src/views/CharacterDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const CharacterDetails = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const [characterDetails, setCharacterDetails] = useState({});
  const characterImageSrc = `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;

  useEffect(() => {
    const fetchCharacterInfo = async () => {
      const details = await actions.getCharacterInfo(id);
      setCharacterDetails(details);
    };

    fetchCharacterInfo();
  }, [id, actions]);

  return (
    <div className=" container border bg-dark character-details  d-flex justify-content-around custom-card align-items-center">
        <img src={characterImageSrc} className="imgAnimation imgInvidividual" />
        <div className="text-white mb-4">
            <h2>{characterDetails.name || "Loading..."}</h2>
            <div className="border-top ">
                <p>Gender: {characterDetails.gender || "Loading..."}</p>
                <p>Hair Color: {characterDetails.hair_color || "Loading..."}</p>
                <p>Eye Color: {characterDetails.eye_color || "Loading..."}</p>
                <p>Birth Year: {characterDetails.birth_year || "Loading..."}</p>
                <p>Height: {characterDetails.height || "Loading..."}</p>
                <p>Mass: {characterDetails.mass || "Loading..."}</p>
                <p>Skin Color: {characterDetails.skin_color || "Loading..."}</p>
            </div>
            
        
        </div>
      
    </div>
  );
};

export default CharacterDetails;
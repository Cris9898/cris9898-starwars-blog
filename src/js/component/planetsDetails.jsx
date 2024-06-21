import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

const CharacterDetails = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const [planetsDetails, setPlanetsDetails] = useState({});
  const planetsImageSrc = `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;

  useEffect(() => {
    const fetchPlanetsInfo = async () => {
      const details = await actions.getPlanetsInfo(id);
      setPlanetsDetails(details);
    };

    fetchPlanetsInfo();
  }, [id, actions]);

  const handleImageError = (e) => {
    e.target.src = "https://static.wikia.nocookie.net/esstarwars/images/b/b0/Tatooine_TPM.png/revision/latest?cb=20131214162357";
  };

  return (
    <div className=" container border bg-dark character-details  d-flex justify-content-around custom-card align-items-center">
        <img src={planetsImageSrc} className="imgAnimation imgInvidividual" onError={handleImageError}/>
        <div className="text-white mb-4">
            <h2>{planetsDetails.name || "Loading..."}</h2>
            <div className="border-top ">
               <p>Climate: {planetsDetails.climate || "Loading..."}</p>
               <p>Diameter: {planetsDetails.diameter || "Loading..."}</p>
               <p>Population: {planetsDetails.population || "Loading..."}</p>
               <p>Terrain: {planetsDetails.terrain || "Loading..."}</p>
               <p>Orbital Period: {planetsDetails.orbital_period || "Loading..."}</p>
            </div>
            
        
        </div>
      
    </div>
  );
};

export default CharacterDetails;
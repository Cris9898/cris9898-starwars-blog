import React, {useContext} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import CharacterView from "../component/card.jsx"
import PlanetsView from "../component/planetsView.jsx"
import ImagenCharacter from "/workspaces/cris9898-starwars-blog/src/img/characters.png"
import ImagenPlanets from "/workspaces/cris9898-starwars-blog/src/img/Planets.png";

export const Home = () => {
	const {store} =  useContext(Context);
	

	return(
		<div className="container-fluid ">
			<h2 className=" m-4 ">
				<img src={ImagenCharacter}/>
			</h2>
			<div className="d-flex overflow-auto gap-3 ">
				{store.character.map((character) => {
				return (
					<div key={character.uid} >
						<CharacterView character={character}/>
					</div>
					
				);
				})}
			</div>
			<h2 className=" m-4 ">
				<img src={ImagenPlanets}/>
			</h2>
			<div className="d-flex overflow-auto gap-3">
				{store.planets.map((planets) => {
				return (
					<div key={planets.uid} >
						<PlanetsView planets={planets}/>
					</div>
					
				);
				})}
			</div>
		</div>

	)
};

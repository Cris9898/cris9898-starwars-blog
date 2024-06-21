const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			connection: [],
			character: [],
			characterInfo:[],
			apiURL: "https://www.swapi.tech/api/",
			planets:[],
			planetsInfo:[],
			favorites:[]
		},
		actions: {
			
			getApi: async () => {
				const store = getStore();
				

				try {
					const response = await fetch(store.apiURL);
					if (!response.ok) {
						throw new error ("No se cargo la API");
					}
					const data = await response.json();
					
					setStore({connection: data.connection});
					
					
				} catch (error) {
					console.log("Entro en el catch de getApi");
					console.log(error);
				}
			},

			getCharacter: async () => {
				const store = getStore();
				

				try {
					const response = await fetch(store.apiURL + "people/");
					if (!response.ok) {
						throw new error ("No se cargo la API");
					}
					const data = await response.json();
					
					
					setStore({character: data.results});
					
					
					
				} catch (error) {
					console.log("Entro en el catch de getcharacter");
					console.log(error);
				}
			},
			getCharacterInfo: async (id) => {
				const store = getStore();
				

				try {
					const response = await fetch(store.apiURL + `people/${id}/` );
					if (!response.ok) {
						throw new error ("No se cargo la API");
					}
					const data = await response.json();
					
					
					return data.result.properties;
					
				} catch (error) {
					console.log("Entro en el catch de getcharacterinfo");
					console.log(error);
				}
			},

			getPlanets: async () => {
				const store = getStore();
				

				try {
					const response = await fetch(store.apiURL + "planets/");
					if (!response.ok) {
						throw new error ("No se cargo la API");
					}
					const data = await response.json();
					
					
					setStore({planets: data.results});
					
					
					
					
				} catch (error) {
					console.log("Entro en el catch de getPlanets");
					console.log(error);
				}
			},
			getPlanetsInfo: async (id) => {
				const store = getStore();
				

				try {
					const response = await fetch(store.apiURL + `planets/${id}/` );
					if (!response.ok) {
						throw new error ("No se cargo la API");
					}
					const data = await response.json();
					
					
					return data.result.properties;
					
					
				} catch (error) {
					console.log("Entro en el catch de getPlanetsinfo");
					console.log(error);
				}
			},
			addToFavorites: (name) => {
				const store = getStore();
				if (!store.favorites.includes(name)) {
				  const updatedFavorites = [...store.favorites, name];
				  setStore({ favorites: updatedFavorites });
				}
			  },
		
			  removeFromFavorites: (name) => {
				const store = getStore();
				const updatedFavorites = store.favorites.filter(
				  (favorite) => favorite !== name
				);
				setStore({ favorites: updatedFavorites });
			  }
			
		}
	};
};

export default getState;

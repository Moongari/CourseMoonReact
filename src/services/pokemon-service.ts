import { throws } from "assert";
import Pokemon from "../models/pokemon";
import POKEMONS from "../models/mock-pokemon";
export default class PokemonService {

  static pokemons: Pokemon[] = POKEMONS;

  static isDev = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development');


  static getPokemons(): Promise<Pokemon[]> {
    if (this.isDev) {
      return fetch('http://localhost:3001/pokemons')
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }
    return new Promise(resolve => {
      resolve(this.pokemons);
    });
  }

  static getPokemon(id: number): Promise<Pokemon | undefined> {
    if (this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${id}`)
        .then(response => response.json())
        .then(data => this.isEmpty(data) ? null : data)
        .catch(error => this.handleError(error));
    }
    return new Promise(resolve => {
      resolve(this.pokemons.find(pokemon => id === pokemon.id));
    });
  }


  //mise a jour d'un pokemon
  static updatePokemon(pokemon: Pokemon): Promise<Pokemon> {
    if (this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${pokemon.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(pokemon),
          headers: { 'content-Type': 'application/json' }
        })
        .then(Response => Response.json())
        .catch(error => this.handleError(error));
    }
    return new Promise(resolve => {
      const { id } = pokemon;
      const index = this.pokemons.findIndex(pokemon => pokemon.id === id);
      this.pokemons[index] = pokemon;
      resolve(pokemon);
    });


  }
  // renvoie un objet vide si le pokemon a bien ete supprimé
  static deletePokemon(pokemon: Pokemon): Promise<{}> {
    if (this.isDev) {
      return fetch(`http://localhost:3001/pokemons/${pokemon.id}`,

        {
          method: 'DELETE',
          headers: { 'content-Type': 'application/json' }
        })
        .then(response => response.json())
        .catch(error => this.handleError(error))
    }

    return new Promise(resolve => {
      const { id } = pokemon;
      this.pokemons = this.pokemons.filter(pokemon => pokemon.id !== id);
      resolve({});
    });
  }


  // ajout d'un Pokemon
  static addPokemon(pokemon: Pokemon): Promise<Pokemon> {

    delete pokemon.created;
    if (this.isDev) {
      return fetch(`http://localhost:3001/pokemons`,
        {
          method: 'POST',
          body: JSON.stringify(pokemon),
          headers: { 'content-Type': 'application/json' }
        })
        .then(response => response.json())
        .catch(error => this.handleError(error));
    }

 return new Promise(resolve => {    
      this.pokemons.push(pokemon);
      resolve(pokemon);
    });
  }


  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error: Error): void {
    console.error(error);
  }


  //mode de recherche..
  static searchPokemon(term: string): Promise<Pokemon[]> {
    if(this.isDev) {
    return fetch(`http://localhost:3001/pokemons?q=${term}`)
      .then(response => response.json())
      .catch(error => this.handleError(error));
    }
    return new Promise(resolve => {    
      const results = this.pokemons.filter(pokemon => pokemon.name.includes(term));
      resolve(results);
    });
  }



}
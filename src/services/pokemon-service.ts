import { throws } from "assert";
import Pokemon from "../models/pokemon";
 
export default class PokemonService {
 
  static getPokemons(): Promise<Pokemon[]> {
    return fetch('http://localhost:3001/pokemons')
      .then(response => response.json())
      .catch(error=>this.handleError(error));
  }
 
  static getPokemon(id: number): Promise<Pokemon|null> {
    return fetch(`http://localhost:3001/pokemons/${id}`)
      .then(response => response.json())
      .then(data => this.isEmpty(data) ? null : data)
      .catch(error=>this.handleError(error));
      
  }


  //mise a jour d'un pokemon
  static updatePokemon(pokemon:Pokemon): Promise<Pokemon>
  {
      return fetch(`http://localhost:3001/pokemons/${pokemon.id}`,
      {
        method:'PUT',
        body:JSON.stringify(pokemon),
        headers:{'content-Type':'application/json'}
      })
      .then(Response=>Response.json())
      .catch(error=>this.handleError(error));
      


  }
// renvoie un objet vide si le pokemon a bien ete supprimé
  static deletePokemon(pokemon:Pokemon):Promise<{}>
  {
    return fetch(`http://localhost:3001/pokemons/${pokemon.id}`,
    
    {
      method:'DELETE',
      headers:{'content-Type':'application/json'}
  })
  .then(response=>response.json())
  .catch(error=>this.handleError(error))
}


// ajout d'un Pokemon
static addPokemon(pokemon:Pokemon):Promise<Pokemon>
{
  
  delete pokemon.created;
  
   return fetch(`http://localhost:3001/pokemons`,
  {
    method:'POST',
    body:JSON.stringify(pokemon),
    headers:{'content-Type':'application/json'}
  })
  .then(response=>response.json())
  .catch(error=>this.handleError(error));
  
}
 

  static isEmpty(data: Object): boolean {
    return Object.keys(data).length === 0;
  }

  static handleError(error:Error):void{
      console.error(error);
  }
}
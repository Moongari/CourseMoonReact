import React, { FunctionComponent, useState, useEffect } from 'react';
import Pokemon from '../models/pokemon';
import PokemonCard from '../components/pokemon-card';
import PokemonService from '../services/pokemon-service';

  
const PokemonList: FunctionComponent = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  
  useEffect(() => {

    PokemonService.getPokemons().then(pokemons=>setPokemons(pokemons));
   
  }, []);

 
  
  return (
    <div>
      <h1 className="center">--POKEMONS-- </h1>
      <div className="container"> 
        <div className="row"> 
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} /> // ici on utilise le composant PokemonCard en lui passant une props represantant le pokemon a affiche
        ))}
        </div>
      </div>
    </div> 
  );
}
  
export default PokemonList;
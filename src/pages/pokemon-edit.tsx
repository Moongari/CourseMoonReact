import React, { FunctionComponent, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import Loader from '../components/loader';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';
import PokemonService from '../services/pokemon-service';
 
type Params = { id: string };
  
const PokemonEdit: FunctionComponent<RouteComponentProps<Params>> = ({ match }) => {
    
  const [pokemon, setPokemon] = useState<Pokemon|null>(null);
  //le + permet de convertir la chaine de caractere en un number
  useEffect(() => {
    PokemonService.getPokemon(+match.params.id).then(pokemon=>setPokemon(pokemon));
  }, [match.params.id]);

  const isPokemonIdExist =():boolean=>{
    if(match.params.id !== null){
      return true;
    }else{
      return false;
    }
  }
    
  return (
    <div>
      { pokemon ? (
        <div className="row">
            <h2 className="header center">Modifier le pokemon : { pokemon.name }</h2>
            <PokemonForm pokemon={pokemon} hasNewPok={false}></PokemonForm>
        </div>
      ) : (
        <h4 className="center"><Loader/></h4>
      )}
    </div>
  );
}
  
export default PokemonEdit;
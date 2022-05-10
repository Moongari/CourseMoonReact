import React,{FunctionComponent, useState} from "react";
import formatDate from "../helpers/format-date";
import formatType from "../helpers/format-Type";
import Pokemon from "../models/pokemon";
import './pokemon-card.css';
import {useHistory} from 'react-router-dom';

//on definit un type via typeScript pour etre sur de ne passer qu'une props de type Pokemon
type Props ={
    pokemon:Pokemon,
    backgroundcolor?: string //variable facultative
};

//passage d'une props au parametre qui correspond a notre composant
//composant enfant 
const PokemonCard : FunctionComponent<Props>=({pokemon,backgroundcolor="gray"})=>{

    const[color,setColor] = useState<string>();
    const history = useHistory();

    const showBorder = ()=>{
        setColor(backgroundcolor);
      
    }

    const showMessage =()=>{
      setColor(backgroundcolor);
      alert("Hello "+ color);
    }

    const hideBorder=()=>{
        setColor("white"); // on remet la couleur white
    }

    
    const goToPokemon = (id?:number)=>{
      history.push(`/pokemons/${id}`);
    }

    return(
    <div className="col s6 m4" onClick={()=>goToPokemon(pokemon.id)}  onMouseEnter={showBorder} onMouseLeave={hideBorder}>
        
      <div className="card horizontal" style={{backgroundColor:color}}>
        <div className="card-image"> 
          <img src={pokemon.picture} alt={pokemon.name}/>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{pokemon.name}</p>
            <p><small>{formatDate(pokemon.created)}</small></p>

            {pokemon.types.map(type =>(
              <span key={type} className={formatType(type)}>{type}</span>
            ))}
          
          </div>
        </div>
      </div> 
    </div>

    );
}

export default PokemonCard;
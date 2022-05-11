import React,{FunctionComponent, useState} from "react";
import formatDate from "../helpers/format-date";
import Pokemon from "../models/pokemon";
import './pokemon-card.css';

//on definit un type via typeScript pour etre sur de ne passer qu'une props de type Pokemon
type Props ={
    pokemon:Pokemon,
    borderColor?: string //variable facultative
};


const PokemonCardBorder : FunctionComponent<Props> =({pokemon,borderColor="gray"})=>{

    const [color,setColor] = useState<string>();

    const showBorder= ()=>{
        setColor("red");
    }

    const hideBorder= ()=>{
        setColor("gray");
    }
    return(
        <div className="col s6 m4" onMouseEnter={showBorder} onMouseLeave={hideBorder}>
            
          <div className="card horizontal" style={{borderColor:color}}>
            <div className="card-image"> 
              <img src={pokemon.picture} alt={pokemon.name}/>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <p>{pokemon.name}</p>
                <p><small>{formatDate(pokemon.created)}</small></p>
              </div>
            </div>
          </div> 
        </div>
    
        );


}


export default PokemonCardBorder;




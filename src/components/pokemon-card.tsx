import React,{FunctionComponent, useState} from "react";
import Pokemon from "../models/pokemon";
import './pokemon-card.css';

//on definit un type via typeScript pour etre sur de ne passer qu'une props de type Pokemon
type Props ={
    pokemon:Pokemon,
    backgroundcolor?: string //variable facultative
};

//passage d'une props au parametre qui correspond a notre composant
//composant enfant 
const PokemonCard : FunctionComponent<Props>=({pokemon,backgroundcolor="gray"})=>{

    const[color,setColor] = useState<string>();

    const showBorder = ()=>{
        setColor(backgroundcolor);
      
    }

    const hideBorder=()=>{
        setColor("gris"); // on remet la couleur gris
    }

    return(
    <div className="col s6 m4" onMouseEnter={showBorder} onMouseLeave={hideBorder}>
        
      <div className="card horizontal" style={{backgroundColor:backgroundcolor }}>
        <div className="card-image"> 
          <img src={pokemon.picture} alt={pokemon.name}/>
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <p>{pokemon.name}</p>
            <p><small>{pokemon.created.toString()}</small></p>
          </div>
        </div>
      </div> 
    </div>

    );
}

export default PokemonCard;
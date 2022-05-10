import React,{FunctionComponent, useState} from "react";
import formatDate from "../helpers/format-date";
import formatType from "../helpers/format-Type";
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

    const showMessage =()=>{
      setColor(backgroundcolor);
      alert("Hello "+ color);
    }

    const hideBorder=()=>{
        setColor("white"); // on remet la couleur white
    }

    // const formatDate = (date: Date): string =>{
    //   return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
    // }

    // const formatType = (type: string): string => {
    //   let color: string;
     
    //   switch (type) {
    //     case 'Feu': 
    //       color = 'red lighten-1'; 
    //       break; 
    //     case 'Eau': 
    //       color = 'blue lighten-1'; 
    //       break; 
    //     case 'Plante': 
    //       color = 'green lighten-1'; 
    //       break; 
    //     case 'Insecte': 
    //       color = 'brown lighten-1'; 
    //       break; 
    //     case 'Normal': 
    //       color = 'grey lighten-3'; 
    //       break; 
    //     case 'Vol': 
    //       color = 'blue lighten-3'; 
    //       break; 
    //     case 'Poison': 
    //       color = 'deep-purple accent-1'; 
    //       break; 
    //     case 'Fée': 
    //       color = 'pink lighten-4'; 
    //       break; 
    //     case 'Psy': 
    //       color = 'deep-purple darken-2'; 
    //       break; 
    //     case 'Electrik': 
    //       color = 'lime accent-1'; 
    //       break; 
    //     case 'Combat': 
    //       color = 'deep-orange'; 
    //       break; 
    //     default: 
    //       color = 'grey'; 
    //       break; 
    //   }
     
    //   return `chip ${color}`;
    // }
    

    return(
    <div className="col s6 m4" onMouseEnter={showBorder} onMouseLeave={hideBorder}>
        
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
import React,{FunctionComponent} from "react";
import Pokemon from "../models/pokemon";

//on definit un type via typeScript pour etre sur de ne passer qu'une props de type Pokemon
type Props ={
    pokemon:Pokemon
};

//passage d'une props au parametre qui correspond a notre composant
const PokemonCard : FunctionComponent<Props>=({pokemon})=>{

    return(
        <div>

            Hey, ce composant est chargé d'afficher des pokémons..... :{pokemon.name}
            

        </div>

    );
}

export default PokemonCard;
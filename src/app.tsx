//import React from 'react'; // import du module react

/* ========  destructuring d'ecmaScript6   =============*/
import React,{FunctionComponent,useState,useEffect} from 'react'; 
import PokemonList from './pages/pokemon-list';

/* ======== useState import du Hook pour pour utiliser les states dans un composant de function ========= */

/* ======== FC signifie FonctionComponent composant sous la forme de fonction 
  ou composant sous forme de classe
c'est fonction est contenu dans une constante ========= */

const App: FunctionComponent = () => {
 return (
    <PokemonList />
 
 )
}
  
export default App; /* ====  permet d'exporter notre composant , il sera utilisable dans le reste de l'application ===*/
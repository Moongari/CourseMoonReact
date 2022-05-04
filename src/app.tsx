//import React from 'react'; // import du module react

/* ========  destructuring d'ecmaScript6   =============*/
import React,{FunctionComponent,useState,useEffect} from 'react'; 
import POKEMONS from './models/mock-pokemon';
import Pokemon from './models/pokemon';

/* ======== useState import du Hook pour pour utiliser les states dans un composant de function ========= */

/* ======== FC signifie FonctionComponent composant sous la forme de fonction 
  ou composant sous forme de classe
c'est fonction est contenu dans une constante ========= */

const App: FunctionComponent = () => {
/* ==== variable de type string qui contient la valeur react ===*/

/* ==== le Hooks useState renvoie un tableau de 2 elements le SetName permet de gerer l'etat  
nous creons une variable name est nous l'initialisons avec la variable React
===*/


/* ==== 3 etapes de la vie d'un composant 
1) la creation -> componentDidMount() insertion dans le dom 'Montage du composant'
2) modification 'componentDidUpdate(prevProps,prevState) recoit les props et state avant la mise a jour du composant
3) suppression d'un composant 'componentWillUnmount le composant est detruit lorsqu'il est retiré du DOM navigation de l'utilisateur par exemple
ceci permet de desabonner certaines dependance du composant. et ainsi eviter les problemes de performances. 'Demontage'
Cycle de vie Hook d'effet
componentDidMount()
componentDidUpdate(prevProps,prevState)
componentWillUnmount()

===*/
const[title,SetName] = useState<String>('POKEMONS'); // on definit un type les données String sauvegarder dans notre state
const[pokemons] = useState<Pokemon[]>(POKEMONS);
const[initListPokemon,SetInitListPokemon] = useState<Pokemon[]>([]);

useEffect(()=>{
  SetInitListPokemon(POKEMONS);
},[])

 return (
   
   <div>
     <div>
     <p><h2>NOMBRE DE {title} CONTENU DANS LA BASE :</h2></p>
   </div>
    <p><h3>il y a  {pokemons.length} Pokemons dans votre liste. !</h3> </p> 
    <p>{initListPokemon.length}</p>
   </div>
 
 )
}
  
export default App; /* ====  permet d'exporter notre composant , il sera utilisable dans le reste de l'application ===*/
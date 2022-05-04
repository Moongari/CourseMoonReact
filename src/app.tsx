//import React from 'react'; // import du module react

/* ========  destructuring d'ecmaScript6   =============*/
import React,{FunctionComponent,useState} from 'react'; 

/* ======== useState import du Hook pour pour utiliser les states dans un composant de function ========= */

/* ======== FC signifie FonctionComponent composant sous la forme de fonction 
  ou composant sous forme de classe
c'est fonction est contenu dans une constante ========= */

const App: FunctionComponent = () => {
/* ==== variable de type string qui contient la valeur react ===*/

/* ==== le Hooks useState renvoie un tableau de 2 elements le SetName permet de gerer l'etat  
nous creons une variable name est nous l'initialisons avec la variable React
===*/
const[name,SetName] = useState<String>('React'); // on definit un type les données String sauvegarder dans notre state
    
 return (
  <h1>Hello, {name} !</h1>  /* ==== utilisation de javascript dans jsx. ===*/
 )
}
  
export default App; /* ====  permet d'exporter notre composant , il sera utilisable dans le reste de l'application ===*/
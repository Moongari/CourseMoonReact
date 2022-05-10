//import React from 'react'; // import du module react

/* ========  destructuring d'ecmaScript6   =============*/
import React,{FunctionComponent,useState,useEffect} from 'react'; 
import { BrowserRouter as Router, Switch,Route,Link } from 'react-router-dom';
import PokemonsDetail from './pages/pokemon-detail';
import PokemonList from './pages/pokemon-list';
import PageNotFound from './pages/page-not-found';

/* ========Mise en place de la gestion des routes dans notre application dans le fichier app ========= */



const App: FunctionComponent = () => {
 return (
   <Router>
      <div>
        {/** barre de navigation ****/}
        <nav>
        <div className="nav-wrapper teal">
          <Link to="/" className="brand-logo center">Pokemoon</Link>
        </div>
        </nav>
               {/** systeme de route de notre application ****/}
               <Switch>
                 <Route exact path="/" component = {PokemonList}/>
                 <Route exact path="/pokemons" component = {PokemonList}/>
                 <Route exact path="/pokemons/:id" component = {PokemonsDetail}/>
                <Route component={PageNotFound}/> 
               </Switch>
      </div>
   </Router>
  
 
 )
}
  
export default App; /* ====  permet d'exporter notre composant , il sera utilisable dans le reste de l'application ===*/
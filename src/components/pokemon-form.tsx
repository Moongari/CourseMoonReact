import React, { FunctionComponent,useState } from 'react';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-Type';
import {useHistory} from 'react-router-dom';
import PokemonService from '../services/pokemon-service';
  
type Props = {
  pokemon: Pokemon
  hasNewPok:boolean
};

// on definit ici un objet de type Field qui va permettre de valider et mettre a jour chaque champs du formulaire
type Field={
    value?:any,
    error?:string,
    isValid?:boolean
}



// on definit un objet form qui correspond au champs du formulaire
type Form ={
  picture:Field,
    name:Field,
    hp:Field,
    cp:Field,
    types:Field
}
  
const PokemonForm: FunctionComponent<Props> = ({pokemon,hasNewPok}) => {
  
  const types: string[] = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
  ];




  //on crée un hook history
  const history = useHistory();

  const [form,SetForm] = useState<Form>({
    picture:{value:pokemon.picture},
    name:{value:pokemon.name,isValid:true},
    hp:{value:pokemon.hp,isValid:true},
    cp:{value:pokemon.cp,isValid:true},
    types:{value:pokemon.types,isValid:true}
  });

  const hasType = (type:string):boolean=>{
      //includes de javaScript renvoie un boolean si la valeur correspond au type
      return form.types.value.includes(type);
  }

  const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
      const fieldName : string = e.target.name;
      const fieldValue: string = e.target.value;
      const newField: Field = {[fieldName]:{value:fieldValue}};
      //cette synthaxe d'ecmaScript 6 permet de ne mettre a jour que les élements qui ont changé et transmet
      //ces valeurs des elements de l'objet newField dans l'objet form.
      SetForm({...form,...newField});
  }

  //ici nous declarons une methode selectType qui va verifier si l'utilisateur a coche la case ou pas
  // cette methode recupere les valeurs si celle ci sont coches et les sauvegarde dans un objet newField
  //ensuite les restitue a notre state form par le biais du setForm et mets a jour les elements du tableau types d'un pokemon.
  const selectType =(type:string,e:React.ChangeEvent<HTMLInputElement>):void=>{
      const checked = e.target.checked;
      let newField:Field;

      if(checked){
          //concat en javaScript permet de fusionner 2 tableaux.
          const newTypes: string[] = form.types.value.concat([type]);
          newField={value:newTypes};
      }else{
          //la methode filter permet de retirer un type si l'utilisateur decoche la case 
          const newTypes:string[] = form.types.value.filter((currentType:string)=> currentType !== type);
        newField ={value:newTypes};
      }
//mise a jour du state
      SetForm({...form,...{types:newField}});
  }

//on crée un evenement au moment de la validation du formulaire.
  const handleSubmit =(e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault(); // on bloque le comportement natif du formulaire afin de le gerer nous meme.

    const isFormValid = validateForm();
    //alert(isFormValid);
    if(isFormValid)
    {
        pokemon.picture= form.picture.value;
        pokemon.name= form.name.value;
        pokemon.hp = form.hp.value;
        pokemon.cp = form.cp.value;
        pokemon.types= form.types.value;
        
        hasNewPok ? addPokemon():updatePokemon();
        
    }
 
   

  }

  const addPokemon=()=>{
    PokemonService.addPokemon(pokemon).then(()=>history.push('/pokemons'));
  }
  const updatePokemon=()=>{
    PokemonService.updatePokemon(pokemon).then(()=>history.push(`/pokemons/${pokemon.id}`));
  }

  const isAddForm = ()=>{
    return !hasNewPok;
  }




  const validateForm=()=>{
      let newForm: Form = form;

      if(isAddForm()){
        const start = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
        const end =".png";

        if(!form.picture.value.startsWith(start) || !form.picture.value.endsWith(end)){
          const errorMsg: string ="une erreur dans votre url ";
          const newField:Field = {value:form.picture.value,error:errorMsg,isValid:false}
        }else{
          const newField : Field ={value:form.picture.value,error:'',isValid:true}
          newForm={...form,...{picture:newField}};
        }
      }

      //Validation du name
    if(!/^[a-zA-Zàéè ]{3,25}$/.test(form.name.value)){
        const errMsg: string = 'le nom du pokemon est requis (1-25).';
        const newField: Field ={value:form.name.value,error:errMsg,isValid:false};
        alert(errMsg + ""+ newField.isValid);
        newForm ={...newForm,...{name:newField}};
    }else{
        const newField:Field = {value:form.name.value, error:'',isValid:true};
        newForm ={...newForm,...{name:newField}};
    }

        //Validation du hp
        if(!/^[0-9]{1,3}$/.test(form.hp.value)){
            const errMsg: string = 'les points de vie du pokemon sont compris entre 0 et 999';
            const newField: Field ={value:form.hp.value,error:errMsg,isValid:false};
            newForm ={...newForm,...{name:newField}};
        }else{
            const newField:Field = {value:form.hp.value, error:'',isValid:true};
            newForm ={...newForm,...{name:newField}};
        }

           //Validation du cp
        if(!/^[0-9]{1,2}$/.test(form.cp.value)){
            const errMsg: string = 'les degats du pokemon sont compris entre 0 et 99';
            const newField: Field ={value:form.cp.value,error:errMsg,isValid:false};
            newForm ={...newForm,...{name:newField}};
        }else{
            const newField:Field = {value:form.cp.value, error:'',isValid:true};
            newForm ={...newForm,...{name:newField}};
        }


          

        SetForm(newForm);
        // renvoie un boolean 
        return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;

  }


// verifie si l'utilisateur n'a selectionné aucun type ou plus que 3 types 
  const isTypeValid =(type:string):boolean =>{

    if(form.types.value.length === 1 && hasType(type)){
        return false;
    }
    if(form.types.value.length >= 3 && !hasType(type)){
        return false;
    }

    return true;
  }
   
//methode delete Pokemon
  const deletePokemon =() =>{
    PokemonService.deletePokemon(pokemon).then(()=>history.push('/pokemons'));
  }


  return (
    <form onSubmit={e=>handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable"> 

          {!hasNewPok && (
            <div className="card-image">
              <img src={pokemon.picture} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
              <span className="btn-floating btn-medium waves-effect waves-light red right">
                <i onClick={deletePokemon} className="matieral-icons">-</i>
              </span>
            </div>
            )}

            <div className="card-stacked">
              <div className="card-content">
             
                { !isAddForm() && (
    
                    <div className="form-group">
                    <label htmlFor="name">Image</label>
                    <input id="picture" name="picture" type="text" className="form-control" value={form.picture.value} onChange={e=>handleInputChange(e)}></input>
                          {
                          form.picture.error && 
                              <div className='card-panel red accent-1'>
                              {form.picture.error}
                              </div>
                          }
                  </div>

                 )}


                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input id="name" name="name" type="text" className="form-control" value={form.name.value} onChange={e=>handleInputChange(e)}></input>
                        {
                        form.name.error && 
                            <div className='card-panel red accent-1'>
                            {form.name.error}
                            </div>
                        }
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input id="hp" type="text" name="hp" className="form-control" value={form.hp.value} onChange={e=>handleInputChange(e)}></input>
                        {
                        form.hp.error && 
                            <div className='card-panel red accent-1'>
                            {form.hp.error}
                            </div>
                        }
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input id="cp" type="text" name="cp" className="form-control" value={form.cp.value} onChange={e=>handleInputChange(e)}></input>
                        {
                        form.cp.error && 
                            <div className='card-panel red accent-1'>
                            {form.cp.error}
                            </div>
                        }
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map(type => (
                    <div key={type} style={{marginBottom: '10px'}}>
                      <label>
                        <input id={type} type="checkbox" className="filled-in" value={type} disabled={!isTypeValid(type)}checked={hasType(type)} onChange={e=> selectType(type,e)}></input>
                        <span>
                          <p className={formatType(type)}>{ type }</p>
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-action center">
                {/* Submit button */}
                <button type="submit" className="btn">Valider</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
   
export default PokemonForm;
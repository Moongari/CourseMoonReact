import React, { FunctionComponent,useState } from 'react';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-Type';
import {useHistory} from 'react-router-dom';
  
type Props = {
  pokemon: Pokemon
};

type Field={
    value?:any,
    error?:string,
    isValid?:boolean
}

type Form ={
    name:Field,
    hp:Field,
    cp:Field,
    types:Field
}
  
const PokemonForm: FunctionComponent<Props> = ({pokemon}) => {
  
  const types: string[] = [
    'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
    'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
  ];

  //on crée un hook history
  const history = useHistory();

  const [form,SetForm] = useState<Form>({
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
    console.log(form);
    history.push(`/pokemons/${pokemon.id}`);
  }
   
  return (
    <form onSubmit={e=>handleSubmit(e)}>
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card hoverable"> 
            <div className="card-image">
              <img src={pokemon.picture} alt={pokemon.name} style={{width: '250px', margin: '0 auto'}}/>
            </div>
            <div className="card-stacked">
              <div className="card-content">
                {/* Pokemon name */}
                <div className="form-group">
                  <label htmlFor="name">Nom</label>
                  <input id="name" name="name" type="text" className="form-control" value={form.name.value} onChange={e=>handleInputChange(e)}></input>
                </div>
                {/* Pokemon hp */}
                <div className="form-group">
                  <label htmlFor="hp">Point de vie</label>
                  <input id="hp" type="number" name="hp" className="form-control" value={form.hp.value} onChange={e=>handleInputChange(e)}></input>
                </div>
                {/* Pokemon cp */}
                <div className="form-group">
                  <label htmlFor="cp">Dégâts</label>
                  <input id="cp" type="number" name="cp" className="form-control" value={form.cp.value} onChange={e=>handleInputChange(e)}></input>
                </div>
                {/* Pokemon types */}
                <div className="form-group">
                  <label>Types</label>
                  {types.map(type => (
                    <div key={type} style={{marginBottom: '10px'}}>
                      <label>
                        <input id={type} type="checkbox" className="filled-in" value={type} checked={hasType(type)} onChange={e=> selectType(type,e)}></input>
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
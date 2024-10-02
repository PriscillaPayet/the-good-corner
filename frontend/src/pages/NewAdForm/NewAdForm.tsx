import { useEffect, useState } from "react";
import { CategoryProps } from "../../components/Category/Category";
import axios from "axios";



function NewAdForm () {

    
    const [title, setTitle]=useState("");
    const [description, setDescription]=useState("");
    const [price, setPrice]=useState(0);
    const [location, setLocation]=useState("");
    const [picture, setPicture]=useState("");
    const [owner, setOwner]=useState("");
    const [category_id, setCategory_id]= useState<number>(); 

    const [categories, setCategories] = useState<CategoryProps[]>([]);
    useEffect(() => {
        async function fetch(){
            const result = await axios.get<CategoryProps[]>(
                "http://127.0.0.1:5000/categories"
            );
            setCategories(result.data);
      if (result.data.length !== 0) {
        setCategory_id(result.data[0].id);
      }
    }
    fetch();
  }, []);


    const handleSubmit = (e: { preventDefault: () => void; }) =>{
        e.preventDefault() //Empêche le comportement par défaut de soumission du formulaire :rechargement de la page
          // Affiche les valeurs dans la console 
          console.log({
            title,
            description,
            price,
            location,
            picture,
            owner,
            category_id
        });
    };
 
    return (
        <form onSubmit={handleSubmit} >
            <label >Titre de l&apos;annonce: <br />
                <input className="text-field" type="text" value={title} onChange={e=>setTitle(e.target.value)} />
            </label> <br />
            <label >Description: <br />
                <input className="text-field" type="text" value={description} onChange={e=>setDescription(e.target.value)} />
            </label> <br />
            <label >Prix: <br />
                <input className="text-field" type="number" value={price} onChange={e=>setPrice(Number(e.target.value))} />
            </label> <br />
            <label >Localisation <br />
                <input className="text-field" type="text" value={location} onChange={e=>setLocation(e.target.value)} />
            </label> <br />
            <label >Photo: <br />
                <input className="text-field" type="text" value={picture} onChange={e=>setPicture(e.target.value)} />
            </label> <br />
            <label >Vendeur: <br />
                <input className="text-field" type="text" value={owner} onChange={e=>setOwner(e.target.value)} />
            </label> <br />
            <label>
          Catégorie :
          <select
            value={category_id}
            onChange={(e) => setCategory_id(Number(e.target.value))}
          >
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
            <button className="button">Créer mon annonce</button>
        </form>

    )
   
   
   }
   
   export default NewAdForm;
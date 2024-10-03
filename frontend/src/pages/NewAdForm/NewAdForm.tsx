import { useEffect, useState } from "react";
import { CategoryProps } from "../../components/Category/Category";
import axios from "axios";
import { AdProps } from "../../components/AdDetails/AdDetails";
import { useNavigate } from "react-router-dom";

export type TagProps = {
  id: number;
  name: string;
};

function NewAdForm() {
  const [title, setTitle] = useState("test");
  const [description, setDescription] = useState("test");
  const [price, setPrice] = useState<string>("0.00");
  const [location, setLocation] = useState("test");
  const [picture, setPicture] = useState("test");
  const [owner, setOwner] = useState("test");
  const [ownerEmail, setOwnerEmail] = useState("test@gmail.com");
  const [category_id, setCategory_id] = useState<number>(1);
  const [tags_ids, setTags_ids] = useState<number[]>([]);

  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [tags, setTags] = useState<TagProps[]>([]);

  const navigate = useNavigate();
  
  useEffect(() => {
    async function fetch() {
      const categoryResult = await axios.get<CategoryProps[]>(
        "http://127.0.0.1:5000/categories"
      );
      setCategories(categoryResult.data);
      if (categoryResult.data.length !== 0) {
        setCategory_id(categoryResult.data[0].id);
      }
      const tagsResult = await axios.get<TagProps[]>("http://127.0.0.1:5000/tags");
      setTags(tagsResult.data);
    }
    fetch();
  }, []);

  const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    // Conversion du prix en centimes avant l'envoi au serveur
    const priceInCents = Math.round(parseFloat(price) * 100);


    try {
      const result = await axios.post<AdProps>("http://localhost:5000/ads", {
        title,
        description,
        price: priceInCents,
        location,
        picture,
        owner,
        ownerEmail,
        category: category_id ? { id: category_id } : null,
        tags: tags_ids.map((id) => ({ id })),
      });
      console.log(result.data);
      navigate(`/ad/${result.data.id}`, { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.error("Erreur de la requête :", err.response?.data); // Afficher l'erreur du serveur
      } else {
        console.error("Erreur inconnue :", err);
      }
    }
  };

  const handleChecked = (tagId: number) => {
    const newTagsIds = [...tags_ids];

    const index = newTagsIds.indexOf(tagId);
    if (index > -1) {
      // Si le tag est déjà présent, on le retire
      newTagsIds.splice(index, 1);
    } else {
      // Sinon, on l'ajoute
      newTagsIds.push(tagId);
    }

    setTags_ids(newTagsIds);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Titre de l&apos;annonce: <br />
        <input className="text-field" type="text" value={title} onChange={e => setTitle(e.target.value)} />
      </label> <br />
      <label>Description: <br />
        <input className="text-field" type="text" value={description} onChange={e => setDescription(e.target.value)} />
      </label> <br />
      <label>Prix: <br />
        <input className="text-field" type="number" value={price} onChange={e => setPrice((e.target.value))} />
      </label> <br />
      <label>Localisation <br />
        <input className="text-field" type="text" value={location} onChange={e => setLocation(e.target.value)} />
      </label> <br />
      <label>Photo: <br />
        <input className="text-field" type="text" value={picture} onChange={e => setPicture(e.target.value)} />
      </label> <br />
      <label>Nom du Vendeur: <br />
        <input className="text-field" type="text" value={owner} onChange={e => setOwner(e.target.value)} />
      </label> <br />
      <label>Adresse e-mail du vendeur: <br />
        <input className="text-field" type="text" value={ownerEmail} onChange={e => setOwnerEmail(e.target.value)} />
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
      <br />
      <div>
        Tags :
        {tags.map((tag) => (
          <label key={tag.id}>
            <input
              type="checkbox"
              checked={tags_ids.includes(tag.id)}
              onChange={() => handleChecked(tag.id)}
            />
            {tag.name}
          </label>
        ))}
      </div>
      <button className="button">Créer mon annonce</button>
    </form>
  );
}

export default NewAdForm;

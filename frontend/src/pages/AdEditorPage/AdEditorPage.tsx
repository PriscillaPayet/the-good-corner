import { useEffect, useState } from "react";
import { AdType, CategoryType, TagType } from "../../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CATEGORIES, GET_TAGS, GET_AD, GET_ADSCARDS } from "../../api/graphql_queries";
import { CREATE_AD, UPDATE_AD } from "../../api/graphql_mutations";
import { CategoryEditor } from "../../components/CategoryEditor";
import { TagEditor } from "../../components/TagEditor";

export function AdEditorPage() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const id = params.id && Number(params.id);

  const { data } = useQuery<{ ad: AdType }>(GET_AD, {
    variables: {
      adId: id,
    },
    skip: !id, // La requête ne s'exécute que si l'ID est défini
  });

  const ad = data?.ad;

  const [error, setError] = useState<string>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState("");
  const [owner_email, setOwner_email] = useState("");
  const [owner, setOwner] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>();
  const [tagsIds, setTagsIds] = useState<number[]>([]);

  useEffect(() => {
    if (ad) {
      console.log("Données de l'annonce :", ad);  // Vérifie la structure de `ad`
    console.log("Location de l'annonce :", ad.location); // Vérifie si `location` est bien présente
      setTitle(ad.title || "");
      setDescription(ad.description || "");
      setPrice(ad.price || 0);
      setLocation(ad.location || "");
      setPicture(ad.picture || "");
      setOwner(ad.owner|| "");
      setOwner_email(ad.owner_email || "");
      setCategoryId(ad.category?.id || null);
      setTagsIds(ad.tags.map(tag => tag.id) || []); // Simplification
    }
  }, [ad]);

  const { data: categoriesData } = useQuery<{ categories: CategoryType[] }>(GET_CATEGORIES);
  const categories = categoriesData?.categories;

  useEffect(() => {
    if (categories && categories.length && !categoryId) {
      setCategoryId(categories[0].id); // Sélectionne la première catégorie si aucune n'est sélectionnée
    }
  }, [categories, categoryId]);

  const { data: tagsData } = useQuery<{ tags: TagType[] }>(GET_TAGS);
  const tags = tagsData?.tags;

  const [doCreateAd, { loading: createLoading }] = useMutation<{ createAd: AdType }>(CREATE_AD, {
    refetchQueries: [GET_ADSCARDS],
  });

  const [doUpdateAd, { loading: updateLoading }] = useMutation<{ updateAd: AdType }>(UPDATE_AD, {
    refetchQueries: [GET_ADSCARDS, GET_AD],
  });

  const loading = createLoading || updateLoading;


  async function doSubmit() {
    
    setError(undefined);
    if (!title || !categoryId) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    console.log("Ad object avant mutation :", ad);
  

    try {
      const variables = {
        data: {
          title,
          description,
          price,
          location,
          picture,
          owner,
          owner_email,
          category: categoryId ? { id: categoryId } : null,
          tags: tagsIds.map((id) => ({ id })),
        },
      };
  
      if (ad) {
        const { data } = await doUpdateAd({
          variables: {
            updateAdId: id, 
            data: variables.data,
          },
        });
        
        navigate(`/ad/${data?.updateAd.id}`, { replace: true });
      } else {
        const { data } = await doCreateAd({
          variables,
        });
        navigate(`/ad/${data?.createAd.id}`, { replace: true });
      }
    } catch (err) {
      console.error("Erreur lors de la soumission : ", err);
      setError("Une erreur est survenue lors de l'enregistrement.");
    }
  }

  const [showCategoryEditor, setShowCategoryEditor] = useState(false);
  const [showTagEditor, setShowTagEditor] = useState(false);

  return (
    <div className="form-container">
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h2>{ad ? "Modifier mon annonce" : "Créer une nouvelle annonce"}</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        doSubmit();
      }}>
        {/* Champs de formulaire */}
        <label className="label">
          Quel est le titre de l'annonce? * :
          <input
            className="text-field"
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label className="label">
          Prix :
          <input
            className="text-field"
            type="number"
            value={price || 0} // Valeur par défaut si price est null ou undefined
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
        <br />
        <label className="label">
          Description :
          <input
            className="text-field"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br />
        <label className="label">
          Localisation :
          <input
            className="text-field"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <br />
        <label className="label">
          Image (URL) :
          <input
            className="text-field"
            type="text"
            value={picture}
            onChange={(e) => setPicture(e.target.value)}
          />
        </label>
        <br />
        <label className="label">
          Nom du Vendeur:
          <input
            className="text-field"
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </label>
        <br />
        <label className="label">
          Adresse e-mail du vendeur:
          <input
            className="text-field"
            type="text"
            value={owner_email}
            onChange={(e) => setOwner_email(e.target.value)}
          />
        </label>
        <br />
        <label className="label">
          Catégorie :
          <select
            className="select-field"
            value={categoryId ?? ""} //// Transforme null en chaîne vide
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            {categories?.map((category) => (
              <option value={category.id || ""} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => setShowCategoryEditor(!showCategoryEditor)}
        >
          {showCategoryEditor ? "Cacher" : "Nouvelle catégorie"}
        </button>
        {showCategoryEditor && (
          <CategoryEditor
            onCategoryCreated={async (id) => {
              setShowCategoryEditor(false);
              setCategoryId(id);
            }}
          />
        )}
        <br />
        <div className="checkbox-container">
          <span>Tags :</span>
          {tags?.map((tag) => (
            <label key={tag.id}>
              <input
                type="checkbox"
                checked={tagsIds.includes(tag.id)}
                onChange={() => {
                  setTagsIds((prevTagsIds) =>
                    prevTagsIds.includes(tag.id)
                      ? prevTagsIds.filter((id) => id !== tag.id)
                      : [...prevTagsIds, tag.id]
                  );
                }}
              />
              <span className="checkbox-label">{tag.name}</span>
            </label>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowTagEditor(!showTagEditor)}
        >
          {showTagEditor ? "Cacher" : "Nouveau tag"}
        </button>
        {showTagEditor && (
          <TagEditor
            onTagCreated={async (id) => {
              setShowTagEditor(false);
              setTagsIds((prevTagsIds) => [...prevTagsIds, id]);
            }}
          />
        )}
        <br />
        <br />
        <button className="button">{ad ? "Modifier mon annonce" : "Créer mon annonce"}</button>
        {loading && <p>Envoi...</p>}
      </form>
    </div>
  );
}
export default AdEditorPage;

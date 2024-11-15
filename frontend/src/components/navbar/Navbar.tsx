import '../../index.css';
import Category, { CategoryProps } from '../Category/Category';
import { useEffect, useState } from 'react';
import { GET_CATEGORY, GET_NAVCATEGORIES } from '../../api/graphgl';
import { useQuery, useApolloClient } from '@apollo/client'; 
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const client = useApolloClient(); // je récupère le client parce que j'en ai besoin ds ma fonction handleclik
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_NAVCATEGORIES); // Requête pour récupérer les catégories

    useEffect(() => {
        if (data && data.categories) {
            setCategories(data.categories); // Si les données sont chargées, on met à jour l'état des catégories
        }
    }, [data]);

    const handleClick = async (categoryId: number, name: string): Promise<void> => {
        try {
            // Utilise le client Apollo pour effectuer la requête GET_CATEGORY avec la variable categoryId
            const { data: categoryData } = await client.query({
                query: GET_CATEGORY,
                variables: { categoryId }, // Envoie la catégorie ID
            });

            console.log('Résultats de la requête :', categoryData); // Affiche les données récupérées

            // Après avoir récupéré les données, on navigue vers la page de la catégorie
            navigate(`/ads/category/${categoryId}/${name}`);
        } catch (err) {
            console.error('Erreur lors de la requête :', err); // Gestion des erreurs si la requête échoue
        }
    };

    // Gestion du rendu en cas de chargement ou d'erreur
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <nav className="categories-navigation">
            {categories.length === 0 ? (
                <div>Aucune catégorie disponible</div> // Si aucune catégorie n'est disponible
            ) : (
                categories.map((category) => (
                    <div key={category.id} onClick={() => handleClick(category.id, category.name)}>
                        <Category name={category.name} id={category.id} />
                    </div>
                ))
            )}
        </nav>
    );
}

export default Navbar;

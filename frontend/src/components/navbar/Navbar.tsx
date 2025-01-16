import '../../index.css';
import NavCategory, { CategoryProps } from '../NavCategory/NavCategory';
import { useEffect, useState } from 'react';
import { GET_CATEGORIES} from '../../api/graphql_queries'; // Assurez-vous que cette requête existe
import {  useQuery } from '@apollo/client';
import {  useNavigate } from 'react-router-dom';
import React from 'react';


function Navbar() {
    const [categories, setCategories] = useState<CategoryProps[]>([]);
    const navigate = useNavigate();
    
    // Requête pour récupérer les catégories
    const { loading, error, data } = useQuery(GET_CATEGORIES);

    useEffect(() => {
        if (data && data.categories) {
            setCategories(data.categories); // Met à jour l'état avec les catégories récupérées
        }
    }, [data]);

    // Fonction pour gérer le clic sur une catégorie et rediriger vers la page des annonces
    const handleClick = (categoryId: number, name: string): void => {
        // Navigate vers la page des annonces en passant l'ID et le nom de la catégorie
        navigate(`/ads/category/${categoryId}/${name}`);
    };

    if (loading) return <div>Loading categories...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <nav className="categories-navigation">
            {categories.length === 0 ? (
                <div>Aucune catégorie disponible</div> // Si aucune catégorie n'est disponible
            ) : (
                categories.map((category, index) => (
                    <React.Fragment key={category.id}>
                        <div onClick={() => handleClick(category.id, category.name)}>
                            <NavCategory name={category.name} id={category.id} />
                        </div>
                        {/* Ajouter le point entre les catégories, sauf après la dernière */}
                        {index < categories.length - 1 && <span className="separator">•</span>}
                    </React.Fragment>
                ))
            )}
        </nav>
    );
}

export default Navbar;

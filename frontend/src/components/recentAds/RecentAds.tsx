import { useEffect, useState } from 'react';
import '../../index.css'
import AdCard, { AdCardProps } from '../AdCard/AdCard';
import {  useQuery } from '@apollo/client';
import { GET_ADSCARDS } from '../../api/graphgl';

function RecentAds() {
    const [ads, setAds]=useState<AdCardProps[]>([]);
        

    //total initialisé à 0
    const [total, setTotal] = useState(0);
    const { loading, error, data } = useQuery(GET_ADSCARDS);


    // Met à jour l'état 'ads' lorsque les données sont disponibles
    useEffect(() => {
        if (data && data.ads) {
            setAds(data.ads);
        }
    }, [data]);


    // ajouter le prix au total
    //cette fonction est défini dans le composant parent pour pouvoir être utilisée dans l'enfant et que l'enfant remonte l'information au clic
    const addToTotal = (price: number) => {
        // Utilisation de la fonction setTotal pour mettre à jour l'état 'total'.
        setTotal((total) => total + price);
    };

    // Gestion du chargement et des erreurs
    if (loading) return <p>Chargement des annonces...</p>;
    if (error) return <p>Erreur : {error.message}</p>;
 

    return (
        <>
            <h2>Annonces récentes</h2>
            <p>Prix total: {total} €</p>
            <section className="recent-ads">
                {ads.map((ad) => (
                    <div key={ad.id}>
                        <AdCard
                            id={ad.id}                        
                            title={ad.title}
                            picture={ad.picture}
                            price={ad.price}
                            // 'addToTotal' est passée en tant que prop ici, pour permettre au composant enfant 'AdCard' de l'utiliser.
                            addToTotal={addToTotal} />
                    </div>
                ))}

            </section>
        </>
    )
};

export default RecentAds;
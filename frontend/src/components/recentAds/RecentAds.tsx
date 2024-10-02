import { useEffect, useState } from 'react';
import '../../index.css'
import AdCard, { AdCardProps } from '../AdCard/AdCard';
import axios from 'axios';

function RecentAds() {

  

    const [ads, setAds]=useState<AdCardProps[]>([]);
        

    //total initialisé à 0
    const [total, setTotal] = useState(0);
    useEffect (()=> {
        const fetchData = async () => {
            try {
                const result = await axios.get<AdCardProps[]>("http://127.0.0.1:5000/ads");
                setAds(result.data)
            } catch (err) {
                console.log("error", err)
            }
        };
        fetchData();
    }, [])

    // ajouter le prix au total
    //cette fonction est défini dans le composant parent pour pouvoir être utilisé dans l'enfant et que l'enfant remonte l'information au clic
    const addToTotal = (price: number) => {
        // Utilisation de la fonction setTotal pour mettre à jour l'état 'total'.
        setTotal((total) => total + price);
    };
 

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
                            link={ad.link}
                            // 'addToTotal' est passée en tant que prop ici, 
                            // pour permettre au composant enfant 'AdCard' de l'utiliser.
                            addToTotal={addToTotal} />
                    </div>
                ))}

            </section>
        </>
    )
};

export default RecentAds;
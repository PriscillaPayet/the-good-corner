import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdCard from "./AdCard/AdCard";
import { GET_CATEGORYADS } from "../api/graphql_queries";
import { useQuery } from "@apollo/client";
import { AdType } from "../types/types";


function AdsByCategory () {

    const { id, name } = useParams<{ id: string; name:string }>()
    const [ads, setAds] = useState<AdType[]>([]);

    const { loading, error, data } = useQuery(GET_CATEGORYADS, {
      variables: { categoryId: id},
       fetchPolicy: 'cache-and-network'
    });

    useEffect(() => {
      if (data && data.category && data.category.ads) {
        setAds(data.category.ads); // Met à jour les annonces dans l'état
    }
}, [data]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return(
        <>
            <h2 className="ad-card-detail-title">Annonces de la catégorie {name}</h2>

            <section className="recent-ads">
                {ads.map((ad) => (
                    <div key={ad.id}>
                        <AdCard
                            id={ad.id}
                            title={ad.title}
                            picture={ad.picture}
                            price={ad.price} 
                            // addToTotal={function (): void {
                            //     throw new Error("Function not implemented.");
                            // } }   -> retrait de addToTotal pour le moment
                        />
                    </div>
                ))}

            </section>
        </>

    )


}

export default AdsByCategory
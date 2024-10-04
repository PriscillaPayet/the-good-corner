import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdProps } from "./AdDetails/AdDetails";
import axios from "axios";
import AdCard from "./AdCard/AdCard";


function AdsByCategory () {

    const { id, name } = useParams<{ id: string; name:string }>()
    const [ads, setAds] = useState<AdProps[]>([]);

    useEffect(() => {
        const fetchAds = async () => {
          try {
            const result = await axios.get(`http://127.0.0.1:5000/ads/category/${id}`);
            setAds(result.data);
          } catch (err) {
            console.log("Error fetching ads", err);
          }
        };
    
        fetchAds();
      }, [id]);

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
                            price={ad.price} addToTotal={function (): void {
                                throw new Error("Function not implemented.");
                            } }                           />
                    </div>
                ))}

            </section>
        </>

    )


}

export default AdsByCategory
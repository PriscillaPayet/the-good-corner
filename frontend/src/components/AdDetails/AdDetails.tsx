import { useEffect, useState } from 'react';
import '../../index.css'

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

export type AdProps = {
    created_at: Date;
    id:number;
    title: string;
    description: string;
    owner: string;
    ownerEmail: string;
    picture: string;
    price: number;
    location: string;
    category_id: number

};

function AdDetails(){



    const {id} = useParams();
    const [ad, setAd] = useState<AdProps>();
    const navigate = useNavigate(); // Hook pour la redirection

    useEffect (()=> {
        const fetchData = async () => {
            try {
                const result = await axios.get<AdProps>(`http://127.0.0.1:5000/ads/${id}`);
               console.log(result); 
               setAd(result.data);
            } catch (err) {
                console.log("error", err)
            }
        };
        fetchData();
    }, [id])

    const handleDelete = async (id: number) => {
        try {
            const result = await axios.delete(`http://127.0.0.1:5000/ads/${id}`);
            console.log("deleted",result);
            alert("Annonce supprimée");
            navigate("/");

        } catch (err) {
            console.log (err)
        }
    }

    return (

     <> 
        {ad ?(
            <div>
                <h2 className='ad-card-title'>{ad.title}</h2>
                <section className="ad-details">
                    <div className='ad-details-image-container'>
                        <img src={ad.picture} alt={ad.title} className='ad-details-image'/>
                    </div>
                    <div className='ad-details-info'>
                        <p className='ad-details-price'>{(ad.price/100).toFixed(2) }€</p>
                        <p >{ad.description}</p>
                        <hr className="separator" />
                        <div className="ad-details-owner">
                            <p>Annonce publiée par {ad.owner} le {new Date(ad.created_at).toLocaleDateString('fr-FR', { 
                                                                                                                day: 'numeric', 
                                                                                                                month: 'long', 
                                                                                                                year: 'numeric' 
                                                                                                                })}.</p>
                        </div>
                        <Link to={`mailto:${ad.ownerEmail}`} className="button button-primary link-button">
                            Envoyer un email
                        </Link>
                        <button onClick={()=>handleDelete(ad.id)} className="button button-primary link-button">
                            Supprimer cette annonce
                    </button>
                    </div>
                    
                    
                    
                </section>
            </div>
        )
        : ( <p>annonce non trouvée</p>)
        }
    </>
      );
}

export default AdDetails;
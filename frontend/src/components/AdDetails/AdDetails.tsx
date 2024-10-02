import { useEffect, useState } from 'react';
import '../../index.css'

import { useParams } from "react-router-dom";
import axios from 'axios';

export type AdProps = {
    id:number;
    title: string;
    description: string;
    owner: string;
    picture: string;
    price: number;
    location: string

};

function AdDetails(){



    const {id} = useParams();
    const [ad, setAd] = useState<AdProps>();

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

    return (

        <div className='ad-details'>
            {ad ?(
                <>
            <h2 className='ad-card-title'>{ad.title}</h2>
            <div className='ad-details-image-container'>
                <img src={ad.picture} alt={ad.title} className='ad-details-image'/></div>
            <div className='ad-details-info'>
                <p >{ad.description}</p>
             <p className='ad-details-price'>{(ad.price/100).toFixed(2) }€</p>
             </div>
             </>
        )
        : (
            <p>annonce non trouvée</p>
        )}
        </div>
      );
}

export default AdDetails;
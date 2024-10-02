import '../../index.css'
import { Link } from 'react-router-dom';

export type AdCardProps = {
    id:number;
    title: string;
    picture: string;
    price: number;

}
//le composant enfant prend recupère les props passées par son parent RencentAds, dont la fonction callBack addTototal
//on utilise un type intersection = plusieurs types ensemble: (AdCardProps & { addToTotal: (price: number) => void }) pour s'assurer que la fonction addToTotal est bien passée en prop.
function AdCard({ title, picture, price, id, addToTotal }: AdCardProps & { addToTotal: (price: number) => void }) {

    return (
        <div className="ad-card-container" key={id}>
            <Link className="ad-card-link" to={`/ad/${id}`}>
                <img className="ad-card-image" src={picture} />
                <div className="ad-card-text">
                    <div className="ad-card-title">{title}</div>
                    <div className="ad-card-price">
                    {(price / 100).toFixed(2)} €
                    </div>
                </div>
            </Link>
            <button 
                className="button"
                onClick={() => addToTotal(price)}
                > Ajouter le prix au total</button>
        </div>
    )

}

export default AdCard
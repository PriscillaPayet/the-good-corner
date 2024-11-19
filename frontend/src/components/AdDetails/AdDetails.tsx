import { useEffect, useState } from 'react';
import '../../index.css';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/client';
import { GET_AD} from '../../api/graphql_queries';
import { AdType } from '../../types/types';
import { DELETE_AD } from '../../api/graphql_mutations';

function AdDetails() {
    const params = useParams<{ id: string }>();
    const id = params.id ? Number(params.id) : null;
    const [ad, setAd] = useState<AdType | undefined>();
    const navigate = useNavigate();

    if (!id) {
        return <p>Annonce introuvable : ID non valide.</p>;
    }

    const { loading, error, data } = useQuery(GET_AD, {
        variables: { adId: id },
        fetchPolicy: 'cache-and-network',
    });

    const [doDelete] = useMutation(DELETE_AD, {
        update(cache) {
            cache.modify({
                fields: {
                    ads(existingAds = [], { readField }) {
                        return existingAds.filter((adRef: any) => readField('id', adRef) !== id);
                    },
                },
            });
        },
    });

    useEffect(() => {
        if (data?.ad) {
            setAd(data.ad);
        }
    }, [data]);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error.message}</div>;

    async function handleDelete() {
        try {
            await doDelete({ variables: { id } });
            console.log("supprimée")
            navigate("/", { replace: true });
        } catch (err) {
            console.error(err);
        }
    }

    function onUpdate() {
        navigate(`/ad/${id}/edit`);
    }

    if (!ad) return <p>Annonce introuvable</p>;

    return (
        <div className="ad-card-details-container">
            <h2 className="ad-card-detail-title">{ad.title}</h2>
            <h3>{ad.tags && ad.tags.length > 0 ? ad.tags.map(tag => tag.name).join(", ") : 'Pas de tags'}</h3>
            <section className="ad-details">
                <div className="ad-details-image-container">
                    <img src={ad.picture || '/default-image.png'} alt={ad.title || 'Annonce'} className="ad-details-image" />
                </div>
                <div className="ad-details-info">
                    <p className="ad-details-price">{(ad.price / 100).toFixed(2)}€</p>
                    <p>{ad.description}</p>
                    <hr className="separator" />
                    <div className="ad-details-owner">
                        <p>Annonce publiée par {ad.owner || 'Utilisateur inconnu'}</p>
                    </div>
                    <Link to={`mailto:${ad.ownerEmail || ''}`} className="button  link-button">
                        Envoyer un email
                    </Link>
                    <button onClick={handleDelete} className="button button-primary link-button">
                        Supprimer cette annonce
                    </button>
                    <button className="button button-primary link-button" onClick={onUpdate}>Modifier l'annonce</button>
                </div>
            </section>
        </div>
    );
}

export default AdDetails;

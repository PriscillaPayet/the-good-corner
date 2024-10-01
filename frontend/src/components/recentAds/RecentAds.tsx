import '../app/App.css'
import AdCard, { AdCardProps } from '../adcard/AdCard';

function RecentAds() {

    const ads:AdCardProps[] = [
        {
            title: "Table",
            imgUrl:"../../public/table.webp",
            price: 120 ,
            link: "/ads/table",
        },
        {
            title: "Dame-jeanne",
            imgUrl:"../../public/dame-jeanne.webp",
            price: 75 ,
            link: "/ads/dame-jeanne",
        }

    ]

    return (
        <>
            <h2>Annonces récentes</h2>
            <section className="recent-ads">
                { ads.map((ad)=> (
                    <AdCard 
                        title = {ad.title}
                        imgUrl={ad.imgUrl}
                        price={ad.price}
                        link={ad.link}
                        key={ad.title}
                />
                ))}
                
                {/* <div className="ad-card-container">
                    <a className="ad-card-link" href="/ads/vide-poche">
                        <img className="ad-card-image" src="/images/vide-poche.webp" />
                        <div className="ad-card-text">
                            <div className="ad-card-title">Vide-poche</div>
                            <div className="ad-card-price">4 €</div>
                        </div>
                    </a>
                </div>
                <div className="ad-card-container">
                    <a className="ad-card-link" href="/ads/vaisselier">
                        <img className="ad-card-image" src="/images/vaisselier.webp" />
                        <div className="ad-card-text">
                            <div className="ad-card-title">Vaisselier</div>
                            <div className="ad-card-price">900 €</div>
                        </div>
                    </a>
                </div>
                <div className="ad-card-container">
                    <a className="ad-card-link" href="/ads/bougie">
                        <img className="ad-card-image" src="/images/bougie.webp" />
                        <div className="ad-card-text">
                            <div className="ad-card-title">Bougie</div>
                            <div className="ad-card-price">8 €</div>
                        </div>
                    </a>
                </div> */}
                
            </section>
        </>
    )
};

export default RecentAds;
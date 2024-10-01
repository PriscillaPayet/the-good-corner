import '../app/App.css'
import NavLink, { NavLinkProps } from '../navlink/Navlink'

function Navbar() {

    const links: NavLinkProps[] = [
        {
            title: "Ameublement",
        },
        {
            title: "Électroménager",
        },
        {
            title: "Photographie",
        },
        {
            title: "Téléphonie",
        },
        {
            title: "Vélos",
        },
        {
            title: "Véhicules",
        },
        {
            title: "Sport",
        },
        {
            title: "Habillement",
        },
        {
            title: "Bébé",
        },
        {
            title: "Outillage",
        },
        {
            title: "Service",
        },
        {
            title: "Vacances",
        },


    ]


    return (



        <nav className="categories-navigation">
            {links.map((link) => (
                <NavLink
                    title={link.title}
                    key={link.title} />
            ))}

            {/* <a href="" className="category-navigation-link">Ameublement</a> •
            <a href="" className="category-navigation-link">Électroménager</a> •
            <a href="" className="category-navigation-link">Photographie</a> •
            <a href="" className="category-navigation-link">Informatique</a> •
            <a href="" className="category-navigation-link">Téléphonie </a> •
            <a href="" className="category-navigation-link">Vélos</a> •
            <a href="" className="category-navigation-link">Véhicules</a> •
            <a href="" className="category-navigation-link">Sport</a> •
            <a href="" className="category-navigation-link">Habillement</a> •
            <a href="" className="category-navigation-link">Bébé</a> •
            <a href="" className="category-navigation-link">Outillage</a> •
            <a href="" className="category-navigation-link">Services </a> •
            <a href="" className="category-navigation-link">Vacances</a> */}
        </nav>)

};

export default Navbar
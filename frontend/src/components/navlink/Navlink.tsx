import '../app/App.css'

export type NavLinkProps = {
    title: string;

}

function NavLink({ title }: NavLinkProps) {
    return (
        <>
            <a href="" className="acategory-navigation-link" >{title}</a> •
        </>
    )

}

export default NavLink
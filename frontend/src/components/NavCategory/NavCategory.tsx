import { Link } from 'react-router-dom';
import '../../index.css'

export type CategoryProps = {
    id:number;
    name:string;
  

}

function NavCategory({ name }: CategoryProps) {
    return (
        <>
        <Link to="" className="category-navigation-link" >{name}</Link> 
      
        </>
    )

}

export default NavCategory
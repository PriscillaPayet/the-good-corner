import axios from 'axios';
import '../../index.css'
import Category, { CategoryProps } from '../Category/Category'
import { useEffect, useState } from 'react';
import { AdProps } from '../AdDetails/AdDetails';
import { useNavigate } from 'react-router-dom';



function Navbar() {
    

    const [categories, setCategories]=useState<CategoryProps[]>([]);
    const navigate = useNavigate(); 

    useEffect (()=> {
        const fetchData = async () => {
            try {
                const result = await axios.get<CategoryProps[]>("http://127.0.0.1:5000/categories");
                setCategories(result.data)
            } catch (err) {
                console.log("error", err)
            }
        };
        fetchData();
    }, [])

    const handleClick = async (id: number, name:string): Promise<void> =>{

        try {
            //je récupère l'id cliqué
            console.log(id)
            const result = await axios.get<AdProps[]>(`http://127.0.0.1:5000/ads/category/${id}`);
            console.log(result.data)
            navigate(`/ads/category/${id}/${name}`);
        }catch (err){
            console.log(err)

        }
        
    
    }

    return (


        <nav className="categories-navigation">
            
            
            {categories.map((category) => (
                <div key={category.id} onClick={() => handleClick(category.id, category.name)}>
                    <Category
                        name={category.name}
                        id={category.id}
                         />
                </div>
                
           
            ))}
          
       
        </nav>)

};

export default Navbar
import axios from 'axios';
import '../../index.css'
import Category, { CategoryProps } from '../Category/Category'
import { useEffect, useState } from 'react';




function Navbar() {

    const [categories, setCategories]=useState<CategoryProps[]>([]);

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

    return (


        <nav className="categories-navigation">
            
            
            {categories.map((category) => (
                <div key={category.id}>
                    <Category
                        name={category.name}
                        id={category.id} />
                </div>
                
           
            ))}
          
       
        </nav>)

};

export default Navbar
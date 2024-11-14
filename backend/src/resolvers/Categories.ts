import { Arg, ID, Mutation, Query, Resolver } from "type-graphql";
import { Category, CategoryCreateInput, CategoryUpdateInput } from "../entities/Category";

@Resolver()
export class CategoriesResolver {
    @Query(()=> [Category])
    async categories(): Promise <Category[]> {
        const categories = await Category.find({
         relations: {
            ads: true,
         }   
        });
         
        return categories;
    }
    
    @Query (() => Category, {nullable: true})
    async category(@Arg('id', () => ID) id: number): Promise<Category | null>{
        const category = await Category.findOne({ 
            where: {id},
            relations: {
                ads: {
                    tags: true,
                },
            },  
        })
        if (category !== null){
        return (category)
        } else {
            return null
        }
    }  
    
    @Mutation(() => Category)
    async createCategory(@Arg('data', () => CategoryCreateInput) data:CategoryCreateInput): Promise<Category>{
    const newCategory = new Category();
    Object.assign(newCategory, data);
    await newCategory.save();
    return (newCategory); 
    }

    @Mutation(() => Category, { nullable: true })
    async deleteCategory(@Arg('id', () => ID) id: number): Promise<Category | null>{
        const category = await Category.findOne({ 
            where: {id} })
        if (category ){
            await  category.remove();
            return category;
        } else {
            return null
        }

    }
    
    @Mutation(() => Category, { nullable: true })
    async updateCategory(
        @Arg('id', () => ID) id: number,
        @Arg('data',() => CategoryUpdateInput, { nullable: true }) data: CategoryUpdateInput
    ): Promise<Category | null> {
        // Rechercher la catégorie par ID
        const category = await Category.findOne({ where: { id } });
        
        // Si la catégorie n'existe pas, retourner null
        if (!category) {
            return null;
        }
        Object.assign(category, data);
        await category.save();
        return category;
    }
    


}
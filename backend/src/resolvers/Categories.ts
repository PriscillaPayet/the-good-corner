import { Arg, Ctx, ID, Mutation, Query, Resolver, Authorized } from "type-graphql";
import { Category, CategoryCreateInput, CategoryUpdateInput } from "../entities/Category";
import { User } from "../entities/User"; 
import { validate } from "class-validator";
import { getUserFromContext } from "../auth";
// On retire l'importation de RoleType
// import { RoleType } from "../entities/User"; 

@Resolver()
export class CategoriesResolver {
    // Requête pour récupérer toutes les catégories
    @Query(() => [Category])
    async categories(): Promise<Category[]> {
        const categories = await Category.find({
            relations: {
                ads: true, // Inclure les annonces dans la relation
            }
        });

        return categories;
    }

    // Requête pour récupérer une catégorie par son ID
    @Query(() => Category, { nullable: true })
    async category(@Arg('id', () => ID) id: number): Promise<Category | null> {
        const category = await Category.findOne({
            where: { id },
            relations: {
                ads: {
                    tags: true, // Inclure les tags des annonces
                },
            },
        })
        if (category !== null) {
            return category;
        } else {
            return null;
        }
    }

    // Mutation pour créer une nouvelle catégorie
    @Mutation(() => Category)
    async createCategory(
        @Arg('data', () => CategoryCreateInput) data: CategoryCreateInput, 
        @Ctx() context: { user: User; req: any; res: any } 
    ): Promise<Category> {
        // Utilisez getUserFromContext pour extraire l'utilisateur du contexte
        const user = await getUserFromContext(context);
        
        if (!user) {
            throw new Error("Utilisateur non authentifié");
        }
    
        const newCategory = new Category();
        Object.assign(newCategory, data);
        newCategory.createdBy = user;
    
        // Sauvegarder la catégorie dans la base de données
        await newCategory.save();
        return newCategory;
    }

    // Mutation pour supprimer une catégorie (avec vérification du rôle admin)
    @Mutation(() => Category, { nullable: true })
    // Remplacer @Authorized(RoleType.ADMIN) par un simple rôle string, comme "admin"
    @Authorized("admin") // Protéger cette mutation avec le rôle "admin"
    async deleteCategory(
        @Arg('id', () => ID) id: number, // L'ID de la catégorie à supprimer
        @Ctx() context: { user: User; req: any; res: any } // Contexte pour récupérer l'utilisateur connecté
    ): Promise<Category | null> {
        const user: User = context.user; // Récupérer l'utilisateur depuis le contexte

        // Trouver la catégorie par ID
        const category = await Category.findOne({ where: { id } });

        // Si la catégorie existe, la supprimer et la retourner
        if (category) {
            await category.remove();
            return category;
        } else {
            return null;
        }
    }

    // Mutation pour mettre à jour une catégorie (avec vérification du rôle admin)
    @Mutation(() => Category, { nullable: true })
    // Remplacer @Authorized(RoleType.ADMIN) par un simple rôle string, comme "admin"
    @Authorized("admin") // Protéger cette mutation avec le rôle "admin"
    async updateCategory(
        @Arg('id', () => ID) id: number, // L'ID de la catégorie à mettre à jour
        @Arg('data', () => CategoryUpdateInput, { nullable: true }) data: CategoryUpdateInput, // Les nouvelles données
        @Ctx() context: { user: User; req: any; res: any } // Contexte pour récupérer l'utilisateur connecté
    ): Promise<Category | null> {
        const user: User = context.user; // Récupérer l'utilisateur depuis le contexte

        // Rechercher la catégorie par ID
        const category = await Category.findOne({ where: { id } });

        // Si la catégorie n'existe pas, retourner null
        if (!category) {
            return null;
        }

        // Assigner les nouvelles données à la catégorie
        Object.assign(category, data);

        // Validation des données de la catégorie
        const errors = await validate(category);
        if (errors.length > 0) {
            throw new Error("Les données de la catégorie ne sont pas valides");
        }

        // Sauvegarder la catégorie mise à jour
        await category.save();
        return category;
    }
}

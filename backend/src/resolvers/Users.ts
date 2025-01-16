import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { validate } from "class-validator";
import { User, UserCreateInput} from "../entities/User";
import * as argon2 from "argon2";
import { sign } from "jsonwebtoken";
import Cookies from "cookies";
import { getUserFromContext } from "../auth";

// Résolveur pour gérer les utilisateurs
@Resolver()
export class UsersResolver {
    // Mutation pour créer un utilisateur
    @Mutation(() => User)
    async createUser(
        @Arg("data") data: UserCreateInput, // Données d'entrée pour créer un utilisateur
        @Ctx() context: {
            user: User; req: any; res: any 
} // Le contexte pour récupérer l'utilisateur authentifié
    ): Promise<User> {

        const errors = await validate(data);
        if (errors.length > 0) {
          throw new Error(`Validation error: ${JSON.stringify(errors)}`);
        }
    
        // Optionnel : Vérifier si l'utilisateur authentifié est un admin pour autoriser la création d'un admin
        const user: User = context.user;
    
        // Si l'utilisateur authentifié n'est pas admin, on lève une erreur (vous pouvez personnaliser la logique)
        if (user && !user.roles.includes('admin')) {
            throw new Error("Seuls les administrateurs peuvent créer des administrateurs");
        }
    
    
        // Créer un nouvel utilisateur avec les données de l'input
        const newUser = new User();
        newUser.email = data.email;
        newUser.roles = data.roles || ["user"]; // Si aucun rôle n'est spécifié, il obtient le rôle "user" par défaut
    
        // Si le rôle "admin" est inclus dans les données, l'utilisateur aura ce rôle
        if (data.roles && data.roles.includes('admin')) {
            newUser.roles = ["admin"]; // Assurer que le rôle admin est appliqué
        }
    
        // Hachage du mot de passe avec Argon2
        newUser.hashedPassword = await argon2.hash(data.password); // Utilisation d'Argon2 pour hasher le mot de passe
    
        
    
        // Sauvegarder l'utilisateur dans la base de données
        await newUser.save();
    
        // Retourner le nouvel utilisateur
        return newUser;
    }

    // Mutation pour la connexion de l'utilisateur
    @Mutation(() => User, { nullable: true })
    async signin(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() context: { req: any, res: any }
    ): Promise<User | null> {
        try {
            const user = await User.findOneBy({ email });

            if (user && await argon2.verify(user.hashedPassword, password)) {
                // Générer le token JWT
                const token = sign(
                    { id: user.id, roles: user.roles },
                    process.env.JWT_SECRET_KEY!,
                    { expiresIn: '72h' }
                );

                // Sauvegarder le token dans un cookie sécurisé
                const cookies = new Cookies(context.req, context.res);
                cookies.set('token', token, {
                    secure: false,    // en production, utilisez 'true'
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 72 // Durée de vie du cookie: 3 jours
                });

                return user;
            } else {
                return null; // Échec de la connexion
            }
        } catch (e) {
            console.error(e);
            return null; 
           
        }
    }

    // Mutation pour la déconnexion
    @Mutation(() => Boolean)
    async signout(
        @Ctx() context: { req: any, res: any }
    ): Promise<Boolean> {
        const cookies = new Cookies(context.req, context.res);
        cookies.set("token", "", { maxAge: 0 });
        return true;
    }

    // Query pour obtenir les informations de l'utilisateur connecté
    @Query(() => User, { nullable: true })
    async whoami(
        @Ctx() context: { req: any, res: any; user: User }
    ): Promise<User | null> {
        return await getUserFromContext(context);
    }
}

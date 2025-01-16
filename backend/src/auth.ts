import Cookies from "cookies";  // Gestion des cookies
import { verify } from "jsonwebtoken";  // Vérification des tokens JWT
import { AuthChecker } from "type-graphql";  // Définir un contrôle d'accès
import { User } from "./entities/User";  // Entité User pour interagir avec la base de données

/**
 * Fonction pour récupérer l'utilisateur à partir du contexte.
 */
export async function getUserFromContext(context: { req: any; res: any }): Promise<User | null> {
    const cookies = new Cookies(context.req, context.res);
    const token = cookies.get("token");

    if (!token) {
        console.log("getUserFromContext: Missing token in cookies");
        return null;
    }

    try {
        // Décodage du token JWT
        const decoded = verify(token, process.env.JWT_SECRET_KEY!) as { id: number; roles: string[] };  // Utiliser string[] au lieu de RoleType[]

        // Recherche de l'utilisateur dans la base de données
        const user = await User.findOne({ where: { id: decoded.id } });
        if (!user) {
            console.log("getUserFromContext: User not found in database");
            return null;
        }

        // Assigner les rôles extraits du token au champ roles
        user.roles = decoded.roles;  // Assigner un tableau de rôles (type string[])

        console.log("getUserFromContext: User authenticated", user);
        return user;
    } catch (error) {
        console.log("getUserFromContext: Invalid JWT", error.message);
        return null;
    }
}

/**
 * Contrôle d'accès pour les résolveurs de type-graphql.
 * Vérifie que l'utilisateur est authentifié et possède les rôles requis pour accéder à la ressource.
 *
 * @param context - Contexte HTTP, contenant 'req', 'res', et potentiellement 'user'.
 * @param roles - Liste des rôles nécessaires pour accéder à la ressource (doit être de type `string[]`).
 * @returns true si l'utilisateur est autorisé, sinon false.
 */
export const authChecker: AuthChecker<{ req: any; res: any; user?: User }> = async ({ context }, roles: string[]) => {  // Utiliser string[] au lieu de RoleType[]
    const user = await getUserFromContext(context);

    if (!user) {
        console.log("authChecker: User not authenticated");
        return false;  // L'utilisateur n'est pas authentifié
    }

    context.user = user;

    // Vérifier si l'utilisateur possède un des rôles requis
    if (roles.length > 0) {
        const hasRole = roles.some(role => user.roles.includes(role));  // Assurez-vous de comparer des chaînes de caractères
        if (!hasRole) {
            console.log("authChecker: User does not have required roles", roles);
            return false;  // L'utilisateur n'a pas les bons rôles
        }
    }

    console.log("authChecker: Access authorized for user", user);
    return true;  // L'utilisateur est autorisé
};

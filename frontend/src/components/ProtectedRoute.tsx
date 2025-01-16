import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { queryWhoami } from '../api/graphql_queries';


interface ProtectedRouteProps {
  requireAuthenticated: boolean;  // True si la route doit être protégée pour les utilisateurs connectés
  redirectTo: string;  // La page où l'utilisateur sera redirigé
}

const ProtectedRoute = ({ requireAuthenticated, redirectTo }: ProtectedRouteProps) => {
  const { data, loading } = useQuery(queryWhoami);

  if (loading) return <div>Loading...</div>;

  // Si l'on exige que l'utilisateur soit connecté mais qu'il ne l'est pas
  if (requireAuthenticated && !data?.whoami) {
    return <Navigate to={redirectTo} />;
  }

  // Si l'on exige que l'utilisateur ne soit pas connecté mais qu'il l'est
  if (!requireAuthenticated && data?.whoami) {
    return <Navigate to={redirectTo} />;
  }

  // Si tout est ok (soit utilisateur connecté soit non connecté selon la logique)
  return <Outlet />;
};

export default ProtectedRoute;

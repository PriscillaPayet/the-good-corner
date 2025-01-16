import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SIGNIN } from '../api/graphql_mutations';
import { useMutation } from '@apollo/client';
import { queryWhoami } from '../api/graphql_queries';

const SigninPage = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const [doSignin, { loading }] = useMutation(SIGNIN, {
    refetchQueries: [queryWhoami]
  });

  // Fonction de soumission du formulaire
  const doSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    setError(''); // Réinitialiser l'erreur avant une nouvelle tentative

    try {
      const { data } = await doSignin({
        variables: { email, password }
      });

      if (data && data.signin) {
        console.log("Connexion réussie");
        console.log("Role de l'utilisateur : ", data.signin.roles)
        navigate('/', {replace : true}); // Redirection après connexion réussie + ne plus revenir sur la page de connexion
      } else {
        throw new Error("Connexion échouée, veuillez vérifier vos identifiants.");
      }
    } catch (e: any) {
      console.error(e);
      setError(e.message || "Connexion échouée. Veuillez réessayer.");
    }

    console.log('Email:', email);
   
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="form-container">
      <h2>Se connecter</h2>
      <form onSubmit={doSubmit}>
        <div className="label">
          <label htmlFor="email">Adresse email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-field"
            required
          />
        </div>
        <div className="label">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-field"
            required
          />
        </div>

        {/* Affichage du message d'erreur en cas d'échec */}
        {error && <div className="error-message">{error}</div>} 

        <div className="form-actions">
          <button type="submit" className="button button-primary">
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </div>
      </form>
      
      <div className="tags">
        <span>Vous n'avez pas de compte ?</span>
        <Link to="/signup" className="link-button">Créer un compte</Link>
      </div>
    </div>
  );
};

export default SigninPage;

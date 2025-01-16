import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CREATE_USER } from '../api/graphql_mutations';

const SignupPage = () => {
  const [email, setEmail] = useState('test1@gmail.com');
  const [password, setPassword] = useState('test1@mdp');
  const [confirmPassword, setConfirmPassword] = useState('test1@mdp');
  const [error, setError] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);

  const [doCreateUser, { loading }] = useMutation(CREATE_USER);

  async function doSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire

    // Vérifier que les mots de passe correspondent
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas!');
      return;
    }

    try {
      // Appel de la mutation
      await doCreateUser({
        variables: {
          data: {
            email,
            password
          }
        }
      });

      // Si la mutation réussit, on met à jour l'état `accountCreated`
      setAccountCreated(true);

    } catch (e: any) {
      console.error(e);
      if (e.message.includes('password is not strong enough')) {
        setError("Le mot de passe n'est pas assez robuste");
      } else if (e.message.includes('email must be an email')) {
        setError("L'email est invalide");
      } else if (e.message.includes('duplicate key value violates unique constraint')) {
        setError("Un compte existe déjà avec cet email");
      } else {
        setError("Une erreur est survenue");
      }
    }
  }

  // Affichage conditionnel du message de succès si `accountCreated` est true
  if (accountCreated) {
    return (
      <div>
        <h2>Inscription réussie</h2>
        <p>Ton compte a été créé 🎉, tu peux te connecter</p>
        <Link to="/signin" className="link-button">Se connecter</Link>
      </div>
    );
  }

  return (
    <div className="form-container">
      <h2>S'inscrire</h2>
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
        <div className="label">
          <label htmlFor="confirm-password">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="text-field"
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="form-actions">
          <button type="submit" className="button button-primary" disabled={loading}>
            {loading ? 'Chargement...' : "S'inscrire"}
          </button>
        </div>
      </form>
      <div className="tags">
        <span>Vous avez déjà un compte ?</span>
        <Link to="/signin" className="link-button">Se connecter</Link>
      </div>
    </div>
  );
};

export default SignupPage;

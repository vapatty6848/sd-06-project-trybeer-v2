import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { verifyEmailAndPassword } from '../utils/verifications';
import fetchFunctions from '../api/fetchFunctions';
import TrybeerContext from '../context/TrybeerContext';
import BeerParty from '../components/BeerParty';
import './Login.scss';

function Login() {
  const history = useHistory();
  const { setUserLogged } = useContext(TrybeerContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isInvalidUser, setIsInvalidUser] = useState(false);

  useEffect(() => {
    setIsDisabled(!verifyEmailAndPassword(email, password));
  }, [email, password]);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const loggedUser = await fetchFunctions.post('login', { email, password });

    if (loggedUser.token) {
      await setUserLogged(loggedUser);
      if (loggedUser.role === 'administrator') return history.push('/admin/orders');
      return history.push('/products');
    }
    return setIsInvalidUser(true);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    history.push('/register');
  };

  return (
    <div className="login-form">
      <BeerParty />
      <h1>TryBeer</h1>
      <form onSubmit={ handleSignUp }>
        <input
          type="text"
          placeholder="email"
          name="email"
          value={ email }
          data-testid="email-input"
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          type="password"
          placeholder="senha"
          name="password"
          value={ password }
          data-testid="password-input"
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button
          className="login-btn"
          data-testid="signin-btn"
          type="submit"
          disabled={ isDisabled }
        >
          Entrar
        </button>
      </form>
      <button
        className="register-new-account-btn"
        data-testid="no-account-btn"
        type="button"
        onClick={ handleRegister }
      >
        Ainda não tenho conta
      </button>
      <p>
        { isInvalidUser ? 'Invalid entries. Try again.' : '' }
      </p>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Login;

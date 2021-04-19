import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../services/api';
import '../styles/register.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [check, setCheck] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const history = useHistory();

  const handleChangeName = (event) => {
    const { value } = event.target;
    setName(value);
    const regex = /^[A-Za-z'\s]+$/;
    const nameLength = 12;
    if (regex.test(value) && value.length >= nameLength) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
  };

  const handleChangeEmail = (event) => {
    const { value } = event.target;
    setEmail(value);
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (regex.test(value)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  const handleChangePassword = (event) => {
    const { value } = event.target;
    setPassword(value);
    const passwordLength = 6;

    if (value.length >= passwordLength) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const handleChangeCheckbox = (event) => {
    const { checked } = event.target;
    if (checked) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  };

  const handleClick = async () => {
    const response = await api.fetchRegister(name, email, password, check);

    localStorage.setItem('user', JSON.stringify(response.user));

    if (response) {
      if (check) {
        history.push('/admin/orders');
      } else {
        history.push('/products');
      }
    } else {
      setUserExist(true);
    }
  };

  return (
    <div>
      <div className="title-register">
        <h1>Registro</h1>
      </div>
      <div className="form-register">
        <div className="form-group">
          <label htmlFor="name">
            Nome
            <input
              type="text"
              className="form-control"
              id="name"
              data-testid="signup-name"
              onChange={ handleChangeName }
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email
            <input
              type="email"
              className="form-control"
              id="email"
              data-testid="signup-email"
              onChange={ handleChangeEmail }
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Senha
            <input
              type="password"
              className="form-control"
              id="password"
              data-testid="signup-password"
              onChange={ handleChangePassword }
            />
          </label>
        </div>
      </div>
      <label htmlFor="checkbox" className="check-button">
        <input
          type="checkbox"
          id="checkbox"
          data-testid="signup-seller"
          onChange={ handleChangeCheckbox }
        />
        Quero vender
      </label>
      <div className="button-register">
        <button
          type="button"
          className="btn btn-danger"
          data-testid="signup-btn"
          disabled={ !(isEmailValid && isPasswordValid && isNameValid) }
          onClick={ handleClick }
        >
          Cadastrar
        </button>
      </div>
      { userExist && <p>E-mail already in database.</p> }
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/checkbox/Checkbox';
import { register } from '../../services/Users';
import { validateEmail, validatePassword, validateName } from '../../utils/validations';
import './Register.css';

const inputComponents = [
  {
    title: 'Nome',
    type: 'text',
    testId: 'signup-name',
    placeholder: 'Seu nome',
  },
  {
    title: 'Email',
    type: 'text',
    testId: 'signup-email',
    placeholder: 'Informe o email do Usuário',
  },
  {
    title: 'Senha',
    type: 'password',
    testId: 'signup-password',
    placeholder: 'Informe a senha',
  },
];

const registerRedirect = async (
  { name, email, password, isSeller, history },
  setFetchEmail) => {
  const role = isSeller ? 'administrator' : 'client';
  const result = await register(name, email, password, role);
  if (result.message) return setFetchEmail(result.message);
  localStorage.setItem('user', JSON.stringify(result));
  if (result.role === 'administrator') return history.push('/admin/orders');
  if (result.role === 'client') return history.push('/products');
  return null;
};

const setStateSwitch = ({ field, value, setEmail, setPassword, setName }) => {
  if (field === 'Email') return setEmail(value);
  if (field === 'Nome') return setName(value);
  return setPassword(value);
};

export default function Register() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSeller, setIsSeller] = useState(false);
  const [fetchEmail, setFetchEmail] = useState('');
  const history = useHistory();
  useEffect(() => {
    console.log('entrou no user effect');
    if (validateEmail(email) && validatePassword(password) && validateName(name)) {
      setIsDisabled(false);
    }
  }, [email, password, name]);
  const setField = (field, value) => {
    setStateSwitch({ field, value, setEmail, setPassword, setName });
  };
  const inputValues = [name, email, password];
  return (
    <form className="inputs">
      {inputComponents.map((component, index) => (
        <Input
          key={ index }
          title={ component.title }
          type={ component.type }
          testId={ component.testId }
          placeholder={ component.placeholder }
          value={ inputValues[index] }
          onChange={ setField }
        />
      ))}
      <Checkbox isSeller={ isSeller } setIsSeller={ setIsSeller } />
      <Button
        title="Cadastrar"
        testId="signup-btn"
        isDisabled={ isDisabled }
        onClick={ () => registerRedirect(
          { name, email, password, isSeller, history },
          setFetchEmail,
        ) }
      />
      {fetchEmail && (<div>{fetchEmail}</div>)}
    </form>
  );
}

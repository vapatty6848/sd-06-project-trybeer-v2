import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import RegisterForm from '../components/RegisterForm';
import { getUserByEmail, registerUser } from '../services/usersServices';
import { regex, regexUser, minUser, minPassword } from '../variables';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnDisable, setBtnDisable] = useState(true);
  const [emailExist, setEmailExist] = useState(false);
  const [check, setCheck] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (name.length >= minUser && regexUser.test(name)
      && regex.test(email) && password.length >= minPassword) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  }, [name, email, password]);

  const handleLocalStorage = (tokenobj, role) => {
    const { token, insertId } = tokenobj;
    const obj = {
      id: insertId,
      name,
      email,
      token,
      role,
    };
    const jsonAux = JSON.stringify(obj);
    localStorage.setItem('user', jsonAux);
  };

  const handleRedirect = async () => {
    const userFound = await getUserByEmail(email);
    if (!userFound.message) return setEmailExist(true);
    const roleStatus = check ? 'admin' : 'client';
    const user = { name, email, password, role: roleStatus };
    const register = await registerUser(user);
    handleLocalStorage(register, roleStatus);
    if (roleStatus === 'client') return history.push('/products');
    history.push('/admin/orders');
  };

  return (
    <div className="login-container d-grid gap-2">
      <RegisterForm
        setName={ setName }
        setPassword={ setPassword }
        setEmail={ setEmail }
        setCheck={ setCheck }
      />
      <div>
        <Button
          className="btn-login btn btn-success"
          dataTestid="signup-btn"
          btnDisable={ btnDisable }
          handleClick={ () => handleRedirect() }
          title="Cadastrar"
        />
        {emailExist ? <p>E-mail already in database.</p> : null}
      </div>
    </div>
  );
}

export default Register;

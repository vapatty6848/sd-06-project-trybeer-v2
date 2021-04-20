import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MenuTop from '../components/MenuTop';
import { changeName } from '../services/usersServices';

function ClientProfile() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [newName, setNewName] = useState('');
  const [disable, setDisable] = useState(true);
  const [sucess, setSucess] = useState(false);
  const [storage, setStorage] = useState('');
  const history = useHistory();

  const handleInputValue = () => {
    const userLocal = localStorage.getItem('user');
    if (userLocal === null) return history.push('/login');
    const user = JSON.parse(userLocal);
    setStorage(user);
    setName(user.name);
    setEmail(user.email);
  };

  const handleDisabled = () => {
    const minLength = 12;
    if (newName !== '' && newName.length >= minLength) {
      return setDisable(false);
    }
    return setDisable(true);
  };

  const handleChangeName = async () => {
    const { token, role } = storage;
    const data = { name: newName, email };
    const obj = {
      name: data.name,
      email,
      token,
      role,
    };
    const objJson = JSON.stringify(obj);
    localStorage.setItem('user', objJson);
    changeName(data);
    setSucess(true);
  };

  useEffect(() => {
    handleInputValue();
  }, []);

  useEffect(() => {
    handleDisabled();
  }, [newName]);

  return (
    <div>
      <MenuTop title="Meu perfil" />
      <div className="profile-container">
        <label htmlFor="name-input">
          Name
          <input
            className="width-full"
            type="text"
            data-testid="profile-name-input"
            name="name-input"
            placeholder={ name }
            onChange={ (e) => setNewName(e.target.value) }
          />
        </label>
        <label htmlFor="email-input">
          Email
          <input
            className="width-full"
            type="email"
            data-testid="profile-email-input"
            name="email-input"
            value={ email }
            readOnly
          />
        </label>
        <button
          className="btn btn-success margin-top"
          type="button"
          data-testid="profile-save-btn"
          disabled={ disable }
          onClick={ handleChangeName }
        >
          Salvar
        </button>
        {sucess ? <p>Atualização concluída com sucesso</p> : null}
      </div>
    </div>
  );
}

export default ClientProfile;

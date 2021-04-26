import React, { useEffect, useState, useContext } from 'react';
import HeaderComponent from '../components/HeaderComponent';
import fetchApiJsonBody from '../service/fetchApi';
import BeersAppContext from '../context/BeersAppContext';
import funcValidations from '../service/funcValidations';
import '../style/CostumerProfile.css';

function CostumerProfilePage() {
  const {
    user,
    setUser,
    user: { name, email, token },
  } = useContext(BeersAppContext);

  const [valid, setValid] = useState(true);
  const [inputName, setInputName] = useState(name);
  const [showSuccess, setShowSuccess] = useState('');

  const isValid = () => {
    if (inputName === name) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  useEffect(() => {
    isValid();
  }, [inputName]);

  const onClickSave = async () => {
    const url = '/profile/update';
    const nameWithValidation = funcValidations.validateName(inputName);
    if (!nameWithValidation) {
      return setShowSuccess(
        'Nome não pode ter mais que 12 caracteres ou'
        + ' conter numeros/caracteres especiais.',
      );
    }
    const response = await fetchApiJsonBody(url,
      { name: inputName }, 'PUT', token);
    if (response.err) return setShowSuccess(response.err);
    setUser({ ...user, name: response.name });
    setShowSuccess('Atualização concluída com sucesso');
    setValid(true);
  };

  return (
    <div>
      <HeaderComponent text="Meu Perfil" id="top-title" />
      <div className="costumer_profile">
        <p>Nome</p>
        <input
          type="text"
          name="p-name"
          id="p-name"
          disable={ `${valid}` }
          data-testid="profile-name-input"
          onChange={ ({ target }) => setInputName(target.value) }
          value={ inputName }
        />
        <p>Email</p>
        <input
          type="text"
          name="p-email"
          id="p-email"
          data-testid="profile-email-input"
          readOnly
          value={ email }
        />
        <button
          type="button"
          data-testid="profile-save-btn"
          className="bttn_costumer_profile"
          disabled={ valid }
          onClick={ onClickSave }
        >
          Salvar
        </button>
        <span>{ showSuccess }</span>
      </div>
    </div>
  );
}

export default CostumerProfilePage;

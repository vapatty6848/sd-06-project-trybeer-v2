import React, { useContext } from 'react';
import LoginContext from '../../context/LoginContext';
import InputsForm from './InputsForm';
import ButtonsForm from './ButtonsForm';

function FormLogin() {
  const {
    dataUser: user,
    handleIputs: handleChange,
    handleButton: handleClick,
    isDisabled: valid,
    router: history,
    messageError: errMsg,
    displayError: displayErr,
  } = useContext(LoginContext);

  return (
    <div id="bodyForm" className="form-content">
      <div className="grupo space-margin-top">Trybeer Grupo 07</div>
      { InputsForm(user, handleChange) }
      { ButtonsForm(valid, handleClick, history) }
      <div className="control-errorMsg">
        { displayErr && <span className="error-color length-text">{errMsg}</span>}
      </div>
    </div>
  );
}

export default FormLogin;

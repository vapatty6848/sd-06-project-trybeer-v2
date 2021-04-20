import React, { useContext } from 'react';
import ButtonsForm from './ButtonsForm';
import InputsForm from './InputsForm';
import RegisterContext from '../../context/RegisterContext';

function FormRegister() {
  const {
    change: handleChange,
    click: handleClick,
    user: newUser,
    isValid: valid,
    messageError: errMsg,
    displayError: displayErr,
  } = useContext(RegisterContext);

  return (
    <div className="form-content-reg" id="bodyForm">
      {InputsForm(newUser, handleChange)}
      {ButtonsForm(valid, handleClick)}
      <div className="control-errorMsg">
        { displayErr && <span className="error-color length-text">{errMsg}</span>}
      </div>
    </div>
  );
}

export default FormRegister;

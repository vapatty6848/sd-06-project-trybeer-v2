import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { RegisterForm } from '../components';

function Register({ history }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const NAME_LENGTH = 11;
  const PASSWORD_LENGTH = 5;

  const enableButton = () => setDisabled(!(name && password && email));

  const onChangeName = ({ target: { value } }) => {
    const NAME_REGEX = RegExp(/^[a-záàâãéèêíïóôõöúçñ ]+$/i);
    setName((value.length > NAME_LENGTH && NAME_REGEX.test(value)) ? value : '');
    enableButton();
  };

  const onChangeEmail = ({ target: { value } }) => {
    const EMAIL_REGEX = RegExp(/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/);
    setEmail((EMAIL_REGEX.test(value)) ? value : '');
    enableButton();
  };

  const onChangePassword = ({ target: { value } }) => {
    setPassword(value.length > PASSWORD_LENGTH ? value : '');
    enableButton();
  };

  const onCheck = () => setIsChecked(!isChecked);

  useEffect(() => {
    enableButton();
  });

  return (
    <div>
      <RegisterForm
        onChangeEmail={ onChangeEmail }
        onChangeName={ onChangeName }
        onChangePassword={ onChangePassword }
        email={ email }
        name={ name }
        password={ password }
        disabled={ disabled }
        onCheck={ onCheck }
        isChecked={ isChecked }
        history={ history }
      />
    </div>
  );
}

Register.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default Register;

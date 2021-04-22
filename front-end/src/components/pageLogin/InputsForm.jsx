import React from 'react';

function InputsForm(user, handleChange) {
  return (
    <div className="field">
      <div className="control">
        <label className="label length-text" htmlFor="email-user">
          Email
          <input
            className="input"
            id="email-user"
            type="email"
            name="email"
            value={ user.email }
            data-testid="email-input"
            onChange={ handleChange }
          />
        </label>
      </div>
      <div className="control">
        <label className="label space-margin-top length-text" htmlFor="pass-user">
          Senha
          <input
            className="input"
            id="pass-user"
            type="password"
            name="password"
            value={ user.password }
            data-testid="password-input"
            onChange={ handleChange }
          />
        </label>
      </div>
    </div>
  );
}

export default InputsForm;

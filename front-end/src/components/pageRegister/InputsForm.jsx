import React from 'react';

function InputsForm(user, handleChange) {
  return (
    <div className="control ">
      <label className="label length-text" htmlFor="nome">
        Nome
        <input
          className="input"
          type="text"
          id="nome"
          name="name"
          minLength="12"
          value={ user.name }
          onChange={ handleChange }
          data-testid="signup-name"
        />
      </label>
      <label className="label space-margin-top length-text " htmlFor="email">
        Email
        <input
          className="input"
          type="email"
          id="email"
          name="email"
          value={ user.email }
          onChange={ handleChange }
          data-testid="signup-email"
        />
      </label>
      <label className="label space-margin-top length-text " htmlFor="senha">
        Senha
        <input
          className="input"
          type="password"
          id="senha"
          name="senha"
          value={ user.senha }
          onChange={ handleChange }
          data-testid="signup-password"
        />
      </label>
      <label className="label space-margin-top length-text" htmlFor="tipo">
        Quero vender
        <input
          className="checkbox padding-left"
          type="checkbox"
          id="tipo"
          name="tipo"
          value="administrator"
          onChange={ handleChange }
          data-testid="signup-seller"
        />
      </label>
    </div>
  );
}

export default InputsForm;

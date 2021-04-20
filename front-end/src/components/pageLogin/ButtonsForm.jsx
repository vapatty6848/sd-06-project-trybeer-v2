import React from 'react';

function ButtonsForm(valid, handleClick, history) {
  return (
    <div className="">
      <div className="form-button space-margin-top">
        <button
          className="button is-success length-button length-text"
          type="submit"
          data-testid="signin-btn"
          disabled={ valid }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </div>
      <div className="align-button-not">
        <button
          className="button is-dark space-margin-top "
          type="button"
          data-testid="no-account-btn"
          onClick={ () => history.push('/register') }
        >
          Ainda não tenho conta
        </button>
      </div>
    </div>
  );
}

export default ButtonsForm;

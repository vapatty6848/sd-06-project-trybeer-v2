import React from 'react';

function ButtonsForm(valid, handleClick) {
  return (
    <div className="space-margin-top ">
      <button
        className="button is-success length-button-register length-text"
        type="submit"
        disabled={ valid }
        onClick={ handleClick }
        data-testid="signup-btn"
      >
        Cadastrar
      </button>
    </div>
  );
}

export default ButtonsForm;

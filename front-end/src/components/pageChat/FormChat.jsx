import React from 'react';
import PropTypes from 'prop-types';

function FormChat({
  handleChange,
  buttonDisable,
  handleClick,
  inputHandle }) {
  return (
    <div id="chat">
      <form onSubmit={ (e) => inputHandle(e) }>
        <label htmlFor="message">
          <input
            type="text"
            onChange={ handleChange }
            id="message"
            data-testid="message-input"
          />
        </label>
        <button
          type="button"
          disabled={ buttonDisable }
          onClick={ handleClick }
          data-testid="send-message"
        >
          Enviar
        </button>
      </form>
    </div>);
}

FormChat.propTypes = {
  handleChange: PropTypes.func.isRequired,
  inputHandle: PropTypes.func.isRequired,
  buttonDisable: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default FormChat;

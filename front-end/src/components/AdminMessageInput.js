import React from 'react';
import PropTypes from 'prop-types';

export default function MessageInput({ callback, value, sendMessage }) {
  return (
    <form onSubmit={ sendMessage }>
      <fieldset>
        <legend>
          Escrever mensagem
        </legend>
        <input
          type="text"
          value={ value }
          onChange={ callback }
          data-testid="message-input"
        />
      </fieldset>
      <button id="submit" type="submit" data-testid="send-message">
        Enviar
      </button>
    </form>
  );
}

MessageInput.propTypes = {
  callback: PropTypes.func,
  sendMessage: PropTypes.func,
  value: PropTypes.string,
};

MessageInput.defaultProps = {
  callback: () => {},
  sendMessage: () => {},
  value: () => {},
};

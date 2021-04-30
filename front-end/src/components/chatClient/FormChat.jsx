import React from 'react';
import PropTypes from 'prop-types';
import '../../css/chat.css';

function FormChat({ handleChange, buttonDisable, handleClick }) {
  return (
    <div id="chat">
      <form className="form-chat-container">
        <label htmlFor="message">
          <input
            type="text"
            className="form-control"
            onChange={ handleChange }
            id="message"
            data-testid="message-input"
          />
        </label>
        <button
          type="button"
          className="btn btn-success input-button"
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
  buttonDisable: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default FormChat;

import React from 'react';

const FormMessage = () => (
  <form className="input-container">
    <input type="text" id="messageInput" />
    <button type="button" id="sendButton" className="send-btn">Send</button>
  </form>
);

export default FormMessage;

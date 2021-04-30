import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import '../../css/chat.css';

function BodyChat({ data, dataBD, user }) {
  const history = useHistory();
  return (
    <div id="chat" className="chat-container">
      <div className="chat-button-container">
        <button
          type="button"
          className="btn btn-secondary chat-button"
          data-testid="back-button"
          onClick={ () => history.push('/admin/chats') }
        >
          Voltar
        </button>
      </div>
      <div className="chat-message">
        {dataBD.length > 0 && dataBD.map((dataHistoric, index) => (
          <div
            key={ index }
            className={ dataHistoric.nickname.match(/^Loja$/)
              ? 'message-adm right'
              : 'message-client' }
          >
            <div className="direct-chat-info clearfix">
              <div>
                <p
                  data-testid="nickname"
                  className="nick-date all-nick message-element"
                >
                  {dataHistoric.nickname}
                </p>
              </div>
              <div>
                <p
                  data-testid="message-time"
                  className="nick-date all-date message-element"
                >
                  {dataHistoric.hour}
                </p>
              </div>
            </div>
            <div>
              <p
                data-testid="text-message"
                className="message-element"
              >
                {dataHistoric.message}
              </p>
            </div>
          </div>
        ))}
        {data.length > 0 && data.map((dataMsg, index) => (
          <div key={ index }>
            <p data-testid="nickname">{user}</p>
            <p data-testid="message-time">{dataMsg.hour}</p>
            <p data-testid="text-message">{dataMsg.message}</p>
          </div>
        ))}
      </div>
    </div>);
}

BodyChat.propTypes = {
  user: PropTypes.string.isRequired,
  dataBD: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BodyChat;

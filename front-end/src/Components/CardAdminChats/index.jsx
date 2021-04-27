import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getMessages } from '../../Services/Apis';
import Container from './styles';

const CardAdminChats = () => {
  const history = useHistory();
  const [message, setMessage] = useState([]);

  const messageData = async () => {
    const data = await getMessages();
    return setMessage(data);
  };

  useEffect(() => {
    messageData();
  }, []);

  const handleClick = (email) => {
    history.push({ pathname: '/admin/chat/talks', state: email });
  };
  return (
    <div>
      {
        message.length > 0
          ? message.map((el, index) => (
            <Container
              data-testid="containerChat"
              onClick={ () => handleClick(el.email) }
              key={ index }
            >
              <h2 data-testid="profile-name">{el.email}</h2>
              <h2 data-testid="last-message">
                {`Última mensagem às ${el.lastMessage}`}
              </h2>
            </Container>
          ))
          : <p data-testid="text-for-no-conversation">Nenhuma conversa por aqui</p>
      }
    </div>
  );
};

export default CardAdminChats;

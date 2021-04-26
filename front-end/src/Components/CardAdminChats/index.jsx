import React, { useEffect, useState } from 'react';
import { getMessages } from '../../Services/Apis';
import * as S from './styles';

const CardAdminChats = () => {
  const [message, setMessage] = useState([]);

  const messageData = async () => {
    const data = await getMessages();
    return setMessage(data);
  }

  useEffect(() => {
    messageData();
  },[]);
  console.log('data', message);
  return (
    <>
    {message.length > 0?
    message.map((el) => {
      return (
        <S.Container  key={el.id} >
        <h2 data-testid="profile-name">{el.email}</h2>
        <h2 data-testid="last-message">{`Última mensagem às ${el.lastMessage}`}</h2>
      </S.Container>
      )
    })
    : 
    <p data-testid="text-for-no-conversation">'Nenhuma conversa por aqui'</p>}
    </>
  );
};

export default CardAdminChats ;

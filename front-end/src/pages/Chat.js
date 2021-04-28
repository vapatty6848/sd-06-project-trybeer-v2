import React, { useContext, useEffect } from 'react';
import TrybeerContext from '../context/TrybeerContext';
import { TestChat, TopMenu } from '../components';

function Chat() {
  const { setActiveChat } = useContext(TrybeerContext);

  useEffect(() => {
    setActiveChat('tryber@trybe.com.br');
  }, []);

  return (
    <>
      <TopMenu />
      <br />
      <br />
      <TestChat
        dest="tryber@trybe.com.br"
      />
    </>
  );
}

export default Chat;

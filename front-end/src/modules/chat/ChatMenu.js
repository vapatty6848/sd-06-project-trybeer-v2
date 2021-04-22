import React, { useEffect, useState } from 'react';
import api from '../../axios';

const ChatMenu = () => {
  const [loading, setLoading] = useState(false);
  const [inboxes, setInboxes] = useState([]);

  useEffect(() => {
    setLoading(true);
    api.get('/conversations').then((response) => {
      const { conversations } = response;
      setInboxes(conversations);
      setLoading(false);
    });
  }, []);

  return (Trybeer
    <div>
      { (!loading && inboxes.length > 0) &&
          inboxes.map((inbox, index) =>
            <div key={index} data-testid="containerChat">
              <p data-testid="profile-name">{ inbox.email }</p>
              <p data-testid="last-message">
                { `Última mensagem às ${inbox.messages[inbox.messages.length - 1].time}` }
              </p>
            </div>
          )
      }
    </div>
  );
};

export default ChatMenu;

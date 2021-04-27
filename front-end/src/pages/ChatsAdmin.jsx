import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MenuTop from '../components/menuAdmin/MenuSideBarAdm';
import api from '../services/api';

function ChatsAdmin() {
  const [listClients, setListClients] = useState([]);

  useEffect(() => {
    api.findMessagesGroup().then((list) => {
      setListClients(list);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <MenuTop name="Trybeer Chat" />
      </div>
      <div className="chat">
        {listClients.length > 0 ? listClients.map((data, index) => (
          <Link key={ index } to={ `/admin/chat/${data.talkId}` }>
            <div data-testid="containerChat" key={ index }>
              <p data-testid="profile-name">{data.nickname}</p>
              <p data-testid="last-message">{`Última mensagem às ${data.time}`}</p>
            </div>
          </Link>
        )) : <p data-testid="text-for-no-conversation">Nenhuma conversa por aqui</p>}

      </div>
    </div>
  );
}

export default ChatsAdmin;

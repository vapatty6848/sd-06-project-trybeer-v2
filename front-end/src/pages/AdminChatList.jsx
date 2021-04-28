import React, { useContext, useEffect, useState } from 'react';
import { AdminChatCardsComponent, AdminSideBarComponent } from '../components';
import BeersAppContext from '../context/BeersAppContext';
import '../style/ChatList.css';

function AdminChatList() {
  const {
    user: { token },
  } = useContext(BeersAppContext);

  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/chat/admin/get', {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    }).then((response) => response.json())
      .then((allUserChats) => {
        setChats(allUserChats);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <AdminSideBarComponent />
      <div className="chat-list-margin">
        <div>
          {
            (chats.length === 0)
              ? <p data-testid="text-for-no-conversation">Nenhuma conversa por aqui</p>
              : (
                <div data-testid="containerChat">
                  {
                    chats.map((element) => (
                      <div key={ element.email } className="chat-list">
                        <AdminChatCardsComponent
                          cliente={ element }
                        />
                      </div>
                    ))
                  }
                </div>
              )
          }
        </div>
      </div>
    </div>
  );
}

export default AdminChatList;

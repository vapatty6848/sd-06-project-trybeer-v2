import React, { useEffect, useState } from 'react'

export default function ListaDeConversas() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const callAllMessages = async () => {
      const allMessages = await fetch(`http://localhost:4001/chat/`);
      const allMsg = await allMessages.json();
      allMsg.forEach((msg) => {
        if (msg.user !== 'Loja') {
          setUsers([...users, msg.user]);
        }
      })
    }
    callAllMessages();
    console.log(users, 'oi')
  },[])
  
  return (
    <div>
     {} 
    </div>
  )
}


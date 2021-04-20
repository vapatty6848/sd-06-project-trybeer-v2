import React from 'react';
import axios from 'axios';
import ButtonDelivered from './ButtonDelivered';

function ButtonGroup() {
  const handleClick = (sendStatus) => {
    axios.put(`http://localhost:3001/sales/${id}`, { status: sendStatus })
      .then((response) => { setStatus(response.data.status); })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <ButtonDelivered
        testid="mark-as-prepared-btn"
        handleClick={ () => handleClick('Preparando') }
      >
        Preparar pedido
      </ButtonDelivered>
      <ButtonDelivered
        testid="mark-as-delivered-btn"
        handleClick={ () => handleClick('Entregue') }
      >
        Marcar como entregue
      </ButtonDelivered>
    </div>
  );
}

export default ButtonGroup;

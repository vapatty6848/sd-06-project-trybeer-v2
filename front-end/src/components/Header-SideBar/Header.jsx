import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../../css/Header.css';

function Header() {
  const [title, setTitle] = useState('');
  const location = useLocation();

  const chooseTitle = () => {
    const { pathname } = location;

    switch (pathname) {
    case '/profile':
      setTitle('Meu perfil');
      break;
    case '/products':
      setTitle('TryBeer');
      break;
    case '/checkout':
      setTitle('Finalizar Pedido');
      break;
    case '/orders':
      setTitle('Meus Pedidos');
      break;
    default:
      setTitle('Detalhes de Pedido');
      break;
    }
  };

  useEffect(() => {
    chooseTitle();
  });

  return (
    <h1
      className="top-title"
      data-testid="top-title"
    >
      { title }
    </h1>
  );
}

export default Header;

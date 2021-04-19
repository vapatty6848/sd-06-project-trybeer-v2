import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../Contexts/GlobalContext';
import { useTheme } from '../../Hooks/theme';

import S from './styles';
import Toogle from '../Toggle';

const MenuTop = () => {
  const [pathName, setPathName] = useState('');

  const { stateSideBar, setStateSideBar } = useContext(GlobalContext);

  const { toggleTheme, theme } = useTheme();

  const [darkTheme, setDarkTheme] = useState(false);

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  useEffect(() => {
    if (theme && theme.title === 'dark') {
      setDarkTheme(true);
    } else {
      setDarkTheme(false);
    }
  }, [theme]);

  useEffect(() => {
    switch (window.location.pathname) {
    case '/profile':
      return setPathName('Meu perfil');
    case '/products':
      return setPathName('TryBeer');
    case '/checkout':
      return setPathName('Finalizar Pedido');
    case '/orders':
      return setPathName('Meus Pedidos');
    case '/admin/profile':
      return setPathName('Perfil');
    default:
      return setPathName('Detalhes de Pedido');
    }
  }, []);

  return (
    <S.CompMenuTop darkTheme={ darkTheme }>
      <button
        type="button"
        data-testid="top-hamburguer"
        onClick={ () => setStateSideBar(!stateSideBar) }
      >
        {!stateSideBar
          ? (
            <img
              src="/images/cardapio.png"
              alt="Botão MenuTop"
            />
          ) : (
            <img
              src="/images/close.png"
              alt="Botão MenuTop"
            />
          )}
      </button>

      <h2 data-testid="top-title">{pathName}</h2>

      <S.ContainerToggle>
        { darkTheme ? (
          <img src="/images/sunWhite.png" alt="Sun" />
        ) : <img src="/images/sun.png" alt="Sun" />}

        <div>
          <Toogle
            id="toggle"
            checked={ darkTheme }
            onChange={ handleChangeTheme }
          />
        </div>

        { darkTheme ? (
          <img src="/images/moonWhite.png" alt="Sun" />
        ) : <img src="/images/moon.png" alt="Sun" />}
      </S.ContainerToggle>
    </S.CompMenuTop>
  );
};

export default MenuTop;

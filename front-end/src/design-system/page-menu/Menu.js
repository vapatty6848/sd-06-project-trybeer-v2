import React, { useState, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import GlobalContext from '../../context/Context';

function Menu(props) {
  const [menuStatus, setMenuStatus] = useState(false);
  const { setToken } = useContext(GlobalContext);

  const { match: { path } } = props;

  const linksClient = [
    {
      to: '/products',
      name: 'Products',
      nameSpec: 'Produtos',
      testId: 'side-menu-item-products',
    },
    {
      to: '/orders',
      name: 'My orders',
      nameSpec: 'Meus pedidos',
      testId: 'side-menu-item-my-orders',
    },
    {
      to: '/profile',
      name: 'My profile',
      nameSpec: 'Meu perfil',
      testId: 'side-menu-item-my-profile',
    },
  ];

  const linksAdmin = [
    {
      to: '/products',
      name: 'Products',
      nameSpec: 'Produtos',
      testId: 'side-menu-item-products',
    },
    {
      to: '/admin/orders',
      name: 'Orders',
      nameSpec: 'Pedidos',
      testId: 'side-menu-item-orders',
    },
    {
      to: '/admin/profile',
      name: 'Profile',
      nameSpec: 'Perfil',
      testId: 'side-menu-item-profile',
    },
  ];

  const storage = JSON.parse(localStorage.getItem('user'));
  const role = storage ? storage.role : 'client';
  const links = role === 'client' ? linksClient : linksAdmin;
  const classToTest = role === 'admin'
    ? 'admin-side-bar-container' : 'side-menu-container';

  const handleMenu = () => {
    setMenuStatus((prev) => !prev);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setToken(false);
  };

  return (
    <nav className="top-0 left-0 w-full bg-primary md:flex ">
      <button
        onClick={ () => handleMenu() }
        type="button"
        className="focus:outline-none flex items-center space-x-2 p-2"
        data-testid="top-hamburguer"
      >
        <i className="fas fa-bars fa-2x text-primary-light md:hidden" />
        <p className="text-2xl flex" data-testid="top-title">
          TryBeer
        </p>
      </button>
      <div
        className={ `${menuStatus ? '' : 'hidden'} w-full bg-primary-light
          md:bg-transparent absolute z-10 h-full md:relative md:flex
          md:justify-end md:px-2` }
      >
        <div
          style={ {
            visibility: menuStatus ? 'visible' : 'hidden',
            width: '100px',
            height: '100px',
          } }
          className={ `${classToTest} h-1 w-1 ${menuStatus ? '' : 'hidden'}` }
        />
        { links.map((link, index) => (
          <Link
            key={ index }
            to={ link.to }
            onClick={ () => handleMenu() }
            className={ `${path === link.to ? 'bg-primary-light' : ''}
              text-xl text-center p-5 block hover:bg-white` }
            data-testid={ link.testId }
          >
            { link.name }
            <p className="hidden">{ link.nameSpec }</p>
          </Link>
        ))}
        <button
          type="button"
          onClick={ () => logout() }
          className="w-full md:max-w-min text-xl text-center p-5 block hover:bg-white"
          data-testid="side-menu-item-logout"
        >
          Logout
          <p className="hidden">Sair</p>
        </button>
      </div>
    </nav>
  );
}

Menu.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRouter(Menu);

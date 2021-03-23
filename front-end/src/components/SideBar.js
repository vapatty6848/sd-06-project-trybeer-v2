import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

function SideBar() {
  return (
    <div
      className="position-relative align-middle text-white bg-dark"
    >
      <nav>
        <h2 data-testid="top-title">TryBeer</h2>
      </nav>
      <nav>
        <div>
          <Link
            data-testid="side-menu-item-orders"
            to="/admin/orders"
            // role="tab"
          >
            Pedidos
          </Link>
          <Link
            data-testid="side-menu-item-profile"
            to="/admin/profile"
            // role="tab"
          >
            Perfil
          </Link>
          <Link
            data-testid="side-menu-item-logout"
            to="/login"
            role="tab"
            onClick={ () => localStorage.clear() }
          >
            Sair
          </Link>
        </div>
      </nav>
    </div>
  );
}

// SideBar.propTypes = {
//   title: PropTypes.string.isRequired,
// };

export default SideBar;

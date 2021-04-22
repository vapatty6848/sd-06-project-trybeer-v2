import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/Menu.css';
import { FiMenu } from 'react-icons/fi';
import MenuSideBarClient from './MenuSideBarClient';

function MenuTop({ name }) {
  const [showSideBar, setShowSideBar] = useState(false);

  const handleClick = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <header>
      <div className="menuTop">
        <button
          type="button"
          data-testid="top-hamburguer"
          className="menuIcon"
          onMouseOverCapture={ handleClick }
        >
          <FiMenu />
        </button>
        <span data-testid="top-title">{ name }</span>
        <div>
          {showSideBar && <MenuSideBarClient />}
        </div>
      </div>
    </header>
  );
}

MenuTop.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MenuTop;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SideBarComponent from './SideBarComponent';
import { Logo, Menu } from '../images';
import '../style/HeaderCostumer.css';

function HeaderComponent({ text, id }) {
  const [renderSideBar, setRenderSideBar] = useState(false);

  return (
    <div>
      <div className="header_costumer">
        <div>
          <button
            type="button"
            id="fome-hamburger"
            name="McDonalds"
            className="bttn-menu-costumer"
            data-testid="top-hamburguer"
            onClick={ () => setRenderSideBar(!renderSideBar) }
          >
            <img
              src={ Menu }
              className="img-menu-costumer"
              alt="ham-btn"
            />
          </button>
        </div>
        <h1 data-testid={ id } className="title">{text}</h1>
        <img
          src={ Logo }
          className="img-logo"
          alt="logo"
        />
      </div>
      <div className="sidebar">
        {(renderSideBar) && <SideBarComponent text="TryBeer" id="top-title" />}
      </div>
    </div>
  );
}

HeaderComponent.propTypes = {
  text: PropTypes.string.isRequired,
  id: PropTypes.string,
};

HeaderComponent.defaultProps = {
  id: '',
};

export default HeaderComponent;

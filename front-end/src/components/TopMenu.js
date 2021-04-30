import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoBeerOutline } from 'react-icons/io5';
import { IconContext } from 'react-icons';
import TrybeerContext from '../context/TrybeerContext';
import SidebarMenu from './SideBarMenu';
import SidebarMenuAdmin from './SideBarMenuAdmin';
import './TopMenu.scss';

const TopMenu = ({ titleMenu }) => {
  const { user, isVisible, setVisibility } = useContext(TrybeerContext);

  return (
    <div>
      <header>
        <button
          type="button"
          id="side-menu"
          onClick={ setVisibility }
          data-testid="top-hamburguer"
        >
          <IconContext.Provider value={ { size: '3em' } }>
            <GiHamburgerMenu />
          </IconContext.Provider>
        </button>
        <p data-testid="top-title" className="top-title">{ titleMenu }</p>
        <IconContext.Provider value={ { size: '3em' } }>
          <IoBeerOutline />
        </IconContext.Provider>
      </header>
      { isVisible && user.role === 'client' && <SidebarMenu /> }
      { isVisible && user.role === 'administrator' && <SidebarMenuAdmin /> }
    </div>
  );
};

TopMenu.propTypes = {
  titleMenu: PropTypes.string,
};

TopMenu.defaultProps = {
  titleMenu: 'TryBeer',
};

export default TopMenu;

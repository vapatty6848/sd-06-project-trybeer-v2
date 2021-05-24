import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import SideBar from '../Sidebar/Sidebar';
import './Header.scss';

export default function Header({ title, user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const button = document.querySelector('.menu-btn');
  const menu = document.querySelector('.side-menu-container');
  console.log(button);

  return (
    <div className="header">
      {
        user === 'client' && (
          <button
            type="button"
            className="menu-btn"
            data-testid="top-hamburguer"
            // onClick={ () => setIsSidebarOpen(!isSidebarOpen) }
            onClick={ () => {
                // button.classList.toggle('active');
            } }
          >
            <FontAwesomeIcon icon={ faBars } size="lg" />
          </button>
        )
      }
      <h1 className="title" data-testid="top-title">
        { title }
      </h1>
      <SideBar className="menu-sidebar" user={user} />
      {/* {
        (isSidebarOpen || user === 'admin') && (
          <SideBar user={ user } />
        )
      } */}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,

};
